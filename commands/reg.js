const Discord = require("discord.js");
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (message.member.roles.has("465211854793211904")) return message.delete()//id роли император
  if (message.member.roles.has("611142539734679572")) return message.reply("У вас уже подтвержденная учетная запись.")
  if (!args[0]) return message.reply("Укажите ник, пример `!reg Ник`")
  message.member.setNickname(args[0]);
  let chanch = new Discord.RichEmbed()
  .setDescription(`📑${message.member} cменил свой ник ⚠ на **${args[0]}**`)
  .setColor("#1157f0");
  message.channel.send(chanch);
}

module.exports.help = {
  name: "reg"
}
