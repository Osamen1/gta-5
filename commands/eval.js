exports.run = function(message, args) {
  if(message.author.id !== owner.id) {
   message.channel.createMessage({content: "eat me out", tts: true});
   return;
  } else {
    try {
      var i = args.join(" ");
      var o = eval(i);

      if(typeof o !== "string") o = require('util').inspect(o);

      client.createMessage(message.channel.id, {embed: {
        color: 0x008000,
        fields: [
          {
            name: "`Input:`",
            value: `\`\`\`js\n${i}\`\`\``,
            inline: false
          },
          {
            name: "`Output:`",
            value: `\`\`\`js\n${o}\`\`\``,
            inline: false
          }
        ]
      }});
    } catch (e) {
      throw e.stack;
      message.channel.send(`\`\`\`${e}\`\`\``);
    }
  }
};

exports.info = {
  usage: ")eval [args]",
  args: "[code]",
  description: "Fuck off, you can't use it anyways."
};
