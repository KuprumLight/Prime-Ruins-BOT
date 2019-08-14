const Discord = require("discord.js");
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
if(message.member.roles.has('595932393412493313') && message.channel.id === "610734502930677779") {    //id роли "Свежак" и ID канала "ready"
let firstrole = message.guild.roles.get('546414480666525708');       //id роли "Велит"
message.member.addRole(firstrole.id);
message.member.removeRole('595932393412493313'); //id роли "Свежак"
message.delete();
}
else   message.delete()
}

module.exports.help = {
  name: "ready"
}
