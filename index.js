const botconfig = require ("./botconfig.json");
const Discord = require ("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
const events = require('events');
const readline = require('readline');
const emojiCharacters = require('./emojiCharacters');
const mistikactiveclrusers = new Array();
const settingnicknames = new Array(); //Список для команды !setnick
const buildactiveusers = new Array(); //Список для команды !getbuild
const addbuildactiveusers = new Array(); //Список для команды !addbuild
const deletebuildactiveusers = new Array(); //Список для команды !deletebuild
const newpartyactiveusers = new Array();
const parties = new Array();
var findgroupchannel = "";
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
//плохо дабавляет роль галочку
//не сплайсит айдишник если написать !getbuild к оружию у которого нет билдов


bot.commands = new Discord.Collection()
var cjs = function emoji (id) {
  return bot.emojis.get(id).toString();
}

fs.readdir("./commands/", (err, files) => {

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0){
  console.log("Невозможно обнаружить коммандные файлы.")
  return;
  }
  jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} Загружен!`);
  bot.commands.set(props.help.name, props);

    })

})


bot.on("ready", async ()=> {
    let tetas = bot.guilds.get("464816173284851751");
    let findgpcatogory = tetas.channels.get("611143029461352469");
    findgpcatogory.children.forEach((value, key) => {
      value.delete();
      let led = tetas.roles.find(el => el.name === `${value.name} leader`);
      if (led) led.delete();
      let ban = tetas.roles.find(el => el.name === `${value.name} ban`);
      if (ban) ban.delete();

    })
    findgroupchannel = tetas.channels.find(el => el.id === "610736514996895785");//переменная канала поиска груп
    findgroupchannel.bulkDelete(100);
    console.log(`${bot.user.username} is Ready!`);
    bot.user.setActivity("Warframe | by PR Team", {type: "Playing"});
});
bot.on('guildMemberAdd', member => {
let newmemberschannel = member.guild.channels.find(el => el.id === "575242426084491275"); //Канал новички, менять ID.
let informchannel = member.guild.channels.find(el => el.id === "464816538676101132"); //Канал правила-информация, менять ID.
newmemberschannel.send("Добро Пожаловать " + `${member}` + "! Теперь нас уже " + `${member.guild.memberCount}` + "! Прочитай правила в канале " + informchannel); //Дописать\ ссылку на канал.
member.addRole('595932393412493313'); //id роли свежак, но это точно

});
bot.on("message", async message => {
 let prefix = botconfig.prefix;
 if (!message.content.startsWith(prefix)) return;
 let messageArray = message.content.split(" ");
 let cmd = messageArray[0];
 let args = messageArray.slice(1);
 let commandfile = bot.commands.get(cmd.slice(prefix.length));
 if (commandfile) commandfile.run(bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers);




//Добавление кастомных эмодзи



});
bot.on('error', async (err) => {
  console.log(err);
});


function getCHobj(mem) {
  for (i = 0; i < parties.length; i++)
  {
    if (parties[i].ID === mem.voiceChannelID)
    {
      let obj = parties[i];
      return obj;
      break;
    }
  }
  return
};

function deleteCHobj(mem){
  for (i = 0; i < parties.length; i++)
  {
    if (parties[i].ID === mem.voiceChannelID)
    {
      var el = parties[i];
      el.guildchannel.overwritePermissions(el.guildchannel.guild.defaultRole, {
        CONNECT: false,
        SPEAK: false,
      });
      el.guildchannel.delete();
      findgroupchannel.fetchMessage(el.embedID).then(m => m.delete());
      el.leaderrole.delete();
      let mm = new Discord.RichEmbed()
      .setDescription(`Ваш канал ${el.name} был удален, потому что вы покинули его.`)
      .setColor("#faa61a");
      el.leadmember.send(mm);
      parties.splice(i, 1);
      break;
    }
  }
  return
};
function createEmbed(mem) {
  var obj = {};
  for (i = 0; i < parties.length; i++)
  {
    if (parties[i].ID === mem.voiceChannelID)
    {
      let el = parties[i];
      var bcmembers = new Array();
      mem.voiceChannel.members.forEach(function (value, key) {bcmembers.push(value);});
      var slnmembers = bcmembers.join("\n");
      var channelembed = new Discord.RichEmbed()
      .addField(`**В канале ${el.name} ожидают ${mem.voiceChannel.members.size}/4 игроков**`, slnmembers)
      .addField("Описание:", el.description)
      .addField("Напиши лидеру группы в Warframe (просто скопируй текст ниже в чат Warframe):", `/w ${el.leadmember.displayName } +`)
      .addField("Зайти:", el.invite)
      .setColor("RANDOM");
      obj.embed = channelembed;
      if (el.status === "ACT")
      {
        obj.embedID = el.embedID;
      }
      return obj;
      break;
    }
  }
};

////////////////////////////////////////////////////////////
bot.on("voiceStateUpdate", async (oldMember, newMember) =>
{
  if ((oldMember.voiceChannel === undefined && newMember.voiceChannel !== undefined && newMember.voiceChannel.parentID === "611143029461352469") || (oldMember.voiceChannel !== undefined && newMember.voiceChannel !== undefined && oldMember.voiceChannelID !== newMember.voiceChannelID && newMember.voiceChannel.parentID === "611143029461352469"))
  {
    for (z = 0; z < parties.length; z++)
    {
      if (parties[z].ID === newMember.voiceChannelID)
      {
        let el = parties[z];
        if (newMember.roles.has(el.leadroleID))
        {

          parties[z].status = "ACT";
          var tet = bot.guilds.get("464816173284851751");
          parties[z].guildchannel.overwritePermissions(tet.defaultRole, {
            CONNECT: true,
            SPEAK: true,
          });
          splicememID(newpartyactiveusers, el.leadmember);
          var kembed = new Discord.RichEmbed()
          .setDescription(`Поздравляем. Ваш канал ${el.name} успешно активирован. Он будет удален после вашего выхода.`)
          .setColor("#faa61a");
          el.leadmember.send(kembed);
          let msgi = await findgroupchannel.send(createEmbed(newMember).embed);
          parties[z].embedID = msgi.id;
          if (oldMember.voiceChannel && oldMember.voiceChannel.parentID === "611143029461352469" && oldMember.roles.has(getCHobj(oldMember).leadroleID))
          {
            deleteCHobj(oldMember);
          }
          else if (oldMember.voiceChannel && oldMember.voiceChannel.parentID === "611143029461352469")
          {
            findgroupchannel.fetchMessage(createEmbed(oldMember).embedID).then(m => m.edit(createEmbed(oldMember).embed));
          }
        }
      }
    }
  }
  if ((oldMember.voiceChannel !== undefined && newMember.voiceChannel === undefined && oldMember.voiceChannel.parentID === "611143029461352469") || (oldMember.voiceChannel !== undefined && newMember.voiceChannel !== undefined && newMember.voiceChannel.parentID !== "611143029461352469"))//чел вышел или перешёл в канал другой категории.
  {
    var oldCHobj = getCHobj(oldMember);
    if (oldCHobj && oldMember.roles.has(oldCHobj.leadroleID))//если вышел лидер
    {
      deleteCHobj(oldMember);
      return;
    }
    else
    {
      findgroupchannel.fetchMessage(createEmbed(oldMember).embedID).then(m => m.edit(createEmbed(oldMember).embed));
      return;
    }
    return;
  }
  else if ((oldMember.voiceChannel === undefined && newMember.voiceChannel !== undefined && newMember.voiceChannel.parentID === "611143029461352469") || (oldMember.voiceChannel !== undefined && newMember.voiceChannel !== undefined && oldMember.voiceChannel.parentID !== "611143029461352469"))//чел зашёл
  {
    findgroupchannel.fetchMessage(getCHobj(newMember).embedID).then(m => m.edit(createEmbed(newMember).embed)); //!!!!!!!!!!!!!!!
    return;
  }
  else if (oldMember.voiceChannel !== undefined && newMember.voiceChannel !== undefined && oldMember.voiceChannelID !== newMember.voiceChannelID && newMember.voiceChannel.parentID === "611143029461352469")//Чел перешёл В_Н_И_М_А_Н_И_Е ЭТОТ ИФ НЕ ПАШИТ!
  //Денис все не пашит нужнео полностью этот иф с переходом фикситью. при переходе из категории в категрию только один раз пишет console.log("Перешёл");
  {
    if (oldMember.roles.has(getCHobj(oldMember).leadroleID))
    {
      deleteCHobj(oldMember);
      findgroupchannel.fetchMessage(getCHobj(newMember).embedID).then(m => m.edit(createEmbed(newMember).embed));
    }
    else
    {
      findgroupchannel.fetchMessage(getCHobj(newMember).embedID).then(m => m.edit(createEmbed(newMember).embed));
      findgroupchannel.fetchMessage(getCHobj(oldMember).embedID).then(m => m.edit(createEmbed(oldMember).embed));
    }
    return;
  }
});
process.on("unhandledRejection", error => {
    console.error("Unhandled promise rejection:", error);
});


bot.login(process.env.BOT_TOKEN);
