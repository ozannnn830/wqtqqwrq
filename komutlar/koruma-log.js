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
  const kanal = message.mentions.channels.first()
  let evet = client.emojis.get("744238224062546031")
  if (!kanal)  {
    return message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem İptal')
.setColor('BLACK')
.setDescription(`Yanlış Kullanım Tespit Edildi. Örnek: **w!koruma-log <#kanal>**`)
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
  }
    message.channel.send(`
╔▬▬▬▬▬▬▬▬Koruma Log▬▬▬▬▬▬▬▬▬
║► ${evet} Koruma Aktif Edildi.
║► ${evet} ${kanal} Olarak Güncelledim! 
║► ${evet} Koruma Log Kanalını ${kanal} Olarak Güncelledim!
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  `)
  db.set(`korumaLog_${message.guild.id}`, kanal.id)
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'koruma-log',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};