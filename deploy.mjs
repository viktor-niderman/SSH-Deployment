#!/usr/bin/env zx

import chooseServer from './src/chooseServer.mjs'
import { bash, bashList } from './src/functions.mjs'

const main = async () => {
  const $ = await chooseServer();

  await bashList($, [
    'cd /',
    'ls',
    'cd /var/www',
    'ls -al',
    'mkdir qwe14',
    'ls',
    'rm -rf qwe14',
    'ls',
  ])
}

main().catch(console.error)
