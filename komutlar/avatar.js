const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client, message, args) => {

    let user = message.mentions.users.first() || message.author

    const avatar = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(user.username + "'in avatarı")
    .setImage(user.avatarURL)
    .setFooter(client.user.username + " | Avatar")
    .setTimestamp()
    message.channel.send(avatar)
console.log(`Avatar ${message.author.username} Tarafından kullanıldı`)
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pp","profil-foto","profil-fotoğraf"],
    permLevel: 0,
    kategori: 'kullanıcı'
}

exports.help = {
    name: 'avatar',
    description: 'Etiketlediğiniz kullanıcının avatarını gösterir.',
    usage: 'avatar'
}