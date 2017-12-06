const k = require('./secretspoops.json');
global.Eris = require('eris');
global.client = new Eris.Client(k.token, { connectionTimeout: 60000 });
global.sql = require('sqlite');
global.fs = require('fs');
global.c = require('chalk');
global.moment = require('moment');
global.snek = require('snekfetch');
global.perms = require('./functions/permissions.js');
global.misc = require('./functions/misc.js');
require('moment-duration-format');
require('./guild.js');

global.prefix = "(";
global.admins = { "josh":"117728104935456770", "hunter":"228963688910946304", "john":"148958241378926593" };
global.owner = { "id":"221740788462256138" };
global.bot = {"id": "305602159741763585", "serverlog":"382001924251320322", "suggestchannel":"382001960984772609", "testingserver":"312667247808217088", "officialserver":"380310916341956610"};

sql.open('./stats.sqlite');

process.on('uncaughtException', e => {
  console.log(`Caught exception: ${e.stack}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled rejection at: ${p} reason: ${reason}`);
});

client.on("ready", () => {
  console.log(c.blue(`Damn Daniel.\nServer Amount: ${client.guilds.size}`));
  misc.randomStatus();
  new snek('POST', `https://bots.discord.pw/api/bots/${bot.id}/stats`).set('Authorization', k.bdt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to bots.discord.pw successfully.") }).catch(e => { if(e) throw e.stack; return; });
  new snek('POST', `https://discordbots.org/api/bots/${bot.id}/stats`).set('Authorization', k.dblt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to discordbots.org successfully.") }).catch(e => { if(e) throw e.stack; return; });
});

client.on("guildCreate", guild => {
  console.log(c.yellow(`I've joined ${guild.name}. Server amount: ${client.guilds.size}.`));
  guild.defaultChannel.createMessage(`\`\`\`Hey, I'm Russian roulette. ~~I know, it's a shitty name; blame the developer.~~ I'm just a bot, mainly used to play Russian roulette, but I also have some fun commands, and a lot more coming. We're always looking for new feautures, so if you have an idea use the ")suggest" command -- you could also join the discord server and tell the developer himself. Server Invite: https://discord.me/xdd.\`\`\``);
  try {
    client.guilds.get(bot.officialserver).channels.get(bot.serverlog).createMessage(`I've joined ${guild.name}. Server amount: ${client.guilds.size}.`);
  } catch (e) {
    console.log(c.bgRed("Invite me back to the test server, you bitch.\n" + e.stack));
  }
  new snek('POST', `https://bots.discord.pw/api/bots/${bot.id}/stats`).set('Authorization', k.bdt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to bots.discord.pw successfully.") }).catch(e => { if(e) throw e.stack; return; });
  new snek('POST', `https://discordbots.org/api/bots/${bot.id}/stats`).set('Authorization', k.dblt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to discordbots.org successfully.") }).catch(e => { if(e) throw e.stack; return; });
});

client.on('guildDelete', guild => {
  console.log(c.gray(`I've left ${guild.name}. Server amount: ${client.guilds.size}`));
  try {
    client.guilds.get(bot.officialserver).channels.get(bot.serverlog).createMessage(`I've left ${guild.name}. Server amount: ${client.guilds.size}.`);
  } catch (e) {
    console.log(c.bgRed("Invite me back to the test server, you bitch.\n" + e.stack));
  }
  new snek('POST', `https://bots.discord.pw/api/bots/${bot.id}/stats`).set('Authorization', k.bdt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to bots.discord.pw successfully.") }).catch(e => { if(e) throw e.stack; return; });
  new snek('POST', `https://discordbots.org/api/bots/${bot.id}/stats`).set('Authorization', k.dblt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to discordbots.org successfully.") }).catch(e => { if(e) throw e.stack; return; });
});

client.on("messageCreate", (message) => {
  if(!message.content.startsWith(prefix)) return;
  if(message.author == client.user) return;
  if(!message.channel.guild) return message.channel.createMessage("no, fuck off. go use me in an actual guild.");

  let cmd = message.content.slice(prefix.length).toLowerCase().split(' ')[0];
  let args = message.content.split(' ').slice(1);

  try {
    require(`./commands/${cmd}`).run(message, args);
  } catch (e) {
    if(e.message.includes('Cannot find module') || e.message.includes('ENOENT')) return;
    console.log(c.red(e.stack));

    if(e.length > 1990) return;
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
});

setInterval(misc.randomStatus, 1800000);
setInterval(misc.dailyBackup, 86400000);

client.connect();
// xD I'm killing myself
