const Discord = require("discord.js");
const beranks = ["546414480666525708", "595949223804141598", "595949882221789194", "595950451489243172"];
module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  if (!args[0]) return message.reply("Вы не указали пользователя.");
  let torep = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!torep) return message.reply("Не могу найти такого пользователя...");
  if (torep.id === message.member.id) return message.reply("Самому себе? Серьёзно?");
  if (torep.roles.has("465211854793211904"))
  {
    let ie = new Discord.RichEmbed()
    .setDescription("***Он Силён. Он Мудр. Он Могущ. Славим Его!***")
    .setImage("https://i.imgur.com/bSuK0Hi.jpg")
    .setColor("#EDC951");
    message.channel.send(ie);
    return;
  }
  let data = JSON.parse(fs.readFileSync('./reps.json', 'utf8'));
  if (!data.hasOwnProperty(torep.id))
  {
    data[torep.id] = {
      reps: 0,
      reptBy: [],
      rank: 0
    }
  }
  reptByarr = data[torep.id].reptBy;
  for (i = 0; i < reptByarr.length; i++)
  {
    if (reptByarr[i] === message.member.id)
    {
      message.reply("Вы уже повысили репутацию этому пользователю");
      return
    }
  }
  let currentrank = "";
  for (z = 0; z < beranks.length; z++)
  {
    if (torep.roles.has(beranks[z]))
    {
      currentrank = z;
      break;
    }
  }
  //добавление в список всей инфы
  data[torep.id].reps++;
  data[torep.id].reptBy.push(message.member.id);
  let rankobj = data.ranks[currentrank];
  let numTOup = rankobj.numTOup;
  //если имеет максимальный ранг.
  if (data[torep.id].rank === 3)
  {
    var maxrepEmbed = new Discord.RichEmbed()
    .setDescription(`🔱 ${torep} получил rep+ от ${message.member}`)
    .addField("Профиль", `Текущий ранг: ${message.guild.roles.get(data.ranks[currentrank].role)}. Суммарно  **${data[torep.id].reps+45}** репутации.`)
    .setColor("#faa61a");
    message.channel.send(maxrepEmbed);
    fs.writeFileSync('./reps.json', JSON.stringify(data, null, 2));
    return;
  }
  if (data[torep.id].reps === numTOup)
  {
    data[torep.id].reps = 0;
    data[torep.id].rank++;
    let uppedobj = data.ranks[data[torep.id].rank];
    let uppedrole = message.channel.guild.roles.find(el => el.id === uppedobj.role);
    torep.addRole(uppedrole.id);
    torep.removeRole(data.ranks[currentrank].role);
    message.channel.send(`⚡Поздравляем ${torep}⚡, вы получили ранг ${uppedrole}`);
    fs.writeFileSync('./reps.json', JSON.stringify(data, null, 2));
    return;
  }
  let nextrole = message.guild.roles.get(data.ranks[currentrank+1].role) //!!!!!!!!!!!!!!!!!!!!!!!!!
  let currentrole = message.guild.roles.find(el => el.id === data.ranks[currentrank].role);
  var repEmbed = new Discord.RichEmbed()
  .setDescription(`🔱 ${torep} получил rep+ от ${message.member}`)
  .addField("Профиль", `Текущий ранг: ${currentrole} ( ${data[torep.id].reps}/${numTOup} ). Осталось **${numTOup-data[torep.id].reps}** до получения ранга ${nextrole}`)
  .setColor("#faa61a");
  message.channel.send(repEmbed);
  fs.writeFileSync('./reps.json', JSON.stringify(data, null, 2));
}
module.exports.help = {
  name: "rep+"
}
