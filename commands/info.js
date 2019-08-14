const Discord = require("discord.js");
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (message.channel.id === "610505750607036417") //Канал жалобы, менять ID.
  {
    let jalobychannelEmbed = new Discord.RichEmbed()
    .setDescription("Информация по каналу Жалобы")
    .addField("Доступные команды:", "!report `@пользователь` `причина` - Подать жалобу на пользователя по определнной причине.\n\n!kick `@пользователь` - Отключает пользователья от вашего текущего голосового канала.")
    .setThumbnail("https://userscontent2.emaze.com/images/3698de53-6baa-4edb-a3d3-9a52d02dc410/5c58a25fad55d8f0134167416a6f1efb.png")
    .setColor(`#F00707`);
  message.channel.send(jalobychannelEmbed);
  }
  else if (message.channel.id === "467379698176098355") //Канал билды, менять ID.
  {
    let buildchannelembed = new Discord.RichEmbed()
    .setDescription("Информация по каналу Билды")
    .addField("Доступные команды:", "`!getbuild НазваниеЭкипировки`")                  //Редактировать это поле для команд в канале билды.
    .setColor(`#FFD700`);
  }
  else if (message.channel.id === "610732954557218816") //Канал реликвии, менять ID.
  {
    let relicchannelembed = new Discord.RichEmbed()
    .setDescription("Информация по каналу реликвии/мистификаторы")
    .addField("Доступные команды: ", "`!getbuild НазваниеЭкипировки` получение билда на экипировку\n\n`!mistik` — информация о всех мистификаторах.")                  //Редактировать это поле для команд в канале билды.
    .setColor(`#FFD700`);
  }
  else
  {
  message.channel.send("Информация в этом канале отсутствует.");
  }
  return;
}

module.exports.help = {
  name: "info"
}
