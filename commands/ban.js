const Discord = require("discord.js");

module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{//module starts here
  const imperator = message.guild.roles.get("465211854793211904"); //роль император, менять ID
  const legat = message.guild.roles.get("465211893900902402");   //роль легат, менять ID
    if ((message.member.roles.has(imperator.id)) || (message.member.roles.has(legat.id)))
    {
      let rChannel = message.guild.channels.get("610505750607036417"); //Канал жалобы, менять ID.
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

              if (!bUser)
              return message.reply("Неверно введённое имя");


      let reason = args.join(" ").slice(22);
      if (reason.length <= 0) return message.delete()
      let banEmbed = new Discord.RichEmbed()
      .addField("⛔ Забанен", bUser + "** забанен **" + `\n\n**пользователем **${message.author}` + "\n\n**По причине:** `" + reason + "`") //дописать длительность
      .setThumbnail("https://cdn.discordapp.com/attachments/341210767632236566/598139561318547475/d9b106b6a3015f2a.png")
      .setColor("#ff0000");
      message.delete();
      rChannel.send(banEmbed);
      message.guild.ban(bUser, {
        minutes: 1
      });
      bUser.send(`Вы были забанены на сервере ${message.guild.name} по причине: ` + "`" + reason + "`"); //дописать длительность

     }
     else
     {
       message.delete();
       return;
     }
}//module ends here

module.exports.help = {
  name: "ban"
}
