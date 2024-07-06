#!/usr/bin/env zx

import { ssh } from 'webpod'
import { promises as fs } from 'fs'
import inquirer from 'inquirer'
import chalk from 'chalk'

const readJsonFile = async (path) => {
  const data = await fs.readFile(path, 'utf-8')
  return JSON.parse(data)
}

const chooseServer = async (configs) => {
  const choices = configs.map((config, index) => ({
    name: `${config.serverName} (${config.hostname})`,
    value: index
  }))
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'serverIndex',
      message: 'Choose Server:',
      choices
    }
  ])
  return configs[answers.serverIndex]
}

const main = async () => {
  const configPath = 'settings/configs.json'
  const configs = await readJsonFile(configPath)
  const selectedConfig = await chooseServer(configs)

  const $ = ssh({
    remoteUser: selectedConfig.remoteUser,
    hostname: selectedConfig.hostname,
    port: selectedConfig.port,
    passphrase: selectedConfig.passphrase,
    ssh: selectedConfig?.ssh
  })

  const blueConsole = (str) => {
    console.log(chalk.blue(str));
  }

  const bash = async (command) => {
    const pwdAnswer = await $`pwd`;
    blueConsole(`${pwdAnswer.stdout.trim()}# ${command}`)

    if (command.startsWith('cd')) {
      $.cd(command.replace('cd', '').trim())
      return
    }

    const { stdout } = await $`${command.split(' ')}`;
    console.log(stdout);
  }

  console.log('Connect to server...')
  await bash('cd /')
  await bash('ls')
  await bash('cd /var/www')
  await bash('ls -al')
  await bash('mkdir qwe14')
  await bash('ls')
  await bash('rm -rf qwe14')
  await bash('ls')
}

main().catch(console.error)
