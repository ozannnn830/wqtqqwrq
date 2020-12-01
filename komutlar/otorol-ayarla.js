const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
 if(!message.member.hasPermission("ADMINISTRATOR")) 
   return message.channel.send(
    new Discord.RichEmbed()
    .setDescription('Bu Komutu Kullanmaya Yetkin Yok!')
    .setColor('BLACK')
   )
   //return message.reply("Otorol sistemini ayarlamak için yeterli yetkin yok!");
  let evet = client.emojis.get("703238070497050714")
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();
  if(!rol) return message.channel.send(
    new Discord.RichEmbed()
    .setDescription('Bir Rol Etiketlemelisin')
    .setColor('BLACK')
  )
  if(!kanal) return message.channel.send(
   new Discord.RichEmbed()
   .setDescription('Bir Kanal Etiketlemelisin')
   .setColor('BLACK')
  )
  //if(!rol) return message.channel.send(":exclamation: Rol etiketlemedin `Doğru kullanım: -otorol-ayarla @rol #kanal`")
  //if(!kanal) return message.channel.send(":pencil: Kanal etiketlemedin `Doğru kullanım:-otorol-ayarla @rol #kanal`")
  
  db.set(`otoR_${message.guild.id}`, rol.id);
  db.set(`otoK_${message.guild.id}`, kanal.id);
  /*message.channel.send(
  new Discord.RichEmbed()
  .setTitle('İşlem Başarılı!')
  .setDescription(`Otorol: ${rol} \nKanal: ${kanal} \nOlarak Ayarlandı.`)
  .setColor('BLACK')
  )*/
  message.channel.send(`
╔▬▬▬▬▬▬▬▬Otorol▬▬▬▬▬▬▬▬▬
║► ${evet} Otorol Aktif Edildi.
║► ${evet} ${kanal} Olarak Güncelledim! 
║► ${evet} Otorol Kanalını ${kanal} Olarak Güncelledim! 
║► ${evet} Otorol Rolünü ${rol} Olarak Güncelledim!
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  `)
  //message.channel.send(`:4888_yep: Başarılı! Artık Bir kullanıcı sunucuya girdiğinde ${rol} rolünü vereceğim ${kanal} kanalına log tutacağım. Seninde yapman gereken benim rolümü üste almak alırsanız hatasız çalışırım`)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'otorol-ayarla',
  description: 'Otorol sistemini ayarlamaya yarar.',
  usage: '-otorol-ayarla @rol #kanal'
};