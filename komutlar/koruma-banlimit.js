const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.channel.send(
new Discord.RichEmbed()
.setTitle('Yetkin Yok')
.setColor('BLACK')
.setDescription('Yeterli Yetkiye Sahip Değilsin.')
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
//return message.channel.send('Yeterli Yetkiye Sahip Görünmüyorsun! '+client.emojis.get('647760202875142154'))
  
   if(!args[0] || isNaN(args[0])) return message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem İptal')
.setColor('BLACK')
.setDescription('Ayarlamam İçin Bir Sayı Belirtmelisin.')
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
  // return message.channel.send(`Ayarlamam İçin Bir Sayı Yazmalısın`);
  await db.set(`banlimit31_${message.guild.id}`, args[0])
  return message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem Tamam')
.setColor('BLACK')
.setDescription(`Ban Hassasiyeti **${args[0]}** Olarak Ayarlandı.`)
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
 /* message.reply(`Ban Hassasiyeti **${args[0]}** Rakamına Ayarlanmıştır. Bu Rakamı Kimseyle Paylaşmayın
**ÖNEMLİ LÜTFEN OKUYUN**
!koruma Yazıp Kullanımını Detaylıca Öğreniniz Yoksa bir İşe Yaramaz!
`);*/
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'koruma-banlimit',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};