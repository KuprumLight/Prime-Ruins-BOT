const Discord = require("discord.js");
let numtodelete = "";


function wordTOcase(content){
  let contentarray = content.split(" ");
  let aftercontent = new Array();
  contentarray.forEach(el => {
    let firstpart = el.slice(0,1).toUpperCase();
    let secondpart = el.slice(1);
    let gotword = firstpart + secondpart;
    aftercontent.push(gotword);
  });
  let words = aftercontent.join(" ");
  return words
};


module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (message.channel.id !== "556938863059271688") return message.delete()
  let cerr = false;
  deletebuildactiveusers.forEach(el => {
    if (el === message.member.id)
    {
      message.reply("Нельзя делать несколько запросов одновременно. Отмените предыдущий запрос или дождитесь его завершения.").then(m => m.delete(10000));
      cerr = true;
    }
  });
  if (cerr === true) return;
  deletebuildactiveusers.push(message.member.id);
  if (!args[0]) return message.reply("Вы не ввели название оружия. Пожалуйста, введите его. Пример: `!getbuild ак и брант`").then(m => m.delete(15000));
  let wpname = wordTOcase(args.join(" ").toLowerCase());
  let data = JSON.parse(fs.readFileSync('./frames/frames.json', 'utf8'));
  if (!data.hasOwnProperty(wpname)) return message.reply("Похоже, что вы неверно ввели название оружия. Перепроверьте.").then(m => m.delete(15000));
  let builds = data[wpname]["builds"];
  if (builds.length === 0) return message.reply("Билдов для даного оружия пока что нет. Есть свой  актуальный и сильный билд? Напиши об этом Администрации. Твой билд рассмотрят специалисты и возможно внесут его в список :))");
  let strbuilds = "";
  let x = 0;
  builds.forEach((el, ind) => {
    x++;
    strbuilds = strbuilds + "`"+x+"`  "+"**"+el.name+"**\n";
  });
  let wp = data[wpname];
  var buildembed = new Discord.RichEmbed()
  .setDescription(`Поиск билдов на ${wpname} по запросу ${message.member}`)
  .addField(`Билдов найдено: **${builds.length}**. Выберети один из них написав его номер. Запрос дейсвителен 90 секунд...`, strbuilds)
  .setTitle("Выберете билд для удаления написав его номер.")
//  .setThumbnail(wp.image)
  .setColor("RANDOM");
  message.channel.send(buildembed);
  const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, {time: 90000});
  var clrlength = 1;
  collector.on('collect', async (message) => {
    console.log(deletebuildactiveusers);
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if (cmd === "!deletebuild") return;
    clrlength++;
    if (clrlength === 2)
    {
      if (message.content.toLowerCase() === "cancel")
      {
        collector.stop();
        message.reply("Запрос Отменен");
        return;
      }
      if(isNaN(message.content))
      {
        clrlength--;
        message.reply("Пожалуйста, введите корректное число.").then(m => m.delete(5000));
        return;
      }
      let buildnum = parseInt(message.content);
      if ((buildnum > builds.length) || (buildnum < 1))
      {
        clrlength--;
        message.reply("Пожалуйста, введите корректное число.").then(m => m.delete(5000));
        return;
      }
      message.delete()
      numtodelete = buildnum;
      let build = builds[buildnum-1];
      var gotbuildembed = new Discord.RichEmbed()
      .setDescription(`${build.name}`)
      .addField("Описание билда:", `${build.description}`)
      .setImage(build.image)
      .addField("Вы уверены что хотите удалить этот билд?", "Для удаления напишите `confirm`, а для отмены запроса напишите `cancel`")
      .setColor("RANDOM");
      message.channel.send(gotbuildembed);
    }
    else if (clrlength === 3)
    {
      switch (message.content.toLowerCase()) {
        case 'cancel': message.reply("Запрос отменен.")
        collector.stop();
        break;
        case 'confirm': data[wpname].builds.splice(numtodelete-1, 1);
        fs.writeFileSync('./frames/frames.json', JSON.stringify(data, null, 2));
        collector.stop();
        message.reply("Билд успешно удален");
        break;
        default: message.reply("Написать можно только `cancel` для отклонения или `confirm` для подтверждения");
        clrlength--;
      }
    }
  });

  collector.on('end', async() => {
    try
    {
      deletebuildactiveusers.forEach((el, ind) => {
        if (el === message.member.id)
        {
          deletebuildactiveusers.splice(ind, 1);
        }
      });
    } catch (err) {
    throw err
    }
  });
}

module.exports.help = {
  name: "deletebuild"
}
