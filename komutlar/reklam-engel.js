const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(":no_entry: **Reklam engel** komutunu kullanmak için **__SUNUCUYU YÖNET__** Yetkisine sahip olman gerkeli")
  
  
  if (!args[0]){
    const embed = new Discord.RichEmbed()
    .setTitle('Reklam Engel Sistemi')
    .setColor('BLACK')
    .setDescription('Yanlış Kullanım Tespit Edildi. Doğru Kullanım \n`\`\w!reklam-engel aç | w!reklam-engel kapat\`\` \nYazabilirsiniz.')
    .setFooter('Wonders - 2020')
    message.channel.send(embed)
    //message.channel.send("Küfür Engel için Doğru Kullanım: b!küfür-engel aç / -küfür-engel kapat")
  }
  if(args[0] === "aç") {
    const embed2 = new Discord.RichEmbed()
    .setTitle('Reklam Engel Sistemi')
    .setColor('BLACK')
    .setDescription('Reklam Engel Sistemi Başarıyla Açıldı!')
    .setFooter('Wonders - 2020')
    message.channel.send(embed2)
    //message.channel.send("Küfür engel başarıyla açıldı")
    
    db.set(`reklam_${message.guild.id}`, "açık")
  }
    if(args[0] ===   "kapat") {
      const embed3 = new Discord.RichEmbed()
      .setTitle('Reklam Engel Sistemi')
      .setColor('BLACK')
      .setDescription('Reklam Engel Sistemi Başarıyla Kapatıldı!')
      .setFooter('Wonders - 2020')
      message.channel.send(embed3)
      //message.channel.send("Küfür engel başarıyla kapatıldı")
      
      db.set(`reklam_${message.guild.id}`, "kapalı")
      
    }
  
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "reklam-engel",
  description: "Reklam Engel Açar yada Kapatır.",
  usage: "reklam-engel"
}