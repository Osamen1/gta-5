exports.run = function(message, args) {
  var u = u;
  try {
    if(message.content.includes(`<@${bot.id}>`)) {
      var time = moment.duration(client.uptime, "milliseconds").format("d[d] hh[h] mm[m] ss[s]");
      return client.createMessage(message.channel.id, {embed: {
        color: 0x00B2EE,
        fields: [
          { name: "Uptime", value: time, inline: true },
          { name: "Ping", value: `\`${new Date - message.timestamp} ms\``, inline: true },
          { name: "Memory Usage", value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBs / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MBs\``, inline: true },
          { name: "Servers info", value: `${client.guilds.size} servers, ${client.users.size} total members`, inline: true },
          { name: "Eris Lib", value: "[0.8.1](https://abal.moe/Eris)", inline: true }
        ]
      }});
    }

    else if(!u[0]) {
      sql.get(`SELECT * FROM players WHERE playerID = '${message.author.id}'`).then(r => {
        if(!r) {
          sql.run('INSERT INTO players (playerID, wins, loses, plays, playerName, playerDiscriminator) VALUES (?, ?, ?, ?, ?, ?)', [message.author.id, 0, 0, 0, message.author.username, message.author.discriminator]);
          return message.channel.createMessage({embed: {
            color: 0xff0000,
            footer: { text: `${message.author.username}'s Stats`, icon_url: message.author.avatarURL },
            thumbnail: { url: message.author.avatarURL },
            fields: [
              { name: "Wins", value: '0', inline: true },
              { name: "Loses", value: '0', inline: true },
              { name: "Total Plays", value: '0', inline: true }
            ]
          }});
        }

        return message.channel.createMessage({embed: {
        color: 0xff0000,
          footer: { text: `${message.author.username}'s Stats`, icon_url: message.author.avatarURL },
          thumbnail: { url: message.author.avatarURL },
          fields: [
            { name: "Wins", value: r.wins, inline: true },
            { name: "Loses", value: r.loses, inline: true },
            { name: "Total Plays", value: r.plays, inline: true }
          ]
        }});
      });
    }

    else if(u[0]) {
      sql.get(`SELECT * FROM players WHERE playerID = '${message.channel.guild.members.get(u[0].id).user.id}'`).then(r => {
        if(!r) {
          sql.run('INSERT INTO players (playerID, wins, loses, plays, playerName, playerDiscriminator) VALUES (?, ?, ?, ?, ?, ?)', [message.channel.guild.members.get(u[0].id).user.id, 0, 0, 0, message.channel.guild.members.get(u[0].id).user.username, message.channel.guild.members.get(u[0].id).user.discriminator])
          return client.createMessage(message.channel.id, {embed: {
            color: 0xff0000,
            footer: { text: `${message.channel.guild.members.get(u[0].id).username}'s Stats`, icon_url: message.channel.guild.members.get(u[0].id).avatarURL },
            thumbnail: { url: message.channel.guild.members.get(u[0].id).avatarURL
            },
            fields: [
              { name: "Wins", value: "0", inline: true },
              { name: "Loses", value: "0", inline: true },
              { name: "Total Plays", value: "0", inline: true }
            ]
          }});
        }

        return client.createMessage(message.channel.id, {embed: {
          color: 0xff0000,
          footer: { text: `${message.channel.guild.members.get(u[0].id).username}'s Stats`, icon_url: message.channel.guild.members.get(u[0].id).avatarURL },
          thumbnail: { url: message.channel.guild.members.get(u[0].id).avatarURL
          },
          fields: [
            { name: "Wins", value: r.wins.toString(), inline: true },
            { name: "Loses", value: r.loses.toString(), inline: true },
            { name: "Total Plays", value: r.plays.toString(), inline: true }
          ]
        }});
      });
    }
  } catch (e) {
    throw c.red(e.stack);
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")stats [args]",
  args: "[@ a member, or nothing]",
  description: "Get your stats from when you've played Russian roulette."
};
