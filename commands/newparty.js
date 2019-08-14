const Discord = require("discord.js");

function splicememID(arr, mem) {
  for (i = 0; i < arr.length; i++)
  {
    if (arr[i] === mem.id)
    {
      arr.splice(i, 1);
      break;
    }
  }
};
function createPARTYobj(leaderID, channelID, channelname, channeldescription, leaderCHroleID, channelINVITE, gotrole, gichannel, leadmember) {
  let channel = {};
  channel.ID = channelID;
  channel.leaderID = leaderID;
  channel.name = channelname;
  channel.description = channeldescription;
  channel.leadroleID = leaderCHroleID;
  channel.invite = channelINVITE;
  channel.leaderrole = gotrole
  channel.guildchannel = gichannel;
  channel.status = "NATE";
  channel.leadmember = leadmember;

  return channel;
}
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (message.channel.id !== "610743140055384084") return message.delete()
  let confirmedrole = message.channel.guild.roles.get("611142539734679572");
  if (!(message.member.roles.has(confirmedrole.id))) return message.reply("У вас не подтвержденная учетная запись. Для подтверждения напишите `!setnick ВашИгровойНик`");
  if (args[0])
  {
    return message.delete()
  }
  for (i = 0; i < newpartyactiveusers.length; i++)
  {
    if (newpartyactiveusers[i] === message.member.id)
    {
      return;
    }
  }
  newpartyactiveusers.push(message.member.id);
  message.reply("Введите название голосового канала. Не более 20 символов. Например: `Лит M3 сиялки +3`")
  let clrlength = 1;
  let leaderID = "";
  let leaderrole = "";
  let gichannel = "";
  let channelID = "";
  let channelname = "";
  let channeldescription = "";
  let leaderCHroleID = "";
  let channelINVITE = "";
  let leadmember = "";
  let cerr = false;
  const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, {max: 100, time: 300000});
  collector.on('collect', function (message) {
    clrlength++;
    if (message.content === "!newparty")
    {
      message.reply("Нельзя делать несколько запросов одновременно. Отмените предыдущий запрос или дождитесь его завершения.").then(m => m.delete(7000));
      clrlength--;
      return;
    }
    if (message.content.split("\n").length > 1)
    {
      message.reply("Нельзя делать переходы строк при вводе данных. Повторно введите содержимое.")
      clrlength--;
      return;
    }
    if (message.content.toLowerCase() === "cancel")
    {
      splicememID(newpartyactiveusers, message.member);
      message.reply("Запрос отменен.");
      collector.stop();
      return;
    }
    if (clrlength === 2)
    {
      if (message.content.length > 20)
      {
        message.reply("Название должно содержать не более 20 симоволов. Повторно введите название.")
        clrlength--;
        return
      }
      channelname = message.content;
      message.reply("Введите описание канала или напишите `0` для пропуска ввода описания.")
    }
    else if (clrlength === 3)
    {
      if (message.content.length > 400)
      {
        message.reply("Описание должно быть не более 400 символов в длину.");
        clrlength--;
      }
      if (message.content === "0")
      {
        channeldescription = "Описание не указано.";
      }
      else
      {
        channeldescription = message.content;
      }
      var newpartyembed = new Discord.RichEmbed()
      .setDescription(`Запрос на создание новой группы от ${message.member}`)
      .addField("Название канала:", channelname)
      if (channeldescription.length > 0)
      {
        newpartyembed.addField("Описание канала:", channeldescription);
      }
      else
      {
        newpartyembed.addField("Описание канала:", "Описание не указано.");
      }
      newpartyembed.addField("Подтверждение запроса", "Для подтверждения напишите `confirm`, для отмены — `cancel`");
      newpartyembed.setColor("#ccff00");
      message.channel.send(newpartyembed);
    }
    else if (clrlength === 4)
    {
      switch (message.content.toLowerCase()) {

        case 'confirm':
        leadmember = message.member;
        message.channel.guild.createRole({ //начало роли
          name: `${channelname} leader`,
          color: "#4bb1e7",
        }).then(async (role) => {     //первый then роли
          message.member.addRole(role.id);
          leaderCHroleID = role.id;
          leaderrole = role;
          message.guild.createChannel(channelname, { //начало канала
            type: "voice",
            parent: "611143029461352469",
          }).then(async (ch) => {   //первый then канала
            ch.overwritePermissions(message.channel.guild.defaultRole, {
              CONNECT: false,
              SPEAK: false,
            });
            ch.overwritePermissions(leaderrole, {
              CONNECT: true,
              SPEAK: true,
            });
            ch.setUserLimit(4);
            channelID = ch.id;
            channelname = ch.name;
            gichannel = ch;
            console.log("Создан кастомный канал: " + ch.name);
            await ch.createInvite().then(inv => { //внутренний then для создания инвайта;
            channelINVITE = inv;
            var kem = new Discord.RichEmbed()
            .setDescription("Подтверждено. У вас 5 минут чтобы войти в созданный вами канал. Для входа перейдите по ссылке: "+ inv + " Если вы не войдете в канал в течении 5 минут — он будет удален. Как только вы (лидер даной группы) покинете канал он будет удален.")
            .setColor("#faa61a");
            message.member.send(kem);
            });
            parties.push(createPARTYobj(message.member.id, channelID, channelname, channeldescription, leaderCHroleID, channelINVITE, leaderrole, gichannel, leadmember));
            //leaderID, channelID, channelname, channeldescription, leaderCHroleID, channelINVITE
            await setTimeout(function () {
              parties.forEach((el, ind) => {
                if ((el.ID === channelID) && (el.status === "NATE"))
                {
                  el.guildchannel.delete();
                  el.leaderrole.delete();
                  var kEM = new Discord.RichEmbed()
                  .setDescription(`Вы не вошли в созданный канал ${el.name}.\nОн был удален по истечению времени.`)
                  .setColor("#faa61a");
                  el.leadmember.send(kEM);
                  parties.splice(ind, 1);

                }
              });
            }, 300000);
          }).then(ch => {  //Второй then создания канала(таймаут)

          }).catch(console.error);
          collector.stop();
        }).catch(console.error); //конец роли



        break;

        case 'cancel': message.reply("Запрос отменен").then(collector.stop());

          break;
        default: message.reply("Написать можно только `confirm` или `cancel`.");
        clrlength--;

      }
    }
  });
}

module.exports.help = {
  name: "newparty"
}

/*  message.member.send("Вы не вошли в созданный канал " + ch.name + "\nОн был удален по истечении времени.");
  ch.delete();
  role.delete();*/
