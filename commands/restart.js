exports.run = function(message, args) {
  if(message.author.id !== owner.id) return message.channel.createMessage({content: `if you wanna use this command, I'm gonna need that succy fuccy, <@${message.author.id}>`, tts: true});
  var a = "";

  if(args[0].toLowerCase === 'true') var a = true;
  if(args[0].toLowerCase === 'false') var a = false;
  else var a = false;

  misc.dailyBackup;

  message.channel.createMessage("ok, dad Dx").then(() => {
    process.exit();
  });
};

exports.info = {
  usage: ")restart [args]",
  args: "[true or false, for if you want the database backup. False by default.]",
  description: "Restarts the server, I guess."
};
