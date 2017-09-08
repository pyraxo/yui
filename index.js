const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const moment = require('moment')
const { Crystal } = require('sylphy')

require('longjohn')
require('dotenv-safe').config({
  path: path.join(__dirname, '.env'),
  allowEmptyValues: true
})

const isSelfbot = process.env.SELFBOT === 'true'

if (isSelfbot) {
  require('./src/selfbot')
} else {
  const cluster = new Crystal(path.join('src', 'bot.js'), parseInt(process.env.PROCESS_COUNT, 10))
  const timestamp = () => `[${chalk.grey(moment().format('HH:mm:ss'))}]`

  cluster.on('clusterCreate', id =>
    console.log(`${timestamp()} [MASTER]: CLUSTER ${chalk.cyan.bold(id)} ONLINE`)
  )

  cluster.createClusters().then(
    () => console.log(`${timestamp()} [MASTER]: ` + chalk.magenta('We\'re live, ladies and gentlemen.')),
    err => console.error(err)
  )
}
