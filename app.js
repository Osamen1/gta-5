
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

//----------------------------------------------
var token = ""
var prefix = ""
var discordbotsorgtoken = ""
var discordpwtoken = ""
//----------------------------------------------

client.on("ready", () => {
    client.user.setPresence({game: {name: "JBZD Nsfw Bot", type: 0}});
    console.log("I am ready!");
    
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
   
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
