const Discord = require('discord.js')
const db = require('quick.db');
const moment = require("moment")
require("moment-duration-format")
const dateFormat = require("dateformat")
const client = new Discord.Client();

const botadi = "Wonders"

exports.run = async (client, msg, args) => {
  
        let simdikitarih = moment.utc(msg.createdAt).format('DD MM YYYY');
        let user = msg.mentions.users.first() || msg.author;
        const member = msg.guild.member(user);
        const millisCreated = new Date().getTime() - user.createdAt.getTime();
        const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
        const millisJoined = new Date().getTime() - member.joinedAt.getTime();
        const userJoined = moment.duration(millisJoined).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
        const sari = client.emojis.get("712428878769160263")
        const kirmizi = client.emojis.get("722171571405586442")
        const yesil = client.emojis.get("722171589419860403")
        const gri = client.emojis.get("706127769641287730")
        const dans = client.emojis.get("714951167645450312")
        const trrek = client.emojis.get("714951800834490398")
        let userinfo = {};
        //let rozet = user.flags.toArray()
        userinfo.avatar= user.displayAvatarURL;
        userinfo.id = user.id;
        userinfo.od1 = msg.guild.members.get(user.id).user.presence.game || "Oynadığı bir oyun yok"
        userinfo.status = user.presence.status.toString()
        .replace("dnd", `**Rahatsız Etmeyin** ${kirmizi}`)
        .replace("online", `**Çevrimiçi** ${yesil}`)
        .replace("idle", `**Boşta** ${sari}`)
        .replace("offline", `**Çevrimdışı** ${gri}`)
  
        userinfo.bot = user.bot.toString()
        .replace("false", `Hayır`)
        .replace("true", `Evet`)
  
        userinfo.sonmesaj = user.lastMessage || "Son yazılan mesaj bulunamadı." || "Son yazılan mesaj gösterilemedi."
  

        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)

        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)
        userinfo.dctarihkatilma = moment.utc(msg.guild.members.get(user.id).joinedAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] [``DD/MM/YYYY``]')

        .replace("Monday", `**Pazartesi**`)
        .replace("Tuesday", `**Salı**`)
        .replace("Wednesday", `**Çarşamba**`)
        .replace("Thursday", `**Perşembe**`)
        .replace("Friday", `**Cuma**`)
        .replace("Saturday", `**Cumartesi**`)
        .replace("Sunday", `**Pazar**`)

        .replace("January", `**Ocak**`)
        .replace("February", `**Şubat**`)
        .replace("March", `**Mart**`)
        .replace("April", `**Nisan**`)
        .replace("May", `**Mayıs**`)
        .replace("June", `**Haziran**`)
        .replace("July", `**Temmuz**`)
        .replace("August", `**Ağustos**`)
        .replace("September", `**Eylül**`)
        .replace("October", `**Ekim**`)
        .replace("November", `**Kasım**`)
        .replace("December", `**Aralık**`)
     
        const uembed = new Discord.RichEmbed()
        .setAuthor(user.tag)
        .setThumbnail(userinfo.avatar)
        //.setTitle('Kullanıcı;')
        .addField(`Ana Bilgileri`, `• Kullanıcı Adı: **${user.username}** \n• Takma Adı: **${member.displayName}** \n• Kullanıcı ID: **${userinfo.id}** \n• Kullanıcı Durumu: ${userinfo.status} \n• (Discord) Katılma Tarihi: **${daysCreated}**`)
        .addField(`Üye Bilgileri`, `• (Sunucu) Katılma Tarihi: **${userJoined}** \n• Rolleri: ${msg.guild.members.get(user.id).roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') || "**Bu kullanıcının hiçbir rolü bulunmuyor**"}`)
        //.addField(`Şu anda oynadığı oyun`, userinfo.od1, false)
        //.addField(`Durum`, userinfo.status, false)
        .setColor('BLACK')
        //.addField(`Katılım Tarihi (Sunucu)`, userinfo.dctarihkatilma, false)
        //.addField(`Katılım Tarihi (Discord)`, userinfo.dctarih, false)
        //.addField(`Kimlik:`, userinfo.id, true)
        //.addField(`Botmu:`, userinfo.bot, true)
        //.addField(`Roller:`, `${msg.guild.members.get(user.id).roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') || "**Bu kullanıcıda hiçbir rol bulunmuyor**"}`, false)
        //.addField(`Son gönderdiği mesaj:`, userinfo.sonmesaj, false)
        .setTimestamp()
        .setFooter(`${botadi}`)
        msg.channel.send(uembed)
    }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kb"],
  permLevel: 0
};

exports.help = {
  name: 'kullanıcı-bilgi',
  description: 'İstediğiniz kullanıcını bilgilerini gösterir.',
  usage: 'kullanıcı-bilgi'
};