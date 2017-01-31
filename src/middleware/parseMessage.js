module.exports = {
  priority: 2,
  process: container => {
    const { client, msg, commands } = container
    const isPrivate = container.isPrivate = !msg.channel.guild
    const prefix = container.prefix = process.env['CLIENT_PREFIX']

    if (!msg.content.startsWith(prefix)) return Promise.resolve()

    const rawArgs = msg.content.substring(prefix.length).split(' ')
    const trigger = container.trigger = rawArgs[0].toLowerCase()
    container.isCommand = commands.has(trigger)
    container.rawArgs = rawArgs.slice(1).filter(v => !!v)

    return Promise.resolve(container)
  }
}
