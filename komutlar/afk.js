const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let user = message.author
  let sebep = args.join(" ")
  
  if (!sebep) return message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem Başarısız!')
.setColor('BLACK')
.setDescription(`**AFK** olmak için bir sebep yazmalısın!`)
.setTimestamp()
.setFooter('Bora')
)
    //return message.channel.send(`Bir sebep yazmalısın.`)
  
  db.set(`afk_${user.id}`, sebep)
  message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem Başarılı!')
.setColor('BLACK')
.setDescription(`Artık \`${sebep}\` sebebiyle **AFK** moduna girdiniz`)
.setTimestamp()
.setFooter('Bora')
)
  //message.channel.send(`Artık \`${sebep}\` sebebiyle AFK'sın.`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'afk',
  description: "AFK olmanızı sağlar.",
  usage: 'afk <sebep>'
}