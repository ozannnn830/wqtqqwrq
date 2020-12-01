const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let user = client.users.get(args.slice(0).join(' '));
  if (!user) {
    let e = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Kara listeye almak istediğin kullanıcının ID'ini yaz!")
    message.channel.send({embed: e})
    return;
  };
  
  if (db.fetch(`karaliste_${user.id}`) === true) return message.reply("Bu kullanıcı zaten kara listede!");
  
  db.delete(`karaliste_${user.id}`, "aktif")
  
  let embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user.tag} adlı kullanıcı başarıyla kara listeye alındı!`)
    message.channel.send({embed: embed})
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["blacklist", "kara-liste"],
  permLevel: 4,
    kategori: "yapımcı"
};

exports.help = {
  name: "kara-liste",
  description: "Belirtilen kullancıyı kara listeye alır!",
  usage: "karaliste <kullanıcı ID>"
};