const Discord = require("discord.js");
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
 if (message.channel.id !== "610505750607036417") return message.delete()
 let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 const centurion = message.guild.roles.get("465211955028688926");
 let compareroles = new Array();
 kUser.roles.forEach((value, key) => {
   let num = value.comparePositionTo(centurion);
   compareroles.push(num);
 });
 for (i = 0; i < compareroles.length; i++)
 {
   if (compareroles[i] >= 0)
   {
     return message.reply("Администрацию кикать нельзя.")
   }
 }
 if (!kUser) return message.reply("Вы не указали пользователя.")
 if (!message.member.voiceChannelID) return message.reply("Вы должны находится в голосовом канале.")
 if (kUser.voiceChannelID !== message.member.voiceChannelID) return message.reply("Выгнать игрока можно только из вашего **текущего** голосового канала.")
 if (kUser === message.member) return message.reply("Самого себя кикнуть нельзя.")
 let rChannel = message.guild.channels.get("610505750607036417"); //Канал жалобы, менять ID.
 var voicechmembers = new Array();
 var kumc = 0; //количсевто игроков в канале.
 var votes = 0;
 let banedchannel = message.guild.channels.find('name', `${message.member.voiceChannel.name}`);
 let leadrole = message.guild.roles.find(el => el.name === `${message.member.voiceChannel.name} leader`);
 if (leadrole && kUser.roles.has(leadrole.id))
 {
   message.reply("Нельзя выгнать лидера.");
   return;
 }
 kUser.voiceChannel.members.forEach(function (key, value)
{
    voicechmembers.push(key);
    kumc++
});
if (kumc === 2 || message.member.roles.has(leadrole.id))
{
  kUser.setVoiceChannel(null);
  var kickembed = new Discord.RichEmbed()
  .setDescription(`🚷 ${kUser} был кикнут из ${kUser.voiceChannel.name}  🔸\n\n🔸 by ${message.member}`)
  .setColor("#8a2be2")
  .setThumbnail("https://i.imgur.com/UwAodNw.png");
  rChannel.send(kickembed);
  let banrole = message.guild.roles.find(el => el.name === `${banedchannel.name} ban`);
  if (!banrole)
  {
    await message.guild.createRole(
    {
      name: `${banedchannel.name} ban`,
    });
    banrole = message.guild.roles.find(el => el.name === `${banedchannel.name} ban`);
 //     let currentvcchannel = message.guild.channels.find('name', `${kUser.voiceChannel.name}`);
    banedchannel.overwritePermissions(banrole.id,
      {
        CONNECT: false,
        SPEAK: false,
      });

  }

 await kUser.addRole(banrole);
kUser.setVoiceChannel(null);
setTimeout(function(){
  kUser.removeRole(banrole.id);
}, 1800000);

}//конец if
else if (kumc > 2)
{
  var votemembers = new Array();
  kUser.voiceChannel.members.forEach(function (key, value) {
  if (key !== kUser && key !== message.member)
  {
    votemembers.push(key);
  }});
  var votemembersids = new Array();
  kUser.voiceChannel.members.forEach(function (key, value) {
  if (value !== kUser.id && value !== message.member.id)
  {
    votemembersids.push(value);
  }});
  var needablevotes = votemembersids.length;
  let memstr = votemembers.join(", ");
  var kickembed = new Discord.RichEmbed()
  .setDescription(`🚷 ${memstr} вы согласны кикнуть ${kUser} с вашей комнаты? Если да, нажмите на значок ниже. У вас 5 минут.`)
  .setColor("#8a2be2")
  .setThumbnail("https://i.imgur.com/UwAodNw.png");
  let embedmess = await rChannel.send(kickembed);
  let noentry = await embedmess.react('⛔');
  function filter(reaction, user)
               {
                if (reaction.emoji.name === '⛔' && votemembersids.includes(user.id) )
                {
                  votemembersids.splice(votemembersids.findIndex(el => el === user.id), 1)
                  return reaction;
                }
                else if (user.id === "587661775076589597") //ПОТОМ УБРАТЬ
                {
                  return
                }
                else
                  {
                    noentry.remove(user);
                  }

               }
  const rncollector = embedmess.createReactionCollector(filter, {time: 300000});
  rncollector.on('collect', async r => {
  votes++;

   if (votes === needablevotes)
   {
       let banrole = message.guild.roles.find(el => el.name === `${banedchannel.name} ban`);
       if (!banrole)
       {
         await message.guild.createRole(
         {
           name: `${banedchannel.name} ban`,
         });
         banrole = message.guild.roles.find(el => el.name === `${banedchannel.name} ban`);
      //     let currentvcchannel = message.guild.channels.find('name', `${kUser.voiceChannel.name}`);
         banedchannel.overwritePermissions(banrole.id,
           {
             CONNECT: false,
             SPEAK: false,
           });

       }

      await kUser.addRole(banrole);
     kUser.setVoiceChannel(null);
     embedmess.delete();
     setTimeout(function(){
       kUser.removeRole(banrole.id);
     }, 1800000);
   }

 });
}
}

module.exports.help = {
  name: "kick"
}
