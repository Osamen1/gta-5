exports.run = function(message, args) {
  if(!args[0]) {
    client.createMessage(message.channel.id, {embed: {
      color: 0xCD2626,
      fields: [
        {
          name: '`play`',
          value: 'Just some Russian Roulette.',
          inline: true
        },
        {
          name: '`stats`',
          value: 'See your statistics from playing Russian Roulette.',
          inline: true
        },
        {
          name: '`secrets`',
          value: 'Some stupid "secret" commands.',
          inline: true
        },
        {
          name: '`suggest`',
          value: 'Make some suggestions for the bot.',
          inline: true
        },
        {
          name: '`about`',
          value: 'Info about the bot.',
          inline: true
        },
        {
          name: '`invite`',
          value: 'Invites for the bot and the Discord server.',
          inline: true
        }
      ],
      footer: {
        text: "To get more \"in depth\" details for commands, do )help [command name]"
      }
    }});
  } else {
    try {
      let command = require(`../commands/${args[0]}.js`).info;

      client.createMessage(message.channel.id, {embed: {
        color: 0xCD2626,
        fields: [
          {
            name: `\`${command.usage}\` command info`,
            value: `\`\`\`Arguments:\n${command.args}\n\nDescription:\n${command.description}\`\`\``,
            inline: false
          }
        ]
      }});
    } catch (e) {
      throw c.red(e.stack);
      message.channel.createMessage(`\`\`\`${e}\`\`\``);
    }
  }
};

exports.info = {
  usage: ")help [args]",
  args: "[command name]",
  description: "It's a help command, no arguments for a list of the commands, or the name of a command for more info on it specifically."
}
