import tags from './tags.mjs'

export default {
  [tags.my_server]: {
    'Deploy Staging': async ($) => {
      await $.bashList([
        'cd /var/www/html',
        'git pull origin dev-staging',
        'php artisan optimize:clear',
      ])
    },
    'Build NPM': async ($) => {
      await $.bashList([
        'cd /var/www/html',
        'npm run build',
      ])
    },
    'Install NPM': async ($) => {
      await $.bashList([
        'npm i',
        'npm run build',
      ])
    },
  },
  [tags.for_every_server]: {
    'Get Free space': async ($) => {
      await $.bashList([
        'df -h',
      ])
    },
  },
}
