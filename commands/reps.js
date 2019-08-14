const Discord = require("discord.js");
const beranks = ["546414480666525708", "595949223804141598", "595949882221789194", "595950451489243172"];
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (message.member.roles.has("595932393412493313")) return message.delete()
  let velit = message.channel.guild.roles.find(el => el.id === "546414480666525708");
  let gastat = message.channel.guild.roles.find(el => el.id === "595949223804141598");
  let triariy = message.channel.guild.roles.find(el => el.id === "595950451489243172");
  let imperator = message.guild.roles.get("465211854793211904");
  if (!args[0])
  {
    var membertocheck = message.member;
  }
  else
  {
    var membertocheck = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  }
   if (!membertocheck) return message.reply("Не могу найти такого пользователя...");
   if (membertocheck.roles.has(imperator.id))
   {
     let ie = new Discord.RichEmbed()
     .setDescription("***Он Силён. Он Мудр. Он Могущ. Славим Его!***")
     .setImage("https://i.imgur.com/bSuK0Hi.jpg")
     .setColor("#EDC951");
     message.channel.send(ie);
     return;
   }
   if (membertocheck.roles.has("610736964412637224")) return message.delete();
   let data = JSON.parse(fs.readFileSync('./reps.json', 'utf8'));
   if (!data.hasOwnProperty(membertocheck.id))
   {
     var unembed = new Discord.RichEmbed()
     .setDescription(`📄Профиль ${membertocheck}\nТекущий ранг: ${velit} ( 0/10 ). Осталось **10** до получения ранга ${gastat}`)
     .setColor("#faa61a");
     message.channel.send(unembed);
     return;
   }
   let currentrank = "";
   for (z = 0; z < beranks.length; z++)
   {
     if (membertocheck.roles.has(beranks[z]))
     {
       currentrank = z;
       break;
     }
   }
   let rankobj = data.ranks[z];
   let nextrankOBj = data.ranks[z+1];
   let repcount = data[membertocheck.id].reps;
   let numTOup = rankobj.numTOup;
   var uniqueembed = new Discord.RichEmbed()
   .setColor("#faa61a");
   if (membertocheck.roles.has(triariy.id))
   {
     uniqueembed.setDescription(`📄Профиль ${membertocheck}\nТекущий ранг: ${triariy} — максимальный. Общее количество репутации: **${repcount+45}**.`)
   }
   else
   {
     uniqueembed.setDescription(`📄Профиль ${membertocheck}\nТекущий ранг: ${message.guild.roles.get(rankobj.role)} ( ${repcount}/${rankobj.numTOup} ). Осталось **${numTOup-repcount}** до получения ранга ${message.guild.roles.get(nextrankOBj.role)}`)
   }
   message.channel.send(uniqueembed);
}

module.exports.help = {
  name: "reps"
}
