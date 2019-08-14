const Discord = require('discord.js');

module.exports.run = async (bot, message, args, fs, emojiCharacters, mistikactiveclrusers, settingnicknames, buildactiveusers, addbuildactiveusers, deletebuildactiveusers, parties, newpartyactiveusers) =>
{
  let cerr = false;
  settingnicknames.forEach((el, ind) => {
	 if (el === message.member.id)
	 {
		message.reply("Нельзя делать несколько запросов одновременно. Отмените предыдущий запрос или дождитесь его завершения.").then(m => m.delete(7000));
		cerr = true;
	 }
  });
  if (cerr === true) return
  let ifcfm =  message.channel.guild.roles.find(el => el.id === "611142539734679572");
	if (message.member.roles.has(ifcfm.id)) return message.reply("Для данной учетной записи дискорд у вас уже есть один подтвержденный аккаунт Warframe.").then(m => m.delete(15000))
	let confirmchannel =  message.guild.channels.get("610855738793000970");
	if (!args[0]) return message.reply("Вы не указали ваш игровой ник. Пример: `!setnick KuprumLight`").then(m => m.delete(7000));
	settingnicknames.push(message.member.id);
  let nickname = args[0];
  message.member.send(`Ваш запрос на подтверждение ника ${nickname} был отправлен. Ожидайте.`);
	let toconfirm = new Discord.RichEmbed()
	.setTitle("Запрос на подтверждение никнейма")
	.addField("Запрос отправлен пользователем", `${message.author}`)
	.addField("Предпологаемый никнейм:", `${nickname}`)
	.addField("Если вы готовы взяться за подтверждение этого ника тогда нажмите ✅", "(убедитесь в том что вы сейчас находитесь в Warframe)")
	.setColor("RANDOM");
	let mess = await confirmchannel.send(toconfirm);
  await mess.react('✅');
	let gotus = "";
	function filter(reaction, user)
	{
		if (user.username === bot.user.username) return
		if (user.id === message.author.id)
		{
			reaction.remove(user);
			return;
		}
		if (reaction.emoji.name === '✅')
		{
			gotus = user;
			return reaction, user;
		}
		else reaction.remove(user)
	}
	const collector = await mess.createReactionCollector(filter, {});
	collector.on('collect', async (reaction) => {
		var slemberd  = new Discord.RichEmbed()
		.setDescription(`Ваш запрос на подтверждение ника был принят ${gotus}. Напишите ему в личные сообщения когда будете готовы подтвердить ваш ник в игре. У вас 3 часа.\nДля простоты скопируйте следующий текст и по готовности отправьте его ${gotus}: Я готов подтвердить свой ник **${nickname}** и уже нахожусь в Warframe.`);
		message.author.send(slemberd);
		var secondembed = new Discord.RichEmbed()
		.setTitle("В процессе...")
		.addField(`Подтверждение ника **${nickname}** по запросу пользователя`, `${message.author}`)
		.addField("Статус", `Ожидание подтверждения/отклонения от ${gotus}`)
		.setColor("RANDOM");
		mess.edit(secondembed);
		await mess.clearReactions();
		await mess.react('✅');
		await mess.react('❌');
		collector.stop();
		function scfilter(reaction, user)
		{
			if (user.username === bot.user.username) return
			if (((reaction.emoji.name === '✅') || (reaction.emoji.name === '❌')) && (user.id === gotus.id))
			{
				return reaction, user;
			}
			else reaction.remove(user)
		}
		var checking = false;
		const secondcollector = await mess.createReactionCollector(scfilter, {time: 10800000});
		secondcollector.on('collect', async (r) => {
			switch (r.emoji.name) {
				case '✅': let confirmedrole = message.channel.guild.roles.get("611142539734679572");
				let incidentCH = message.guild.channels.get("611092711390445568");	
				await message.member.addRole(confirmedrole.id);
                                await message.member.setNickname(`${nickname}`);
			        incidentCH.send(`❗${gotus} подтвердил ник ${nickname} у пользователя ${message.member}`);
				message.author.send(`Ваш ник ${nickname} успешно подтвержден и теперь вы можете создавать свои собственные группы используя команду **!newparty**`);
				checking = true;
				secondcollector.stop();
				mess.delete();
				break;
				case '❌':
				var msb = new Discord.RichEmbed()
				.setDescription(`Ваш запрос был отклонен ${gotus}. Проверьте правильность введенного ника, тк что-то пошло не так...`);
				message.author.send(msb);
				checking = true;
				secondcollector.stop();
				mess.delete();
			  break;

			}
		});
		secondcollector.on('end', async () => {
			settingnicknames.forEach((el, ind) => {
				if (el === message.member.id)
				{
					settingnicknames.splice(ind, 1)
				}
			});
			if (checking === false)
			{
				var kk = new Discord.RichEmbed()
				.setTitle("Ваше время вышло. Запрос на подтверждение никнейма отклонён. Пожалуйста, повторите попытку.");
				message.author.send(kk);
				mess.delete()
			}
		});
	});


} //конец модуля
module.exports.help = {
  name: "setnick"
}
