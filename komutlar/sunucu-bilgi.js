const Discord = require('discord.js');
const moment = require("moment");

exports.run = (client, message) => {
  
let üyeler = message.guild.memberCount;
let botlar = message.guild.members.filter(m => m.user.bot).size;
let kullanıcılar = üyeler - botlar;
  const guild = message.guild.id
    var tarih = ''
            if(moment(guild.createdAt).format('MM') === '01') {
                var tarih = `${moment(guild.createdAt).format('DD')} Ocak ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '02') {
                var tarih = `${moment(guild.createdAt).format('DD')} Şubat ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '03') {
                var tarih = `${moment(guild.createdAt).format('DD')} Mart ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '04') {
                var tarih = `${moment(guild.createdAt).format('DD')} Nisan ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '05') {
                var tarih = `${moment(guild.createdAt).format('DD')} Mayıs ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '06') {
                var tarih = `${moment(guild.createdAt).format('DD')} Haziran ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '07') {
                var tarih = `${moment(guild.createdAt).format('DD')} Temmuz ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '08') {
                var tarih = `${moment(guild.createdAt).format('DD')} Ağustos ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '09') {
                var tarih = `${moment(guild.createdAt).format('DD')} Eylül ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '10') {
                var tarih = `${moment(guild.createdAt).format('DD')} Ekim ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '11') {
                var tarih = `${moment(guild.createdAt).format('DD')} Kasım ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '12') {
                var tarih = `${moment(guild.createdAt).format('DD')} Aralık ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
const sarap = client.emojis.get("706139219759988816")
const nitro = client.emojis.get("706127759226830928")
let sunucu = new Discord.RichEmbed()
.setAuthor(`${message.guild.name}`, message.guild.iconURL)
.setThumbnail(message.guild.iconURL)
.addField(`Ana Bilgiler`, `• Sunucu Sahibi: ${message.guild.owner} \n• Sunucu ID: **${message.guild.id}** \n• Sunucu Bölgesi: **${message.guild.region}** \n• Sunucu Kurulum Tarihi: **${tarih}**`)
//.addField('Sunucu İsmi', message.guild.name)
//.addField('Sunucu İdsi', message.guild.id)
//.addField('Sunucu Bölgesi', message.guild.region)
.addField('Üye Bilgileri', `• Toplam Kullanıcı Sayısı: **${üyeler}** \n• Toplam Üye Sayısı: **${kullanıcılar}** \n• Toplam Bot Sayısı: **${botlar}**`)
.addField('Kanal Bilgileri', `• Toplam Kategori Sayısı: **${message.guild.channels.filter(c => c.type === 'category').size}** \n• Toplam Kanal Sayısı: **${message.guild.channels.size}** \n• Toplam Rol Sayısı: **${message.guild.roles.size}** \n• Toplam Emoji Sayısı: **${message.guild.emojis.size}**`)
.addField(`Boost Bilgileri`, `• Toplam Basılan Boostlar: **${message.guild.premiumSubscriptionCount}** \n• Boost Seviyesi: **${message.guild.premiumTier}**`)
//.addField(`Boost Sayısı`, message.guild.premiumSubscriptionCount, true)
//.addField(`Boost seviyesi`, message.guild.premiumTier, true)
//.addField(`Üyeler ${message.guild.memberCount}`, `Çevrimiçi : ${message.guild.members.filter(m => m.user.presence.status === "online").size}\n Rahatsız Etmeyin: ${message.guild.members.filter(m => m.user.presence.status === 'dnd').size} \n Boşta: ${message.guild.members.filter(m => m.user.presence.status === 'idle').size} \n Çevrimdışı: ${message.guild.members.filter(m => m.user.presence.status === 'offline').size}`)
//.addField(`Kanallar ${message.guild.memberCount}`, ` Yazı: ${message.guild.channels.filter(c => c.type === 'text').size} \n Sesli: ${message.guild.channels.filter(c => c.type === 'voice').size} \n Kategori: ${message.guild.channels.filter(c => c.type === 'category').size}`)
//.addField('Roller:', message.guild.roles.map(role => role.name).join(', '), true)
//.addField('AFK kanalı:', `${message.guild.afkChannel}`, true)
//.addField('AFK zaman aşımı:', message.guild.afkTimeout, true)
//.addField('Oluşturma tarihi:', message.guild.createdAt, true)
.setTimestamp()
.setFooter(`${message.guild.name} | Sunucu Bilgi`, message.guild.iconURL)
return message.channel.send(sunucu)

}; 

module.exports.conf = {
aliases: [],
permLevel: 0, 
enabled: true,
guildOnly: true
};

module.exports.help = {
    name: 'sunucubilgi',
    description: '',
    usage: 'sunucubilgi'
};