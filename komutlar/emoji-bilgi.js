const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, args) => {
    let emojiname = args[0];
    const emoji = (message.guild.emojis.find("name", `${emojiname}`))
    if(!emojiname) return message.channel.send(
new Discord.RichEmbed()
.setTitle('Hatalı Kullanım')
.setColor('BLACK')
.setDescription('Bir emoji ismi belirtmelisin. Örnek: **w!emojibilgi evet**')
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
      //return message.channel.send('İlk önce bir emoji ismi yazman \`:\` işaretleri kullanmadan \n Örnek: **!!emojibilgi yey**')
    if (!emoji) return message.channel.send(
new Discord.RichEmbed()
.setTitle('Hatalı Kullanım')
.setColor('BLACK')
.setDescription('Öyle bir emoji bulamadım. Botun bulunduğu sunuculardaki emoji isimleri geçerlidir.')
.setTimestamp()
.setFooter(`${client.user.username}`, client.user.avatarURL)
)
      //return message.channel.send("<a:notick:700630072301715467> Öyle bir emoji bulamadım\n-Bulunduğun sunucudaki emojilerin ismini kullan\n-**Discordun Kendi Emojilerini** kullanma sonradan sunucuya eklenmiş olan emojileri kullan \n-Yetkilerimi kontrol et!")
    emoji.tarih = moment.utc(message.guild.emojis.get(emoji.id).createdAt).format('DD/MM/YYYY dddd [Günü] HH:mm')
    .replace("Monday", `Pazartesi`)
    .replace("Tuesday", `Salı`)
    .replace("Wednesday", `Çarşamba`)
    .replace("Thursday", `Perşembe`)
    .replace("Friday", `Cuma`)
    .replace("Saturday", `Cumartesi`)
    .replace("Sunday", `Pazar`)

    .replace("January", `Ocak`)
    .replace("February", `Şubat`)
    .replace("March", `Mart`)
    .replace("April", `Nisan`)
    .replace("May", `Mayıs`)
    .replace("June", `Haziran`)
    .replace("July", `Temmuz`)
    .replace("August", `Ağustos`)
    .replace("September", `Eylül`)
    .replace("October", `Ekim`)
    .replace("November", `Kasım`)
    .replace("December", `Aralık`)
      var emojis = emoji.animated
      if (emojis == true) emojis = `<a:${emoji.name}:${emoji.id}>`
      if (emojis == false) emojis = `<:${emoji.name}:${emoji.id}>`
    var fil = emoji.animated.toString()
          .replace("true", `Haraketli`)
          .replace("false", `Hareketsiz`)
   const embed = new Discord.RichEmbed()
    .setColor("BLACK")
   .setTitle(`Emoji Bilgi`)
    .setThumbnail(`${emoji.url}`)
   .setTimestamp()
   .setFooter('Wonders')
    .setDescription(`**Emojinin Bilgileri** \n• Emojinin İsmi: \`${emoji.name}\` \n• Emojinin Kimliği: \`${emoji.id}\` \n• Emojinin Kodu: \`${emojis}\` \n\n**Emojinin Genel Bilgileri** \n• Emojinin Oluşturulma Tarihi: \`${emoji.tarih}\` \n• Emoji Hareket Durumu: \`${fil}\` \n• Emojinin Görünümü: ${emojis}`)
    //.addField("Emojinin ismi", `\`${emoji.name}\``, true)
    //.addField("Emoji ID", `\`${emoji.id}\``, true)
    //.addField("Emoji saksofilli  ", `\`${emoji.uploaded}\``, true)
    //.addField("Emoji Hareketli mi ?", `**${fil}**`, false) //addedBy
    //.addField("Emoji Kullanım şekli", `\`${emojis}\``, true)
    //.addField("Link", `[Emojinin Bağlantısı](${emoji.url})`, true)
    //.addField("Oluşturan Kullanıcı", `${emoji.createdBy}`, false)
    //.addField("Oluşturulma Tarihi", emoji.tarih, false)
 
    message.channel.send(embed)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emoji-bilgi','eb'],
    permLevel: 0
}

exports.help = {
    name: 'emojibilgi',
    category: 'Kullanıcı',
    description: 'İsmini yazdığınız emoji hakkında bilgi verir',
    usage: 'emojibilgi'
}