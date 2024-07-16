import inquirer from 'inquirer'
import commands from '../settings/commands.mjs'

export default async (tags) => {
  const availableCommands = {};
  tags.forEach((tag) => {
    if (commands[tag]) {
      for (const command in commands[tag]) {
        availableCommands[command] = commands[tag][command];
      }
    }
  })


  const choices = Object.keys(availableCommands).map((commandName) => ({
    name: commandName,
    value: commandName
  }));

  choices.push( {
    name: 'Exit',
  })

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'commandIndex',
      message: 'Choose a command to execute:',
      choices
    }
  ]);

  return availableCommands[answers.commandIndex];
}
