exports.run = function(message, args) {
  try {
    client.createMessage(message.channel.id, {embed: {
      color: 0xFF8C00,
      fields: [
        {
          name: "What is this shit?",
          value: "Shit bot, created by some NEET.",
          inline: true
        },
        {
          name: "Who made this?",
          value: "That said NEET is named \"Edan,\" real fucking cuck. I hear it took him two days to fix the shitty stats command, lol, actual garbage.",
          inline: false
        },
        {
          name: "Anyway I can help?",
          value: "Only way you can is to use the `suggest` command, since this trash bot only has so much potential.",
          inline: true
        }
      ],
      footer: {
        text: "xDDD you like my constant shifts from 3rd to 2nd person",
        icon_url: "https://i.imgur.com/nzOMYGv.png"
      }
    }});
  } catch (e) {
    throw c.red(e.stack);
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")about",
  args: "[none]",
  description: "Just some info on the bot and its creator."
};
