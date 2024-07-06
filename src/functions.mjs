import chalk from 'chalk'

export const blueConsole = (str) => {
  console.log(chalk.blue(str));
}

export const bash = async ($, command) => {
  const pwdAnswer = await $`pwd`;
  blueConsole(`${pwdAnswer.stdout.trim()}# ${command}`)

  if (command.startsWith('cd')) {
    $.cd(command.replace('cd', '').trim())
    return
  }

  const { stdout } = await $`${command.split(' ')}`;
  console.log(stdout);
}

export const bashList = async ($, commandsArray) => {
  for (const command of commandsArray) {
     await bash($, command);
  }
}
