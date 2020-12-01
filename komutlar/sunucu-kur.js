const Discord = require('discord.js');

exports.run = (client, message, args) => {
     if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(
new Discord.RichEmbed()
.setTitle('Yetkin Yok')
.setColor('BLACK')
.setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`)
.setTimestamp()
.setFooter('Wonders')
)
  //return message.channel.send(" Yetkin bulunmuyor.");
    message.channel.send(new Discord.RichEmbed().setColor('BLACK').setTitle('Sunucu Kurulum').setDescription('Gerekli Kanallar Kurulsun mu?.').setFooter('Bu eylemi onaylıyorsan "evet" yazman yeterlidir.Bu eylem 30 saniye içinde sona erecek'))
.then(() => {
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 40000,
errors: ['time'],
})
.then((collected) => {
  message.guild.channels.map(c => c.delete())
  message.guild.roles.forEach(sil => {sil.delete()});    
  message.guild.channels.map(c => c.delete())
  message.guild.roles.forEach(sil => {sil.delete()});   
  message.guild.channels.map(c => c.delete())
  message.guild.roles.forEach(sil => {sil.delete()});   

  
  
  
  
  message.guild.createChannel('●▬▬▬▬๑「📣」๑▬▬▬▬▬●', 'category', [{
       id: message.guild.id,
     }]);

  message.guild.createChannel(`📚│kurallar`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「📣」๑▬▬▬▬▬●")))
  ////////////////////////////////
  message.guild.createChannel(`📣│duyuru`, 'text')
 .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「📣」๑▬▬▬▬▬●")))
  ////////////////////////////////
  message.guild.createChannel(`🍬│rol-alma`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「📣」๑▬▬▬▬▬●")))
 ////////////////////////////////////////
  
    message.guild.createChannel('●▬▬▬▬๑「🤝」๑▬▬▬▬▬●', 'category', [{
       id: message.guild.id,
     }]);
  
  
  message.guild.createChannel(`🤝│pαrtnєr`, 'text')
   
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🤝」๑▬▬▬▬▬●")))
     

     //////////////////////////////////////////
  message.guild.createChannel(`🤝│pαrtnєr-tєхt`, 'text')
                              
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🤝」๑▬▬▬▬▬●")))
  //////////////////////////////////////////
message.guild.createChannel(`🤝│pαrtnєr-şαrt`, 'text')
  
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🤝」๑▬▬▬▬▬●")))
  
  
  
  ///////////////////////////////////////////////////////////////
  message.guild.createChannel('●▬▬▬▬๑「🌟」๑▬▬▬▬▬●', 'category', [{
       id: message.guild.id,
     }]);

  message.guild.createChannel(`🔮│sohbet`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🌟」๑▬▬▬▬▬●")))
  ////////////////////////////////
   message.guild.createChannel(`🔧│bot-komut`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🌟」๑▬▬▬▬▬●")))
  ////////////////////////////////
   message.guild.createChannel(`📸│medya`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🌟」๑▬▬▬▬▬●")))
  ////////////////////////////////
   message.guild.createChannel(`📥│gelen-giden`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🌟」๑▬▬▬▬▬●")))
  ////////////////////////////////
       
  
  
  /////////////////////////////////////////////
  message.guild.createChannel('●▬▬▬▬๑「🏆」๑▬▬▬▬▬●', 'category', [{
       id: message.guild.id,
     }]);

   message.guild.createChannel(`🏆│Sohbet¹`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🏆」๑▬▬▬▬▬●")))
  ////////////////////////////////
    message.guild.createChannel(`🏆│Sohbet²`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🏆」๑▬▬▬▬▬●")))
  ////////////////////////////////
    message.guild.createChannel(`🏆│Sohbet³`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🏆」๑▬▬▬▬▬●")))
  ////////////////////////////////
  
  
  
  
   /////////////////////////////////////////////
  message.guild.createChannel('●▬▬▬▬๑「🎵」๑▬▬▬▬▬●', 'category', [{
       id: message.guild.id,
     }]);

   message.guild.createChannel(`🎵│Müzik¹`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🎵」๑▬▬▬▬▬●")))
  ////////////////////////////////
    message.guild.createChannel(`🎵│Müzik²`, 'voice') //sa geldim ben aşkım :)
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🎵」๑▬▬▬▬▬●")))
  ////////////////////////////////
    message.guild.createChannel(`🎵│Müzik³`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🎵」๑▬▬▬▬▬●")))
  ////////////////////////////////
 
 
  
   /////////////////////////////////////////////
  message.guild.createChannel('●▬▬▬▬๑「🌙」๑▬▬▬▬▬●', 'category', [{
       id: message.guild.id,
     }]);

   message.guild.createChannel(`💤│Afk Odası`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "●▬▬▬▬๑「🌙」๑▬▬▬▬▬●")))
  ////////////////////////////////
  message.guild.createRole({
        name: `「👑」Founder`,
        color: "BLACK", 
        hoist: true,
        permissions: [
            "ADMINISTRATOR",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS",
        ]
    }).then(kurucurol => {
    message.guild.createRole({
        name: `「🔑」Owner`,
        color: "BLUE",
        hoist: true,
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
        }).then(adminrol => {
    message.guild.createRole({
        name: `「🔒」Admin`,
        color: "GREEN" ,
        hoist: true,
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
        }).then(modrol => {
    message.guild.createRole({
        name: `「♀️」Famale(s)`,
        color: '#00ffff',
        hoist: true
        }).then(destekrol => {
    message.guild.createRole({
        name: ` 「♂️」Male(s)`,
        color: "#000000" ,
        hoist: true
        }).then(özelrol => {
    message.guild.createRole({
        hoist: true,
        name: `「🤖」Bot(s)`,
        color: "GREEN" 
       
      
      
    })})})})})})
 });
});
};

exports.conf = {  
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'sunucukur',
  description: 'Bot İçin gerekli kanlları kurar.',
  usage: 'sunucu-kur'
};