const Discord = require("discord.js");
const fs = require('fs');


module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (message.channel.id !== "610732954557218816") return message.delete()
  let dj = message.guild.emojis.get("610733913790218242");
  let gdj = message.guild.emojis.get("611140111970861056");
  let slj = message.guild.emojis.get("611140111949758465");
  let brj = message.guild.emojis.get("611140112897802250");
  if(!args[0]) return message.reply("Введите эру и индекс реликвии").then(msg => msg.delete(10000));
  let era = args[0];
  let relicindex = args[1].toUpperCase();
  //if ((era.toLowerCase() !== lit) || (era.toLowerCase() !== mezo) || (era.toLowerCase() !== lit) || (era.toLowerCase() !== lit))
  if ((era.toLowerCase() === "lit") || (era.toLowerCase() === "mezo") || (era.toLowerCase() === "neo") || (era.toLowerCase() === "axi"))
  {
    console.log("Ошибок нет.")
  }
  else
  {
    message.reply("Эра должна быть написана в формате `lit/mezo/neo/axi`");
    return;
  }
  if ((relicindex.length < 2) || relicindex.length > 3) return message.reply("Правильно введите индекс реликвии соблюдая английскую раскладку, например: `A1`");
  if (era.toLowerCase() === "lit") era = "Лит";
  else if (era.toLowerCase() === "mezo") era = "Мезо";
  else if (era.toLowerCase() === "neo") era = "Нео";
  else if (era.toLowerCase() === "axi") era = "Акси";
  else console.log("Ошибка 404");
  var readed = fs.readFileSync('./frames/relics.json', 'utf8');
  var data = await JSON.parse(readed);
  let currentEra = await data[`${era}`];
  if (!currentEra.hasOwnProperty(relicindex)) return message.reply("Реликвии с таким индексом нет в списке.");
  let relic = currentEra[`${relicindex}`];
  const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, {time: 60000});
  var relicembed = new Discord.RichEmbed()
  .setDescription(`Информация о реликвии ${era} ${relicindex}.`)
  .addField("Дропы даной реликвии:", gdj+`${relic.drops.gold}\n`+slj+`${relic.drops.silver2nd}\n`+slj+`${relic.drops.silver1st}\n`+brj+`${relic.drops.bronze3rd}\n`+brj+`${relic.drops.bronze2nd}\n`+brj+`${relic.drops.bronze1st}`, true)
  .addField("Стоимость в дукатах:", `${relic.ducats.goldducat}`+dj+`\n${relic.ducats.slducat2nd}`+dj+`\n${relic.ducats.slducat1st}`+dj+`\n${relic.ducats.brducat3rd}`+dj+`\n${relic.ducats.brducat2nd}`+dj+`\n${relic.ducats.brducat1st}`+dj, true)
  .addField("Статус", `${relic.status}`)
  .setThumbnail(`${currentEra["Картинка"]}`)
  .setColor("#ff9933");
  message.channel.send(relicembed);
}

module.exports.help = {
  name: "relic"
}
