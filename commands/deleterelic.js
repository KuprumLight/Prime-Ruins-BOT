const Discord = require('discord.js');

module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{ // начало модуля
  if (message.channel.id !== "595958919919042591") return message.delete()
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
  .setDescription(`Запрос на удаление реликвии ${era} ${relicindex}. На даный момент она имеет такой вид:`)
  .addField("Дропы даной реликвии:", gdj+`${relic.drops.gold}\n`+slj+`${relic.drops.silver2nd}\n`+slj+`${relic.drops.silver1st}\n`+brj+`${relic.drops.bronze3rd}\n`+brj+`${relic.drops.bronze2nd}\n`+brj+`${relic.drops.bronze1st}`, true)
  .addField("Стоимость в дукатах:", `${relic.ducats.goldducat}`+dj+`\n${relic.ducats.slducat2nd}`+dj+`\n${relic.ducats.slducat1st}`+dj+`\n${relic.ducats.brducat3rd}`+dj+`\n${relic.ducats.brducat2nd}`+dj+`\n${relic.ducats.brducat1st}`, true)
  .addField("Статус", `${relic.status}`)
  .setColor("#ff9933");
  message.channel.send(relicembed);

  collector.on('collect', async msg => {
    switch (msg.content)
    {
      case 'confirm': delete data[`${era}`][`${relicindex}`];
      var towrite = JSON.stringify(data, null, 2);
      fs.writeFileSync('./frames/relics.json', towrite);
      msg.reply(`Реликвия ${era} ${relicindex} была удалена из списка.`).then(m => m.delete(15000));
      break;
      case 'cancel': message.reply("Запрос на удаление отменен!").then(m => m.delete(7000));
      break;
      default: message.reply("Написать можно только `cancel` или `confirm`").then(m => m.delete(7000));
      break;
    }
  });

} //конец модуля
module.exports.help = {
  name: "deleterelic"
}
