#!/usr/bin/env zx

import { ssh } from 'webpod'
import chalk from 'chalk'
import chooseServer from './str/chooseServer.mjs'

const main = async () => {
  const selectedConfig = await chooseServer()

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
