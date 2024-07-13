import inquirer from 'inquirer'
import configs from '../settings/configs.mjs'

export default async () => {
  const choices = configs.filter(el => el.tags?.length > 0).map((config, index) => ({
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
  return selectedConfig;
}
