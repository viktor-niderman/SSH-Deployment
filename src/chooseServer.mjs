import inquirer from 'inquirer'
import { promises as fs } from 'fs'
import { ssh } from 'webpod'

const readJsonFile = async (path) => {
  const data = await fs.readFile(path, 'utf-8')
  return JSON.parse(data)
}

export default async () => {
  const configPath = 'settings/configs.json'
  const configs = await readJsonFile(configPath)

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

  const selectedConfig = await configs[answers.serverIndex]

  console.log(`Connect to server ${configs[answers.serverIndex].serverName}...`)
  return ssh({
    remoteUser: selectedConfig.remoteUser,
    hostname: selectedConfig.hostname,
    port: selectedConfig.port,
    passphrase: selectedConfig.passphrase,
    ssh: selectedConfig?.ssh
  });
}
