const Discord = require("discord.js");
function splicefromArr(){
  try
  {
    buildactiveusers.forEach((el, ind) => {
      if (el === message.member.id)
      {
        buildactiveusers.splice(ind, 1);
      }
    });
  } catch (err) {
  throw err
  }
}
function wordTOcase(content){
  let contentarray = content.split(" ");
  let aftercontent = new Array();
  contentarray.forEach(el => {
    let firstpart = el.slice(0,1).toUpperCase();
    let secondpart = el.slice(1).toLowerCase();
    let gotword = firstpart + secondpart;
    aftercontent.push(gotword);
  });
  let words = aftercontent.join(" ");
  return words
};

module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{//начало модуля
  if (message.channel.id !== "467379698176098355") return message.delete()
  let cerr = false;
  buildactiveusers.forEach(el => {
    if (el === message.member.id)
    {
      message.reply("Нельзя делать несколько запросов одновременно. Отмените предыдущий запрос или дождитесь его завершения.").then(m => m.delete(10000));
      cerr = true;
    }
  });
  if (cerr === true) return;
  if (!args[0]) return message.reply("Вы не ввели название оружия. Пожалуйста, введите его. Пример: `!getbuild ак и брант`").then(m => m.delete(30000));
  let wpname = wordTOcase(args.join(" ").toLowerCase());
  let data = JSON.parse(fs.readFileSync('./frames/frames.json', 'utf8'));
  console.log(data.hasOwnProperty(wpname));
  if (!data.hasOwnProperty(wpname)) return message.reply("Похоже, что вы неверно ввели название оружия. Перепроверьте.").then(m => m.delete(15000));
  let builds = data[wpname]["builds"];
  if (builds.length === 0) return message.reply("Билдов для данной экипировки пока что нет. Есть свой  актуальный и сильный билд? Напиши об этом Администрации. Твой билд рассмотрят специалисты и возможно внесут его в список :))");
  buildactiveusers.push(message.member.id);
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
  .setThumbnail(wp.image)
  .setColor("RANDOM");
  message.channel.send(buildembed);
  const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, {time: 90000});
  collector.on('collect', async (message) => {
    console.log(buildactiveusers);
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if (cmd === "!getbuild") return;
    if (message.content.toLowerCase() === "cancel")
    {
      collector.stop();
      message.reply("Запрос Отменен");
      return;
    }
    if(isNaN(message.content)) return message.reply("Пожалуйста, введите корректное число.").then(m => m.delete(5000));
    let buildnum = parseInt(message.content);
    if ((buildnum > builds.length) || (buildnum < 1)) return message.reply("Пожалуйста, введите корректное число.").then(m => m.delete(5000));
    message.delete()
    let build = builds[buildnum-1];
    var gotbuildembed = new Discord.RichEmbed()
    .setDescription(`Билд ${build.name} для ${message.member}`)
    .setThumbnail(wp.image)
    .addField("Описание билда:", `${build.description}`)
    .setImage(build.image)
    .setColor("RANDOM");
    collector.stop();
    message.channel.send(gotbuildembed);
  });
  collector.on('end', async() => {
    try
    {
      buildactiveusers.forEach((el, ind) => {
        if (el === message.member.id)
        {
          buildactiveusers.splice(ind, 1);
        }
      });
    } catch (err) {
    throw err
    }
  });
}//конец модуля

module.exports.help = {
  name: "getbuild"
}
