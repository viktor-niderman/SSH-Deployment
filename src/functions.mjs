import inquirer from 'inquirer'

export const confirmQuestion = async (msg) => {
  return  await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmExecute',
      message: msg,
      default: false
    }
  ]);
}
