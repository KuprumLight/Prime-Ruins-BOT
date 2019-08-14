const Discord = require ("discord.js");
const fs = require('fs');

//Сломано

module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
if (message.channel.id === "610505750607036417") //Канал жалобы, менять ID
{

  let rChannel = message.guild.channels.get("610505750607036417"); //Канал жалобы, менять ID.
       let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

               if (!rUser)
               return message.reply("Неверно введённое имя");


       let reason = args.join(" ").slice(22);
       if (reason.length <= 0) return message.reply("Вы не указали причину, пример `!report @member причина`").then(message.delete())
       let reportEmbed = new Discord.RichEmbed()
       .setDescription("Жалоба на Участника")
       .addField("Обвиняемый", `${rUser}`)
       .addField("Жалоба отправлена пользователем", `${message.author}`)
       .addField("Причина", `${reason}`)
       .addField("Время отправление жалобы", message.createdAt)
       .setThumbnail("https://cdn.discordapp.com/attachments/341210767632236566/598145367485317130/Report_red.png")
       .setColor("#EB8117");
       message.delete();
       rChannel.send(reportEmbed).then(m => m.react('📃'));
       rUser.send("На вас была подана жалоба. Для просмотра — перейдите в канал " + message.guild.channels.find(`id`, "587957314548662272")); //ID канала жалобы
       message.author.send("Ваша жалоба принята.");


}
else message.delete()
}

module.exports.help = {
  name: "report"

}
