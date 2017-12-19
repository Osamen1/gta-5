exports.run = function(message, args) {
  if(!args) return message.channel.createMessage("reee, leave a list, you cuck.");
  message.channel.createMessage(`wow, you should totally do the \`${args[Math.floor(Math.random()*args.length)]}\` one, ~~you little fucking slut~~.`)
};

exports.info = {
  usage: ")pick [args]",
  args: "[list of things you want me to pick from, seperates by spaces.]",
  description: "Are you too much of an indecisive bitch to pick for yourself? Well, there's a command for that now, I guess."
};
