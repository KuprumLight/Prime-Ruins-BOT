const Discord = require("discord.js");
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (!args[0]) return message.reply("Пожалуйста, укажите пользователя, пример: `!pret @member`");
  let prUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!prUser) return  message.reply("Не могу найти такого пользователя...");
  const centurion = message.guild.roles.find(el => el.id === "465211955028688926");
  const pretor = message.guild.roles.find(el => el.id === "465212111266512900");
  if (prUser.roles.has(pretor.id)) return message.reply(`${prUser} уже имеет такое звание.`);
  let comparerolenums = new Array();
  message.member.roles.forEach((value, key) => {
    comparerolenums.push(centurion.comparePositionTo(value));
  });
  let cerr = true;
  for (i = 0; i < comparerolenums.length; i++)
  {
    if (comparerolenums[i] <= 0)
    {
      break;
    }
    else if (i === comparerolenums.length-1)
    {
      message.reply("Назначать преторов могут только **Центурионы** и выше.");
      message.delete();
      cerr = false;
      return;
    }
  }
  if (cerr = false) return;
  let moderroles = new Array();
  prUser.roles.forEach((value, key) => {
    moderroles.push(centurion.comparePositionTo(value));
  });
  for (i = 0; i < moderroles.length; i++)
  {
    if (moderroles[i] <= 0)
    {
      message.reply("Претора можно выдать только тому кто ниже тебя...");
      return;
    }
  }
  prUser.addRole(pretor.id);
  let mainchannel = message.guild.channels.find(el => el.id === "464816173284851753");
  let inceDENTch = message.guild.channels.find(el => el.id === "611092711390445568");
  mainchannel.send(`❗${prUser} получил роль ${pretor} от ${message.member}`);
  inceDENTch.send(`❗${prUser} получил роль ${pretor} от ${message.member}`);
}

module.exports.help = {
  name: "pret"
}
