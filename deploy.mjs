#!/usr/bin/env zx

import { SSH } from './src/SSH.mjs'

const main = async () => {
  const $ = new SSH();
  await $.init()
  await $.runCommands();
}

main().catch(console.error)


