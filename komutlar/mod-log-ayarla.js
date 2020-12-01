const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');


exports.run = async(client, message, args) => {
  
  let modlogayarla = db.fetch(`modlogkanaly_${message.guild.id}`)
  
  
  
let p = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if (!message.member.permissions.has('KICK_MEMBERS')) {
    const izinyok = new Discord.RichEmbed()
    .setTitle('Başarısız')
    .setDescription('Bu Komut İçin Yetkin Yok!')
    return message.channel.send(izinyok)
}
if (!args[0]) {
  const sa = new Discord.RichEmbed()
  .setTitle('Hatalı Kullanım!')
  .setDescription(`Yanlış kullanım. Örnek: \`\`${p}mod-log #kanal | ${p}mod-log sıfırla\`\``)
  return message.channel.send(sa)
}

    
    let kanal = message.mentions.channels.first();
    if(!kanal) {
      return message.channel.send(
new Discord.RichEmbed()
.setTitle('Hatalı Kullanım!')
.setColor('BLACK')
.setDescription(`Bir kanal etiketlemelisin!`)
.setTimestamp()
.setFooter('Wonders')
)
      /*const bulunamadi = new Discord.RichEmbed()
      .setTitle('Hatalı Kullanım')
      .setDescription(`Kanal Belirtmedin!`)
      return message.channel.send*/
      }
     
    db.set(`modlogkanaly_${message.guild.id}`, kanal.id)
    //const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogayarla);
    const küfürengelcim = new Discord.RichEmbed()
    .setTitle('Başarılı')
    .setDescription(`ModLog kanalı başarıyla ${kanal} olarak ayarlandı. `)
    .setTimestamp()
    .setFooter('Wonders')
    return message.channel.send(küfürengelcim)

  
  
  if (args [0] == 'sıfırla') {
    
    db.delete(`modlogkanaly_${message.guild.id}`)

   const küfürengelcim2 = new Discord.RichEmbed()
    .setTitle('Başarılı')
    .setDescription('Modlogu kanalı başarıyla sıfırlandı.')
    .setTimestamp()
    .setFooter('Wonders')
    return message.channel.send(küfürengelcim2)
   
  }


};
exports.conf = {
  enabled: true,  
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'mod-log'
};