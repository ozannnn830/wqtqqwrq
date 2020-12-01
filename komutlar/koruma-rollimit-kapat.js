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

//return message.channel.send('(Kurucu Olda Gel Aslan)Yeterli Yetkiye Sahip Görünmüyorsun! '+client.emojis.get('647760202875142154'))
  if (!db.fetch(`rlimit31_${message.guild.id}`)) return message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem İptal')
.setColor('BLACK')
.setDescription('Ayarlanmayan Bir Şeyi Sıfırlayamam.')
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
//return message.channel.send(`${client.emojis.get('647760202875142154')} Olmayan Birşeyi Silemem :)
//Kısaca Zaten Kapalıymış Kanka :rose:`)
  db.delete(`rlimit31_${message.guild.id}`)
  return message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem Tamam')
.setColor('BLACK')
.setDescription('Koruma Rol Sistemi Sunucunuz İçin Kapatıldı.')
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
//message.channel.send(`:ok_hand: Koruma Ban Sistemi Sunucunuz İçin Veritabanından Silinmiştir.`);
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'koruma-rollimit-kapat',
  description: 'Rol limiti.',
  usage: 'rollimit',
  kategori: 'yetkili'
};