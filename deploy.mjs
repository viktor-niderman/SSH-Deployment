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

  const S = {
    sh: async (message) => {
      console.log(message.stdout)
    },
    cd: async (path) => {
      $.cd(path)
      console.log(`From now your location is ${path}`)
    },
    ls: async (args = '') => {
      const { stdout } = await $`ls ${args}`;
      console.log(`ls ${args}:\n${stdout}`)
    },

  }

  console.log('Connect to server...')
  await S.cd('/')
  await S.ls()
  await S.cd(`/var/www`)
  await S.ls('-al')
  await S.sh(await $`mkdir qwe14`)
  await S.ls()
  await S.sh(await $`rm -rf qwe14`)
  await S.ls()
}

main().catch(console.error)
