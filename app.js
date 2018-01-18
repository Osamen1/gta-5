
global.Eris = require('eris');
require("eris-additions")(Eris, { disabled: ["Channel.sendMessage", "Channel.sendCode", "Eris.Embed"] })
global.sql = require('sqlite');
global.fs = require('fs');
global.c = require('chalk');
global.moment = require('moment');
global.snek = require('snekfetch');
require('moment-duration-format');

global.k = require('./secretspoops.json');
global.perms = require('./functions/permissions.js');
global.misc = require('./functions/misc.js');
global.prefixes = require('./prefixes.json');
global.blacklist = require('./blacklist.json');
require('./guild.js');

global.admins = { "josh":"117728104935456770", "hunter":"228963688910946304", "john":"148958241378926593" };
global.owner = { "id":"221740788462256138" };
global.bot = {"id": "305602159741763585", "logs":"382001924251320322", "suggestchannel":"382001960984772609", "testingserver":"312667247808217088", "officialserver":"380310916341956610", "prefix":"("};

sql.open('./stats.sqlite');

process.on('uncaughtException', e => {
  console.log(`Caught exception: ${e.stack}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled rejection at: ${p} reason: ${reason}`);
});

process.on('exit', (code) => {
  console.log(`Exited with code ${code}`);
});
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
// rip my guy stringer
