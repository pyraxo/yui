require('winston-daily-rotate-file')
require('moment-duration-format')

const path = require('path')
const chalk = require('chalk')
const winston = require('winston')
const moment = require('moment')
const { Client } = require('sylphy')

const resolve = (str) => path.join('src', str)

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'silly',
      colorize: true,
      timestamp: () => `[${chalk.grey(moment().format('HH:mm:ss'))}]`
    }),
    new (winston.transports.DailyRotateFile)({
      colorize: false,
      datePattern: '.yyyy-MM-dd',
      prepend: true,
      json: false,
      formatter: function ({ level, message = '', meta = {}, formatter, depth, colorize }) {
        const timestamp = moment().format('YYYY-MM-DD hh:mm:ss a')
        const obj = Object.keys(meta).length
        ? `\n\t${meta.stack ? meta.stack : util.inspect(meta, false, depth || null, colorize)}`
        : ''
        return `${timestamp} ${level.toUpperCase()} ${chalk.stripColor(message)} ${obj}`
      },
      filename: path.join(process.cwd(), `logs/shard-${process.env['PROCESS_ID']}.log`),
    })
  ]
})

const bot = new Client({
  token: process.env['CLIENT_TOKEN'],
  prefix: process.env['CLIENT_PREFIX'],
  modules: resolve('modules'),
  locales: path.resolve('res', 'i18n'),
  messageLimit: 0,
  getAllUsers: true,
  disableEveryone: true,
  selfbot: true
})

bot.on('commander:registered', ({ trigger, group, aliases } = {}) =>
  bot.logger.debug(`Command '${trigger}' in group '${group}' registered with ${aliases} aliases`)
)

bot
.unregister('logger', 'console')  // use custom winston console transport
.register('logger', 'winston', logger)
.unregister('middleware', true)   // use custom middleware
.register('middleware', resolve('middleware'))
.register('commands', resolve('commands'), { groupedCommands: true })

bot.on('ready', () => {
  const guilds = bot.guilds.size
  const users = bot.users.size
  const channels = Object.keys(bot.channelGuildMap).length

  bot.logger.info(`${chalk.red.bold(bot.user.username)} is ready!`)
  bot.logger.info(
    `G: ${chalk.green.bold(guilds)} | ` +
    `C: ${chalk.green.bold(channels)} | ` +
    `U: ${chalk.green.bold(users)}`
  )
  bot.logger.info(`Prefix: ${chalk.cyan.bold(bot.prefix)}`)
})

bot.on('error', err => bot.logger.error(err))

bot.run()
