const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const istatistikozel = new Discord.RichEmbed()
    .setColor('BLACK')
  //.setDescription(`${client.user.username}`)
.setTitle('Wonders | İstatistik')
.setThumbnail(client.user.avatarURL)
.setDescription(`
**Genel Bilgiler**
• Botun Sahibi ➜ <@363047525097275392>
• Bellek Kullanımı ➜ **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**
• Ping ➜ **${client.ping}**
• Shard ➜ **1/1**

**Vds Bilgileri**
• Ram: **2.00 GB**
• İşletim Sistemi: **win32**
• İşlemci: **Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz**
• Bit: **x64**

**Botun Bilgileri**
• Kullanıcı Sayısı ➜ **${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}**
• Sunucu Sayısı ➜ **${client.guilds.size.toLocaleString()}**
• Kanal Sayısı ➜ **${client.channels.size.toLocaleString()}**
• Discord.js Sürümü ➜ **${Discord.version}**

**Uptime Süresi**
\`\`\`${moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]')}\`\`\`
**Güncelleme**
Botun teması değişmiştir.
`)
.setImage('https://images-ext-2.discordapp.net/external/iq8EoLqJUConIqeIAQBCTEUYQrzGi3J3ORP1fk9dCQs/https/media.discordapp.net/attachments/744236356561141851/754052263063846972/standard.gif')
.setTimestamp()
.setFooter('Wonders')
  //.addField(` Bot Sahipleri:`, `<@312307937949384715>`, true)
  //.addField('Shard:', '1/1', true)
  //.addField("Bellek Kullanımı:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  //.addField("Sunucu Sayısı:", `${client.guilds.size.toLocaleString()}`, true).addField("Kullanıcı Sayısı:", `${client.users.size}`, true)
  //.addField("Toplam Kullanıcı Sayısı:", `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  //.addField("Kanal Sayısı:", `${client.channels.size.toLocaleString()}`, true)
  //.addField(`Ne Kadar Süredir Aktif:`, `${duration}`, true)
  //.addField("Ping:", `${client.ping}`, true)
  //.addField("Discord.js Sürümü:", `${Discord.version}`, true)
  //.addField(`Davet Et`, `[Tıkla]()`, true)
  message.channel.sendEmbed(istatistikozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik', 'i', 'istatistikler', 'botbilgi', 'bilgi', 'hakkında', 'bot hakkında', 'bothakkında'],
      kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
     description: 'Botun istatistiklerini gösterir.',
usage: 'istatistik'
};
