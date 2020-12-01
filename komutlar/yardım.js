const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {

  const turuncu = client.emojis.get("711401519223930963")
  const ayarlar = client.emojis.get("706124704943046756")
  const unlem = client.emojis.get("706127756206932048")
  const bilgi = client.emojis.get("715630499145449542")
  const tac = client.emojis.get("715689263940763688")
  const donen = client.emojis.get("715689171628589056")
  const ayar = client.emojis.get("709244393043001455")
  const samet = new Discord.RichEmbed()
  .setAuthor('Wonders - Kategoriler', client.user.avatarURL)
  //.setThumbnail(client.user.avatarURL)
  //.setImage('https://i.hizliresim.com/RIrXt1.jpg')
  .setColor('BLACK')
  .setDescription(`Komutlar hakkında bilgi almak istersen **w!komut-bilgi <komut-adı>** yazmanız yeterli olucaktır! \n\n**• [w!kullanıcı](http://gg.gg/wondersbott)** ➜ Kullanıcı komutları \n**• [w!yetkili](http://gg.gg/wondersbott)** ➜ Yetkili komutları \n**• [w!ayarlar](http://gg.gg/wondersbott)** ➜ Ayarlar komutları \n**• [w!sahip](http://gg.gg/wondersbott)** ➜ Sahip komutları \n**• [w!bot](http://gg.gg/wondersbott)** ➜ Bot komutları \n**• [w!koruma](http://gg.gg/wondersbott)** ➜ Koruma sistemi komutları \n\n   [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=734341007012921364&scope=bot&permissions=8)   |   [Destek Sunucusu](https://discord.gg/XkarS52)`)
  .setTimestamp()
  .setImage('https://media.discordapp.net/attachments/744236356561141851/754052263063846972/standard.gif')
  message.channel.send(samet)

    /*const juke = new Discord.RichEmbed()
    .setColor('Bora')
    .setAuthor(`Bora`, client.user.avatarURL)
    .setDescription('**Komutlar hakkında bilgi almak istersen ``b!komut-bilgi <komut-adı>`` yazmanız yeterli olucaktır.**')
  //.setDescription('**[Website]() [destek sunucumuz]() [oyver]()**')
    .setThumbnail(client.user.avatarURL)
    .addField('** b!sunucu (12)**', '`davet`, `istatistik`, `bot-bilgi`, `afk`, `avatar`, `emojiler`, `roller`, `ping`, `kullanıcı-bilgi`, `komut-bilgi`, `korona-bilgi`, `sunucuresmi`')
    .addField('** b!yetkili (11)**', '`ban`, `kick`, mute, `unmute`, `temizle`, `sil`, `sil-üye`, `slowmode`, `rol-al`, `rol-ver`, `reboot`')
    .addField('** b!ayarlar (13)**', '`küfür-engel`, `reklam-engel`, `anti-spam`, `sa-as`, `otorol-ayarla`, `sayaç-ayarla`, `everyone-engel`, `güvenlik`, `capslock-engel`, `kanal-koruma-kanal-ayarla`, `kanal-koruma-sıfırla`, `log-ayarla`, `mod-log-ayarla`')
    .setFooter(``, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(juke).catch()*/

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};
