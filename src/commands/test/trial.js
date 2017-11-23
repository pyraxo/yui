const { Command } = require('sylphy')

class TT extends Command {
  constructor (...args) {
    super(...args, {
      name: 'try',
      description: 'What!',
      options: { hidden: true }
    })
  }

  async handle ({ msg, args }, responder) {
    const dialog = await responder.dialog([{
        prompt: 'channel???',
        input: { name: 'response', type: 'channel', bot: false }
    }])
    console.log(dialog)
  }
}

module.exports = TT
