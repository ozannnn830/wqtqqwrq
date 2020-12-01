const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message,args) => {
  
const embed = new Discord.RichEmbed()
     .setAuthor("Wonders - Koruma Komutları",client.user.avatarURL)
     .setColor('BLACK')
     .setThumbnail(client.user.avatarURL)
     .setDescription(`
**• w!koruma-log <#kanal> ** ➜ Koruma kayıtlarının gönderileceği kanalı ayarlarsınız.
**• w!koruma-banlimit <sayı> ** ➜ Sunucuda birisi 10 dakika içerisinde belirleyen sayının üzerinde ban atarsa sunucudan atar.
**• w!koruma-kanallimit <sayı> ** ➜ 30 dakika içerisinde belirtilen sayıdan fazla kanal silerse üyeyi sunucudan atar.
**• w!koruma-rollimit <sayı> ** ➜ 30 dakika içerisinde belirtilen sayıdan fazla rol silerse üyeyi sunucudan atar.
**• w!koruma-banlimit-kapat ** ➜ Ban limit sistemini kapatır.
**• w!koruma-kanallimit-kapat ** ➜ Kanal limit sistemini kapatır.
**• w!koruma-rollimit-kapat ** ➜ Rol limit sistemini kapatır.

   [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=734341007012921364&scope=bot&permissions=8)   |   [Destek Sunucusu](https://discord.gg/XkarS52)
`)
     .setFooter('Wonders',client.user.avatarURL)
     .setTimestamp()
     message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['güvenlikk','koruma'],
  permLevel: 0
};

module.exports.help = {
  name: 'koruma',
  description: '',
  usage: ''
};