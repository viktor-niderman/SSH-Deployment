#!/usr/bin/env zx

import { SSH } from './src/SSH.mjs'

const main = async () => {
  const $ = new SSH();
  await $.init()
  await $.runCommands();


 // await commands[0].runScript($);
}

main().catch(console.error)


