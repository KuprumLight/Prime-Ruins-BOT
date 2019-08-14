const Discord = require("discord.js");
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
if (message.channel.id === ("610505750607036417" || "610857080005328929" || "610743140055384084" || "611092711390445568" || "610855738793000970")) return message.delete()
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Недостаточно прав");
if(!args[0]) return message.reply("Укажите количество сообщений для очистки");
let deletecount = args[0];
if((isNaN(deletecount)) || deletecount > 100 ) {
  message.delete();
  message.reply("Указано неверное количество. Максимум `100`")
  return;
}

message.delete();
try {
  message.channel.bulkDelete(deletecount);
} catch (err) {
  throw err
};
var delembed = new Discord.RichEmbed()
.setDescription("Массовое удаление сообщений")
.addField("Информация", `Сообщений удалено в количестве: ${deletecount}` )
.setColor("#f61313")
.setThumbnail("https://i.imgur.com/9k3OpTU.png");
message.channel.send(delembed).then(m => m.delete(10000));

}

module.exports.help = {
  name: "purge"
}
