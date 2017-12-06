const sql = require('sqlite');
sql.open('./stats.sqlite');
sql.run('CREATE TABLE IF NOT EXISTS players (playerID, wins, loses, plays, playerName, playerDiscriminator)');

exports.run = function(message, args) {
  var id = message.author.id;
  var cid = message.channel.id;
  var gid = message.channel.guild.id;

  try {
    sql.get(`SELECT * FROM players WHERE playerID = '${id}'`).then(r => {
      var b = Math.floor(Math.random() * 5);
      var p = Math.floor(Math.random() * 5);

      var reasons = [ "Damn, bro, their brains splattered everywhere. It was fuckin' crazy; should've been there.", `Lol, ${message.author.username}'s so shit. They lost to a %16 percent chance of dying. Literal garbage.`, "I WAS CONCEIVED BY MY DISEASE", "D:" ];
      var reason = reasons[Math.floor(Math.random() * reasons.length)];

      var delays = [ 150000, 180000, 60000, 30000, 300000 ];
      var delay = delays[Math.floor(Math.random() * delays.length)];

      var rrs = [ "Damn, bro, you beat the 16% chance that you'd get beaned (that is if the owners of the server set my role high enough)", "Yeet, you get to survive, my guy.", "Fucking hell! This isn't fair. >:(((\nYou should go again...", "John's a nigger, lol. Btw you didn't lose." ];
      var rr = rrs[Math.random() * rrs.length];

      var bm = message.channel.guild.members.get(bot.id);
      var pm = message.member;
      var bc = perms.checkAdmin(bm);
      var rc = perms.compare(bm, pm);

      if(b == p) {
        message.channel.createMessage("*bang*").then(m => {
          if(!r) sql.run(`INSERT INTO players (playerID, wins, loses, plays, playerName, playerDiscriminator) VALUES (?, ?, ?, ?, ?, ?)`, [id, 0, 1, 1, message.author.id, message.author.discriminator]);
          else sql.run(`UPDATE players SET plays = ${r.plays += 1}, loses = ${r.loses += 1} WHERE playerID = '${message.author.id}'`)

          try {
            if(rc === false || bc === false) {
              setTimeout(() => {
                return m.edit("Damn, you totally lost, but I can't ban you. Just pretend it was blanks, I guess.");
              }, 3500);
            }
            setTimeout(() => {
              message.channel.guild.banMember(id, 0, reason).then(() => {
                m.edit(`May ${message.author.username} rest in peace.`);
                setTimeout(() => {
                  client.getDMChannel(id).then(channel => {
                    client.createChannelInvite(cid, {maxAge: 5400, maxUses: 1}).then(invite => {
		                    client.unbanGuildMember(gid, id, "xD");
                      channel.createMessage(`You were unbanned, I guess. https://discord.gg/${invite.code}`);
                    });
                  });
                }, delay);
              });
            }, 3500);
          } catch (e) {
	          setTimeout(() => {
              m.edit("Damn, you totally lost, but I can't ban you. Just pretend it was blanks, I guess.");
              throw c.red(e.stack);
            }, 3500);
          }
        });
      } else {
        message.channel.createMessage("*click*").then(m => {
          if(!r) sql.run(`INSERT INTO players (playerID, wins, loses, plays, playerName, playerDiscriminator) VALUES (?, ?, ?, ?, ?, ?)`, [id, 1, 0, 1, message.author.id, message.author.discriminator]);
          else sql.run(`UPDATE players SET plays = ${r.plays += 1}, wins = ${r.loses += 1} WHERE playerID = '${message.author.id}'`);
          setTimeout(() => {
            return m.edit(rr);
          }, 3500);
        });
      }
    });
  } catch (e) {
    throw c.red(e.stack);
    message.channel.send(`Uh-oh, ran into a problem there.\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")play",
  args: "[none]",
  description: "Feeling suicidal? Just want a bit of thrill? Then play some Russian roulette."
};
