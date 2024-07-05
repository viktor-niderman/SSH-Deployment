#!/usr/bin/env zx

import { ssh } from 'webpod'
import { promises as fs } from 'fs'
import inquirer from 'inquirer'

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

  let stdout;
  console.log('Connect to server...')
  $.cd('/')
  stdout = (await $`ls`).stdout
  console.log(stdout)
  $.cd(`/var/www`)
  stdout = (await $`ls`).stdout
  console.log(stdout)
  stdout = (await $`mkdir qwe14`).stdout
  console.log(stdout)
  stdout = (await $`ls`).stdout
  console.log(stdout)
  stdout = (await $`rm -rf qwe14`).stdout
  console.log(stdout)
  stdout = (await $`ls`).stdout
  console.log(stdout)
}

main().catch(console.error)
