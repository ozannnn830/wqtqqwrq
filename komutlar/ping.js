const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args, color) => {

    let start = Date.now(); message.channel.send('Yükleniyor!').then(message => { 
    let diff = (Date.now() - start); 
    let API = (client.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setTitle(`Sistem Hızı`)
        .setColor("BLACK")
        .addField("Mesaj Gecikmesi: ", `${diff} ms`, true)
        .addField("Bot Gecikmesi: ", `${API} ms`, true)
        message.edit(embed);
      
    });

}



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

exports.help = {
    name: 'ping',
    category: 'INFO'
}