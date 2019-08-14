const Discord = require("discord.js");
let buildname = "";
let desc = "";
let buildimage = "";
let wpname = "";
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

function createbuild(Buildname, description, buildimage){
  let newbuild = {};
  newbuild.name = buildname;
  newbuild.image = buildimage;
  newbuild.description = desc;
  return newbuild;
}
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (message.member.roles.has("595932393412493313")) return message.delete()
  let cerr = true;
  addbuildactiveusers.forEach(el => {
    if (el === message.member.id)
    {
      cerr = false;
      return
    }
  })
  if (cerr === false) return;
  if (!(message.channel.id === "556938863059271688")) return message.delete() //Id канала бот-чат(обычный)
  addbuildactiveusers.push(message.member.id);
    message.reply("Введите название оружия чтобы добавить билд. Если вы захотите отменить запрос — напишите `abort`");
    const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, {time: 300000});
    var clrlength = 1;  //collect дописать
    let data = JSON.parse(fs.readFileSync('./frames/frames.json', 'utf8'));
    collector.on('collect', function (message)
    {
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      if (cmd === "!addbuild") return message.reply("Нельзя делать несколько запросов одновременно. Отмените предыдущий запрос или дождитесь его завершения.").then(m => m.delete(7000));
      clrlength++;
      if (message.content.split("\n").length > 1)
      {
        message.reply("Нельзя делать переходы строк . Повторно введите данные.");
        clrlength--;
        return;
      }
      if (message.content === "abort")
      {
        message.reply("Сбор данных завершен по команде пользователя.");
        collector.stop();
        return;
      }
      if (clrlength === 2)
      {
        wpname = wordTOcase(message.content);
        if (!data.hasOwnProperty(wpname))
        {
          clrlength--;
          message.reply("Похоже, что вы неверно ввели название оружия. Перепроверьте.").then(m => m.delete(15000));
          return;
        }
        message.reply("Введите название билда который хотите добавить");
        return wpname;
      }
      else if (clrlength === 3)
      {
        buildname = message.content;
        message.reply("Вставьте прямую ссылку на картинку.")
        return
      }
      else if (clrlength === 4)
      {
        buildimage = message.content;
        let fileres = message.content.slice(message.content.length-4, message.content.length)
        console.log(fileres);
        if (!((fileres === ".png") || (fileres === ".jpg")))
        {
          clrlength--;
          message.reply("Вы должны указать прямую ссылку на картинку(в конце должно быть `.png` или `.jpg`).");
          return;
        }
        try
        {
          var testembed = new Discord.RichEmbed()
          .setThumbnail(buildimage);
        } catch (err){
          throw err;
          message.reply("Странная картинка, не могу наложить её на таблицу. Перепроверьте URL.");
          clrlength--;
          return;
        }
        message.reply("Введите описание билда или напишите `0` для пропуска ввода описания.");
        return buildimage;
      }
      else if (clrlength === 5)
      {
        desc = message.content;
        if (desc === "0")
        {
          desc = "К сожалению автор не предоставил описание для даного билда.";
          message.reply("Описание не указано по команде пользователя, оно приймет вид: `К сожалению автор не предоставил описание для даного билда.`");
        }
        else if (desc.length < 20)
        {
          message.reply("Минимальная длина описания — 20 символов. Повторите попытку ввода.");
          clrlength--;
          return;
        }
        var newbuildembed = new Discord.RichEmbed()
        .setDescription(`${buildname}`)
        .addField("Описание билда:", `${desc}`)
        .setImage(buildimage)
        .setColor("RANDOM");
        message.channel.send(newbuildembed);
        message.reply("Так будет выглядеть билд... Напишите `confirm` для подтверждения или `cancel` для отклонения запроса.")
        return desc;
      }
      else if (clrlength === 6)
      {
        switch (message.content.toLowerCase()) {
          case 'cancel': collector.stop();
          message.reply("Сбор данных отменен.").then(m => m.delete(5000));
          break;
          case 'confirm':
          data[wpname].builds.push(createbuild(buildname, desc, buildimage));
          fs.writeFileSync('./frames/frames.json', JSON.stringify(data, null, 2));
          message.reply("Билд успешно добавлен в список");
          collector.stop();
          break;
          default: message.reply("Написать можно только `cancel` для отклонения или `confirm` для подтверждения");
          clrlength--;
          return;
        }
      }
    });
    collector.on('end', function () {
      addbuildactiveusers.forEach((el, ind) => {
        if (el === message.member.id)
        {
          addbuildactiveusers.splice(ind, 1);
          return;
        }
      })

    });

}
//addbuild Оружие Названиебилда ссылканакартинку описание
//Планы: Добавить проверку роли/канала/права


module.exports.help = {
  name: "addbuild"
}
