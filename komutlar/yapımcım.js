const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const client = new Discord.Client();
exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("BLACK")
    .setTimestamp()
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(`İşte benim sahibim! <@${ayarlar.sahip}>`);
    message.channel.sendEmbed(ozelmesajkontrol) }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım','yapımcı','yapımcılarım','yapımcılar',],
  permLevel: 0
};
exports.help = {
  name: 'yapımcım',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};