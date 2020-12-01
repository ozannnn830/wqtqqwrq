const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let user = client.users.get(args.slice(0).join(' '));
  if (!user) {
    let e = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Kara listeden kaldırmak istediğin kullanıcının ID'ini yaz!")
    message.channel.send({embed: e})
    return;
  };
  
  db.delete(`karaliste_${user.id}`)
  
  let embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user.tag} adlı kullanıcı başarıyla kara listeden çıkartıldı!`)
    message.channel.send({embed: embed})
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
    kategori: "sahip"
};

exports.help = {
  name: "beyaz-liste",
  description: "Belirtilen kullancıyı kara listeden çıkartır.",
  usage: "beyaz-liste <kullanıcı ID>"
};