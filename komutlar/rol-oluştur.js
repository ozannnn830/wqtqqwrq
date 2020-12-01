const Discord = require("discord.js")

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_ROLES"))
  return message.channel.send("Bu Komutu Kullanabilmen İçin Rolleri Yönet Yetkilisi Olman Lazım !")

let guild = message.guild;
let isim = args.slice(0).join(" ");
if (!isim)
 return message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem Başarısız!')
.setColor('BLACK')
.setDescription(`Bir isim belirtmemiz gerekiyor. Örnek; \`\`w!rol-oluştur Yönetici\`\``)
.setTimestamp()
.setFooter('Wonders')
)
  
 //return message.channel.send("Bir İsim Belirtiniz")

guild.createRole({
   name: isim
})
 .then(role => message.channel.send(
new Discord.RichEmbed()
.setTitle('İşlem Başarılı!')
.setColor('BLACK')
.setDescription(`Başarıyla \`\`${role.name}\`\` adlı rol oluşturuldu!`)
.setTimestamp()
.setFooter('Wonders')
))
       //message.channel.send(`${role.name} Adlı Rol Oluşturuldu`))
 .catch(console.error)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rololuştur'],
  permLevel: 0
};

exports.help = {
  name: 'rol-oluştur',
  description: "Rol Oluşturur",
  usage: 'oluştur',
  kategori: 'yetkili'
};