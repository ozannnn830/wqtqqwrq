const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
let kontrol = await db.fetch(`dil_${message.guild.id}`)
/*if(!dil) {
    const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setAuthor("Bora", client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setDescription('**Botumuza destek olmak için sunucunuza eklemenizi unutmayın!**')
//.addField('Davet Linkleri', '[Bot Davet Linki]() | [Destek Sunucusu]()')
//.addField(":point_down: ",`[DavetLinkim](https://bit.ly/PlusBotDavet)`)
//.addField(":point_down: ",`[DestekSunucum](https://discord.gg/f2R6Nm)`)
//.addField(":point_down: ",`[DBl Oy (Vote)](https://top.gg/bot/691926656230752257/vote)`)
.addField('Davet Linkleri', '[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=706108855456890902&scope=bot&permissions=8)   |   [Destek Sunucusu](https://discord.gg/KcYmu2M)')
.setTimestamp()
.setFooter('Bora - 2020')
     
  message.channel.send(embed)*/
const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setAuthor("Wonders", client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setDescription('**Botumuza destek olmak için sunucunuza eklemenizi unutmayın!**')
//.addField('Davet Linkleri', '[Bot Davet Linki]() | [Destek Sunucusu]()')
//.addField(":point_down: ",`[DavetLinkim](https://bit.ly/PlusBotDavet)`)
//.addField(":point_down: ",`[DestekSunucum](https://discord.gg/f2R6Nm)`)
//.addField(":point_down: ",`[DBl Oy (Vote)](https://top.gg/bot/691926656230752257/vote)`)
.addField('Davet Linkleri', '[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=734341007012921364&scope=bot&permissions=8)   |   [Bot List Sunucusu](https://discord.gg/XkarS52)')
.setTimestamp()
.setFooter('Wonders - 2020')
     
  message.channel.send(embed)
//if(kontrol == "EN_us"){
/*const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setAuthor("Bora", client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setDescription("**Don't forget to add it to your server to support our bot!**")
//.addField('Davet Linkleri', '[Bot Davet Linki]() | [Destek Sunucusu]()')
//.addField(":point_down: ",`[DavetLinkim](https://bit.ly/PlusBotDavet)`)
//.addField(":point_down: ",`[DestekSunucum](https://discord.gg/f2R6Nm)`)
//.addField(":point_down: ",`[DBl Oy (Vote)](https://top.gg/bot/691926656230752257/vote)`)
.addField('İnvite Links', '[Bot İnvite Link](https://discord.com/oauth2/authorize?client_id=706108855456890902&scope=bot&permissions=8)   |   [Support Server](https://discord.gg/KcYmu2M)')
.setTimestamp()
.setFooter('Bora - 2020')
     
  message.channel.send(embed) 
}*/
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["invite"],
  permLevel: 0
};

exports.help = {
  name: 'davet',
};
//TrDevTeam