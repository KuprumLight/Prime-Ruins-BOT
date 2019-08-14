const Discord = require('discord.js');

module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{ // начало модуля
  if (message.channel.id !== "610732954557218816") return message.delete()
  let cerr = false;
  mistikactiveclrusers.forEach(el => {
    if (el === message.author)
    {
      cerr = true;
    }
  });
  if (cerr === true) return message.reply("Нельзя делать несколько запросов одновременно. Отмените предыдущий запрос или дождитесь его завершения.").then(m => m.delete(5000));
  mistikactiveclrusers.push(message.author);
  let readed = fs.readFileSync('./frames/mistics.json', 'utf8');
  let data = JSON.parse(readed);
  let part = 0;
  let arrayMS = undefined;
  let typemisticem = new Discord.RichEmbed()
  .setDescription(`${message.author}, выберете один из классов мистификаторов нажав на значок ниже. Если хотите отменить запрос — нажмите ❌`)
  .addField("Мистификаторы для варфреймов", "Для выбора нажмите :one:")
  .addField("Мистификаторы Волхва", "Для выбора нажмите :two:")
  .addField("Виртуозные Мистификаторы", "Для выбора нажмите :three:")
  .addField("Мистификаторы Эксодии", "Для выбора нажмите :four:")
  .addField("Пакс-Мистификаторы", "Для выбора нажмите :five:")
  .setColor("#fbbf4c");
  let mess = await message.channel.send(typemisticem);
    await mess.react(emojiCharacters[1]);
    await mess.react(emojiCharacters[2]);
    await mess.react(emojiCharacters[3]);
    await mess.react(emojiCharacters[4]);
    await mess.react(emojiCharacters[5]);
    await mess.react('❌');
    const collector = await mess.createReactionCollector((reaction, user) => user.id == message.author.id, {time: 300000});
  collector.on('collect', async r => {
    const msgcoll = mess.channel.createMessageCollector(m => m.author.id == message.author.id, {time: 300000});
    switch (r.emoji.name)
    {
      case emojiCharacters[1]:   //starts first case
      var x  = 0;
      var dstr = "";

      data.warframemistics.forEach(el =>
        {
          x++;
          dstr = dstr + "`" + x + ".`" + el.name + "\n";
        });
      var msembed = new Discord.RichEmbed()
      .setDescription(`${message.author},`)
      .addField(`Вот список мистификаторов для варфреймов. Для выбора напишите номер нужного вам мистификатора.`, dstr)
      .addField("Для отмены запроса напишите:", "`cancel`")
      .setColor("#e3b74c");
      await mess.edit(msembed);
      await mess.clearReactions();
      part = 1;
      break;
      case emojiCharacters[2]:   //starts second case
      var x  = 0;
      var dstr = "";
      data.Volhva.forEach(el =>
        {
          x++;
          dstr = dstr + "`" + x + ".`" + el.name + "\n";
        });
      var msembed = new Discord.RichEmbed()
      .setDescription(`${message.author},`)
      .addField("Вот список мистификаторов класса `Волхва`для операторов. Для выбора напишите номер нужного вам мистификатора.", dstr)
      .addField("Для отмены запроса напишите:", "`cancel`")
      .setColor("#e2e322");
      await mess.edit(msembed);
      await mess.clearReactions();
      part = 2;
      break;
      case emojiCharacters[3]: //start third case
      var x  = 0;
      var dstr = "";
      data.Virtuoz.forEach(el =>
        {
          x++;
          dstr = dstr + "`" + x + ".`" + el.name + "\n";
        });
      var msembed = new Discord.RichEmbed()
      .setDescription(`${message.author},`)
      .addField("Вот список мистификаторов  класса `Виртуоз` для усиления оператора. Для выбора напишите номер нужного вам мистификатора.", dstr)
      .addField("Для отмены запроса напишите:", "`cancel`")
      .setColor("#7cb85e");
      await mess.edit(msembed);
      await mess.clearReactions();
      part = 3;
      break;
      case emojiCharacters[4]: //starts fourth case
      var x  = 0;
      var dstr = "";
      data.Excodia.forEach(el =>
        {
          x++;
          dstr = dstr + "`" + x + ".`" + el.name + "\n";
        });
      var msembed = new Discord.RichEmbed()
      .setDescription(`${message.author},`)
      .addField("Вот список мистификаторов класса `Эксодии`для `Зо`. Для выбора напишите номер нужного вам мистификатора.", dstr)
      .addField("Для отмены запроса напишите:", "`cancel`")
      .setColor("#68c7b7");
      await mess.edit(msembed);
      await mess.clearReactions();
      part = 4;
      break;
      case emojiCharacters[5]:   //starts fifth case
      var x  = 0;
      var dstr = "";
      data.Paks.forEach(el =>
        {
          x++;
          dstr = dstr + "`" + x + ".`" + el.name + "\n";
        });
      var msembed = new Discord.RichEmbed()
      .setDescription(`${message.author},`)
      .addField("Вот список мистификаторов класса `Пакс` для `Китганов`. Для выбора напишите номер нужного вам мистификатора.", dstr)
      .addField("Для отмены запроса напишите:", "`cancel`")
      .setColor("#17839a");
      await mess.edit(msembed);
      await mess.clearReactions();
      part = 5;
      break;
      case '❌': collector.stop();
      msgcoll.stop();
      //добавить дефолт
    }
    msgcoll.on('collect', async (message) => {
      if (message.content.toLowerCase() === "cancel")
      {
        msgcoll.stop();
        mess.delete();
        message.reply("Запрос отменен").then(m => m.delete(5000));
        try
        {
          mistikactiveclrusers.forEach((el, ind) => {
            if (el === message.author)
            {
              mistikactiveclrusers.splice(ind, 1);
            }
          });
        } catch (err) {
          throw err
        }
        return;
      }
      if (message.content.toLowerCase() === "!mistik") return
      console.log(part);
      message.delete();
      let arrnum = parseInt(message.content);
      if(isNaN(message.content)) return message.reply("Пожалуйста, введите корректное число.").then(m => m.delete(5000));
      if (part === 1)  {arrayMS = await data.warframemistics;}
      else if (part === 2)   {arrayMS = await data.Volhva;}
      else if (part === 3)   {arrayMS = await data.Virtuoz;}
      else if (part === 4)   {arrayMS = await data.Excodia;}
      else if (part === 5)   {arrayMS = await data.Paks;}
      if ((arrnum < 1) || (arrnum > arrayMS.length)) return message.reply("Пожалуйста, введите корректное число.").then(m => m.delete(5000));
      let ck = arrayMS[arrnum-1];  //ck - current mistificator
      let mistembed = new Discord.RichEmbed()
      .setDescription(`${message.author}, ${ck.name}`)
      .addField("Описание:", `${ck.description}`)
      .addField("Критерий срабатывания:", `${ck.condition}`)
      .addField("Эффект", `${ck.effect}`)
      .addField("Шанс срабатывания (относительно уровня мистификатора)", `${ck.actchance}`)
      .addField("Длительность (относительно уровня мистификатора)", `${ck.duration}`)
      .addField("Редкость", `${ck.rarity}`)
      .addField("Источник:", `${ck.dropsfrom}`)
      .setColor("#063444");
      mess.edit(mistembed);
      msgcoll.stop();
      try
      {
        mistikactiveclrusers.forEach((el, ind) => {
          if (el === message.author)
          {
            mistikactiveclrusers.splice(ind, 1);
          }
        });
      } catch (err) {
        throw err
      }

    });
  });

  collector.on('end', async () => {
    try
    {
      mistikactiveclrusers.forEach((el, ind) => {
        if (el === message.author)
        {
          mistikactiveclrusers.splice(ind, 1);
        }
      });
      let msgcoll = "fd";
      mess.delete();
    } catch (err) {
      msgcoll.stop();
      throw err
    }
  });


} //конец модуля
module.exports.help = {
  name: "mistik"
}
