import chooseServer from './chooseServer.mjs'
import chalk from 'chalk'
import chooseCommand from './chooseCommand.mjs'
import { ssh } from 'webpod'
import { confirmQuestion } from './functions.mjs'

const blueConsole = (str) => {
  console.log(chalk.blue(str));
}
const greenConsole = (str) => {
  console.log(chalk.green(str));
}

const extractFunctionBody = (fn) => {
  const fnStr = fn.toString();
  const bodyMatch = fnStr.match(/{([\s\S]*)}$/);
  return bodyMatch ? bodyMatch[1].trim() : '';
};

export class SSH {
  init = async () => {
    this.serverConfigs = await chooseServer()
    this.$ =  ssh({
      remoteUser: this.serverConfigs.remoteUser,
      hostname: this.serverConfigs.hostname,
      port: this.serverConfigs.port,
      passphrase: this.serverConfigs.passphrase,
      ssh: this.serverConfigs?.ssh
    });
  }

  runCommands = async () => {
    const command = await chooseCommand(this.serverConfigs.tags);
    greenConsole(extractFunctionBody(command));
    const confirm = await confirmQuestion('Do you want to execute this command?');
    if (confirm) {
      await command(this)
    }
  }

  getPwd = async () => {
    const pwdAnswer = await this.$`pwd`;
    return pwdAnswer.stdout.trim();
  }

  bash = async (command) => {
    blueConsole(`${await this.getPwd(this.$)}# ${command}`)

    if (command.startsWith('cd')) {
      this.$.cd(command.replace('cd', '').trim())
      return
    }

    const { stdout } = await this.$`${command.split(' ')}`;
    console.log(stdout)
  }

  bashList = async (commandsArray) => {
    for (const command of commandsArray) {
      await this.bash(command);
    }
  }

}



