const Discord = require("discord.js");
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{

  const imperator = message.guild.roles.get("598120656353230849"); //роль император, менять ID
  if (!message.member.roles.has(imperator.id))
  {
    message.delete();
    return;
  }
  let infochannel = message.channel.guild.channels.get("464816538676101132"); //Канала правила-ифнормация💡 ,менять ID
  let flud =  message.guild.channels.get("573871681991344130"); // Флудилка,менять ID
  let zhaloba =  message.guild.channels.get("610505750607036417");//Канал жалобы ,менять ID
  let readyCH = message.guild.channels.get("610734502930677779");
  let rulesembed = new Discord.RichEmbed()
  .setColor("#cc0000")
  .addField("Правила", "`1:` **ЗАПРЕЩЕНО** начинайть политические разговоры в чатах, это не приведёт Вас ни к чему хорошему, а так же это карается баном. \n\n`2:` **ЗАПРЕЩЕНЫ** оскорбления и спам в чат-каналах\n\n`3:` **ЗАПРЕЩЕНО** публиковать материалы и ссылки эротического содержания, содержащие реальные сцены насилия, убийств и тому подобного контента. Вы получите глобальный бан без предупреждения, так как это противоречит политике Discord и нашего сервера. Исключением является канал "+ flud +" \n\n`4:` Если Вас кто-то оскорбил или Вы увидили нарушение — напишите жалобу в канал" + zhaloba +" \n\n `5` На сервере действует система повышения репутации. Открытый призыв пользователей на массовое повышение вашей репутации **ЗАПРЕЩЕН** и карается перманентным **`БАНОМ`**!\n\n **Прочитал правила!?**\nНапиши `!ready` в канал" + readyCH)

  message.delete();
  infochannel.send(rulesembed);
}

module.exports.help = {
  name: "rules"
}
