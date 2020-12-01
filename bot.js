const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
 
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------------//

client.on('message', message => {
//Dcs Ekibi
const prefix = ayarlar.prefix

if (message.content === `<@734341007012921364>`) {
message.channel.send(
new Discord.RichEmbed()
.setTitle(`Merhaba ${message.author.tag}`)
.setColor('BLACK')
.setDescription(`• Prefix'im: **${prefix}** \n• Ping'im: **${client.ping}** \n• Sahibim: <@${ayarlar.sahip}> \n\nEğer komutlara bakmak istersen **w!yardım** yazman yeterli olucaktır!`)
)
}});

//-----------------------------//

client.on("guildCreate", guild => {
  let codeming1 = client.channels.get("736647115345756260")

 const codeming = new Discord.RichEmbed()
.setTitle("Bir sunucuya eklendim")
.setColor("BLUE")
.setDescription(`Bir sunucuya eklendim ve bilgileri altta yazmaktadır; \n\n**Sunucu Bilgileri** \n• | Sunucu Adı ➜ **${guild.name}** \n• | Sunucu ID ➜ **${guild.id}** \n• | Kullanıcı Sayısı ➜ **${guild.members.size}** \n\n**Genel Bilgileri** \n• | Kurucu Adı ➜ **${guild.owner.user.tag}** \n• | Kurucu ID ➜ **${guild.owner.user.id}** \n• | Eklenen Kullanıcı ➜ **+${guild.members.size} kullanıcı eklendi!**`)
.setTimestamp()
.setFooter('Eklenme Tarihim')
codeming1.send(codeming)
});

client.on("guildDelete", guild => {
  let codeming2 = client.channels.get("736647115345756260")

 const codeming3 = new Discord.RichEmbed()
.setTitle("Bir sunucudan atıldım.")
.setColor("BLUE")
.setTimestamp()
.setFooter("Atılma Tarihim")
.setDescription(`Bir sunucudan atıldım ve bilgileri altta yazmaktadır; \n\n**Sunucu Bilgileri** \n• | Sunucu Adı ➜ **${guild.name}** \n• | Sunucu ID ➜ **${guild.id}** \n• | Kullanıcı Sayısı ➜ **${guild.members.size}** \n\n**Genel Bilgileri** \n• | Kurucu Adı ➜ **${guild.owner.user.tag}** \n• | Kurucu ID ➜ **${guild.owner.user.id}** \n• | Eksilen Kullanıcı ➜ **-${guild.members.size} kullanıcı eksildi!**`)
codeming2.send(codeming3)
});

//--------------------//

client.on("guildCreate", guild => {
  let log = guild.channels.filter(c => c.type === "text").random();

const dcs = new Discord.RichEmbed()
.setTitle(`Bir Sunucuya Eklendim`)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setFooter(`Wonders`, client.user.avatarURl)
.setColor("BLACK")
.setDescription(`
●▬▬▬▬▬▬▬▬▬●

Beni Sunucuna Eklediğin İçin Teşekkür Ederim!
**w!yardım** Yazarak Kategorilere Bakabilirsin!
**w!öneri <öneriniz>** Yazarak Önerilerinizi Bildirebilirsiniz!
Prefixim: **${ayarlar.prefix}**

●▬▬▬▬▬▬▬▬▬●

Destek Sunucuma & Bot Davet Linkimi Aşşağıya Bıraktım.

[Destek Sunucum](https://discord.gg/XkarS52)
[Davet Linkim](https://discord.com/oauth2/authorize?client_id=734341007012921364&scope=bot&permissions=8)

●▬▬▬▬▬▬▬▬▬●
`)
//.addField('Prefixim', ayarlar.prefix)
//.addField(`Destek Sunucusu`, `[Tıkla](DESTEK SUNUCUSUNYAZIN)`)
//.addField('EXSTRA BILGI YAZA BILIRSINIZ')
log.send(dcs)
});

//--------------------//


//--------------------//

/*client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let kanal = db.fetch(`guvenlik${member.guild.id}`);
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");

  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627428441695977497/gvnlk-spheli.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment(kurulus).format("dddd");
  var kontrol;
  if (kurulus > 2629800000) kontrol = resim2;
  if (kurulus < 2629800000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/682590636523913238/684432336070115537/gvnlk-arka.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "güvenlik.png");
  client.channels.get(kanal).send(attachment);
});*/

/*client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/gPMMrQ.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/9YZZaO.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    
    var kontrol;
      if (kurulus > 1296000000) kontrol = resim1
    if (kurulus < 1296000000) kontrol = resim2

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'STARKs-güvenlik.png');
    chan.send(attachment)
});*/

//-----------------------------//

//-----------------------------//

client.on("channelDelete", async channel => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.createChannel(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.RichEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.get(kanal).send(embed);
    })
  client.on("channelCreate", async channel => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.RichEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.get(kanal).send(embed);
    })

//-------------------//

/*client.on("guildMemberAdd", member => {
let hg = db.fetch(`hoşgeldin_${member.guild.id}`)
client.channels.get(hg).send(
  new Discord.RichEmbed()
  .setTitle(`Sunucumuza Biri Katıldı.`)
  .setColor('BLACK')
  .setDescription(`- :inbox_tray: | \`\`${member.author.username}\`\` Sunucuya Katıldı. \n- Seninle Birlikte **${member.guild.memberCount}** Kişiyiz. \n- Sunucunun Keyfini Çıkar.`)
  )
})*/

//----------------------//

//---------------------//

/*client.on("guildMemberRemove", member => {
let bb = db.fetch(`görüşürüz_${member.guild.id}`)
client.channels.get(bb).send(
new Discord.RichEmbed()
  .setTitle(`Sunucumuzdan Biri Ayrıldı.`)
  .setColor('BLACK')
  .setDescription(`- :outbox_tray: | \`\`${member.author.username}\`\` Sunucudan Ayrıldı. \n- Senin Ayrılmanla Beraber **${member.guild.memberCount}** Kişiyiz. \n- Birdaha Bekleriz.`)
)
})*/

//--------------------//
client.on("message", async msg => {
  
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  
 let i = await db.fetch(`küfür_${msg.guild.id}`)
    
    if (i == 'açık') {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "göt", "amına", "oruspu", "orosbu", "dalyarak", "orrosbu", "orr", "orusbu evladı", "ananın amını", "şerefsiz", "pezo", "pezevenk", "şero", "p1ç", "am evladı", "meme", "yarr", "şiktir", "siktir git", "siktir", "got", "bok", "sg", "ananı", "sktr", "pipi", "popo", "sex", "seks", "porno", "porn", "sakso", "sıktır", "örüspü", "öruspu", "süraleni"];
        if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
          try {
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();

              let kembed = new Discord.RichEmbed()
              .setAuthor(msg.author.username, msg.author.avatarURL)
              .setColor("BLACK")
              .setDescription(`${msg.author.tag} Küfür etmemelisin!`)
              return msg.channel.send(kembed).then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapalı') {
      
    }
    if (!i) return;
    });

/*client.on("message", async msg => {
  let küfür = await db.fetch(`küfür_${msg.guild.id}`)
    if (küfür == "açık") {
        const küfür2 = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (küfür2.some(word => msg.content.includes(word))) {
          msg.delete();
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
            }
               var embed = new Discord.RichEmbed()
               .setColor("BLACK")
               .setDescription("Lütfen küfür etme!")
               
               msg.channel.send(embed).then(msg => msg.delete(3000));
            }
          }
      })*/
 
//---------------------------//

client.on("message", async  msg => {
const reklam = await db.fetch(`reklam_${msg.guild.id}`)
if(reklam == 'açık') {
const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".ga","cf", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party"];
if (reklam.some(word => msg.content.includes(word))) {
try {
if(!msg.member.hasPermission("MANAGE_GUILD")) {
msg.delete();
const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setDescription(`**<@${msg.author.id}> Lütfen reklam yapma!**`)
.setFooter(`${client.user.username}`, client.user.avatarURL)
.setTimestamp()
msg.channel.send(embed).then(msg => msg.delete(4000));
msg.delete(3000);                              
}              
} catch(err) {
console.log(err);
}
}
}
else if (reklam == 'kapalı') {      
}
if (!reklam) return;
});

//--------------------------//

/*client.on("messageDelete", async message => {
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  var kanal = await db.fetch(`modlogK_${message.guild.id}`)
  if (!kanal) return;
var kanal2 = message.guild.channels.find('name', kanal)  

  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription(`<@!${message.author.id}> tarafından <#${message.channel.id}> kanalına gönderilen \`\`\`${message.content}\`\`\` mesajı silindi.`)
  .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
  //.addField("Kullanıcı Tag", message.author.tag, true)
  //.addField("ID", message.author.id, true)
  //.addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setFooter('Bora Log Sistemi')
  kanal2.send(embed);
  
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  
  if (oldMsg.author.bot) return;
  
  var user = oldMsg.author;
  
  var kanal = await db.fetch(`modlogK_${oldMsg.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMsg.guild.channels.find('name', kanal) 
  
  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
  .addField("Gönderen", oldMsg.author.tag, true)
  .addField("Önceki Mesaj", `\`\`\`${oldMsg.content}\`\`\``, true)
  .addField("Şimdiki Mesaj", `\`\`\`${newMsg.content}\`\`\``, true)
  .addField("Kanal", newMsg.channel.name, true)
  //.addField("Kullanıcı Tag", oldMsg.author.tag, true)
  //.addField("ID", oldMsg.author.id, true)
  //.addField("Eski Mesaj", "```" + oldMsg.content + "```")
  //.addField("Yeni Mesaj", "```" + newMsg.content + "```")
  .setThumbnail(oldMsg.author.avatarURL)
  .setTimestamp()
  .setFooter('Bora Log Sistemi')
  kanal2.send(embed);
  
});
client.on("roleCreate", async role => {
  
  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)  

  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
  .addField("Rol", `\`\`\`${role.name}\`\`\``, true)
  .addField("Rol Rengi Kodu", `\`\`\`${role.hexColor}\`\`\``, true)
  .setTimestamp()
  .setFooter('Bora Log Sistemi')
  kanal2.send(embed);
  
});

client.on("roleDelete", async role => {
  
  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)    

  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
  .addField("Rol", `\`\`\`${role.name}\`\`\``, true)
  .addField("Rol Rengi Kodu", `\`\`\`${role.hexColor}\`\`\``, true)
  .setTimestamp()
  .setFooter('Bora Log Sistemi')
  kanal2.send(embed);
  
});

client.on("roleUpdate", async role => {
  
  if (!log[role.guild.id]) return;
  
 var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal) 
  
  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
  .addField("Rol", `\`\`\`${role.name}\`\`\``, true)
  .addField("Rol Rengi Kodu", `\`\`\`${role.hexColor}\`\`\``, true)
  .setTimestamp()
  .setFooter('Bora Log Sistemi')
  kanal2.send(embed);
  
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  
  
  
  var kanal = await db.fetch(`modlogK_${oldMember.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMember.guild.channels.find('name', kanal) 
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`**${newMember.user.tag}** adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    .setTimestamp()
    .setFooter('Bora Log Sistemi')
    kanal2.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`**${newMember.user.tag}** adlı kullanıcı bir sesli kanaldan çıkış yaptı!`)
    .setTimestamp()
    .setFooter('Bora Log Sistemi')
    kanal2.send(embed);
    
  }
  
  client.on('channelCreate', async (channel,member) => {
    const fs = require('fs')
    var kanal = await db.fetch(`modlogK_${member.guild.id}`)
    const hgK = member.guild.channels.find('name', kanal) 
    if (!hgK) return;
        if (!channel.guild) return;
            if (channel.type === "text") {
                var embed = new Discord.RichEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`<#${channel.id}> kanalı oluşturuldu. | __(metin kanalı)__`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send(embed);
            };
            if (channel.type === "voice") {
                var embed = new Discord.RichEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı oluşturuldu. | __(sesli kanal)__`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            }
        
    })
        
    client.on('channelDelete', async channel => {
            const fs = require('fs');
        var kanal = await db.fetch(`modlogK_${channel.guild.id}`)
  
        const hgK = channel.guild.channels.find('name', kanal) 
        if (!hgK) return;
            if (channel.type === "text") {
                let embed = new Discord.RichEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı silindi. | __(metin kanalı)__`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.RichEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı silindi. | __(sesli kanal)__`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            }
        
    });
  
});*/

//------------------//

client.on('message', async message => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` şu anda AFK. Sebep : \`${sebep}\``)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
});

//-----------------//

/*client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {ki
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(
              new Discord.RichEmbed()
              .setTitle('Capslock Engelleme Sistemi')
              .setColor('BLACK')
              .setDescription('✋ Lütfen Büyük Harf Kullanma!')
              .setFooter('Bora - 2020')
            ).then(m => m.delete(5000));
            eturn msg.channel
              .send(`✋ Lütfen Büyük Harf Kullanma!`)
              .then(m => m.delete(5000));
          }
        } //Dcs Ekibi
      }
    }
  }
});*/

//----------------//

const antispam = require("discord-anti-spam-tr");
client.on("message", msg => {
  const spamEngel = db.fetch(`spamEngel_${msg.guild.id}`)

  if(spamEngel == "açık"){


let spamEngel = JSON.parse(fs.readFileSync("./ayarlar/spamEngel.json", "utf8"));
//istediğiniz yere ekleyin bot.js de

antispam(client, {
  uyarmaSınırı: 15, //Uyarılmadan önce aralıkta gönderilmesine izin verilen maksimum mesaj miktarı.
  banlamaSınırı: 20, //Yasaklanmadan önce aralıkta gönderilmesine izin verilen maksimum ileti miktar.
  aralık: 300000, // ms kullanıcılarda zaman miktarı, yasaklanmadan önce aralık değişkeninin maksimumunu gönderebilir.
  // Uyarı mesajı, kullanıcıya hızlı gideceklerini belirten kullanıcıya gönderilir..
   //Yasak mesaj, yasaklanmış kullanıcıyı ,Banlar
  maxSpamUyarı: 7,//Bir kullanıcının uyarılmadan önce bir zaman dilimi içinde gönderebileceği maksimum kopya sayısı
  maxSpamBan: 20, //Bir kullanıcının yasaklanmadan önce bir zaman diliminde gönderebildiği maksimum kopya sayısı
  zaman: 7, // Spamdan sonraki zaman
  rolİsimi: "spam-susturulmuş" // Spam Atan Kullanıcılar Verilecek Röl
})
};
    }
)

//------------------//

client.on("message", async message => {
  const krstl = client.emojis.get("645227930208829450")
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
        a === "sea" ||
        a === "selamun aleykum" ||
            a === "selamın aleykum" ||
    a === "slm"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if (i === "acik") {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
      .setDescription("👑 **Oo, kral aleyküm selam.Hoş geldin**__**!**__")
        .setFooter(client.user.username, client.user.avatarURL);

      message.channel.send(embed).then(msg => msg.delete(5000));
    }
  }
});

//------------------//

client.on("message", async message => {
  let ever = await db.fetch(`ever_${message.guild.id}`);
  let sayı = await db.fetch(`sayi_${message.author.id}`);
  if (ever === "acik") {
    const a = message.content;
    if (a === "@everyone" || a === "@here") {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      db.add(`sayi_${message.author.id}`, 1);
      if (sayı == null) {
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription(
            "Bu 1. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(1/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı === 1) {
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription(
            "Bu 2. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(2/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı > 2) {
        message.delete();
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription("Sunucudan atılıyorsun!")
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        db.delete(`sayi_${message.author.id}`);
        message.member.kick();
        return;
      }
    }
  } else {
    return;
  }
});

//-------------------//

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otoR_${member.guild.id}`)
  let kanal = await db.fetch(`otoK_${member.guild.id}`)
  if(!rol) return
  if(!kanal) return 
member.addRole(member.guild.roles.get(rol))
  client.channels.get(kanal).send(`:loudspeaker::inbox_tray: Kullanıcı Katıldı! Otomatik Rol Verildi Seninle Birlikte **${member.guild.memberCount}** Kişiyiz! Hoşgeldin \`\`${member.user.tag}\`\``)
})

//---------------------//

client.on("guildMemberAdd", async member => {
  let sayı = await db.fetch(`sayaç_${member.guild.id}`)
  let kanal = await db.fetch(`sayaçK_${member.guild.id}`) 
  if(!sayı) return
  if(!kanal) return
  client.channels.get(kanal).send(`:loudspeaker::inbox_tray: Kullanıcı Katıldı! \`\`${sayı}\`\` Kişi Olmamıza \`\`${sayı - member.guild.members.size}\`\` Kişi Kaldı! \`\`${member.guild.memberCount}\`\` Kişiyiz! Hoşgeldin \`\`${member.user.tag}\`\``)
})
client.on("guildMemberRemove", async member => {
  let sayı = await db.fetch(`sayaç_${member.guild.id}`)
  let kanal = await db.fetch(`sayaçK_${member.guild.id}`)
  if(!sayı) return
  if(!kanal) return
  client.channels.get(kanal).send(`:loudspeaker::outbox_tray: Kullanıcı Ayrıldı! \`\`${sayı}\`\` Kişi Olmamıza \`\`${sayı - member.guild.members.size}\`\` Kişi Kaldı! \`\`${member.guild.memberCount}\`\` Kişiyiz! Görüşürüz \`\`${member.user.tag}\`\``)
})

//----------------------//

/*client.on('channelCreate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`emirlog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal oluşturuldu`, `İsmi: \`${channel.name}\`\nTÃ¼rÃ¼: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.get(db.fetch(`emirlog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal silindi`, `İsmi: \`${channel.name}\`\nTÃ¼rÃ¼: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

client.on('channelUpdate', (oldChannel, newChannel, channel) => { 
  const c = newChannel.guild.channels.get(db.fetch(`emirlog_${newChannel.guild.id}`));
  if (!c) return;

    let str = '';

        str+=`İsim: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;

    

    let embed = new Discord.RichEmbed()
                    .addField(`Kanal güncellendi`, `${str} ID: ${oldChannel.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${oldChannel.client.user.username}#${oldChannel.client.user.discriminator}`, oldChannel.client.user.avatarURL)
    c.send({embed})
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`emirlog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, `ismi: \`${emoji.name}\`\nGIF?: **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`emirlog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, `İsmi: \`${emoji.name}\`\nGIF? : **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(db.fetch(`emirlog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, `Eski ismi: \`${oldEmoji.name}\`\nYeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`emirlog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, `İsmi: \`${user.username}\`\nID: **${user.id}**\nSebep: **${entry.reason || 'Belirtmedi'}**\nBanlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafÄ±ndan`, entry.executor.avatarURL)

    channel.send(embed)
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`emirlog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı kaldırıldı`, `İsmi: \`${user.username}\`\nID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafÄ±ndan`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.get(db.fetch(`emirlog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .addField(`Mesaj silindi`,  `Mesaj: \`${message.content}\`\nKanal: **${message.channel.name}**\nID: ${message.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async (oldMessage, newMessage) => {    
      if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.get(db.fetch(`emirlog_${oldMessage.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator}`, oldMessage.author.avatarURL)
                    .addField(`Mesaj güncellendi`, ` Eski mesaj: \`${oldMessage.content}\`\nYeni mesaj: \`${newMessage.content}\`\nKanal: **${oldMessage.channel.name}**\nID: ${oldMessage.id}`)
                    .setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`, oldMessage.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`emirlog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, `İsmi: \`${role.name}\`\nID: ${role.id}`)                    
.setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`emirlog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, `İsmi: \`${role.name}\`\nID: ${role.id}`)                    
.setTimestamp()
                    //.setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});*/

/*client.on('guildBanAdd', async (guild, member) => {
   const embed = new Discord.RichEmbed()
                        .setTitle('Üye yasaklandı.')
                        .setAuthor(member.tag, member.avatarURL)
                        .setColor("BLUE")
                        .setDescription(`<@!${member.id}>, ${member.tag}`)
                        .setThumbnail(member.avatarURL)
                        .setFooter(`Bora Log Sistemi | ID: ${member.id}`)
                        .setTimestamp();
            let Log = await db.fetch(`modlogK_${guild.id}`)
    if (!client.channels.get(Log)) return console.log('Log')
    else client.channels.get(Log).send(embed)
 
               
        })

client.on('messageUpdate', async (oldMessage, newMessage) => {
 if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
  let embedds4 = new Discord.RichEmbed()
        .setColor("#0080ff")
        .setAuthor(`Mesaj Güncellendi!`)
        .setThumbnail(oldMessage.author.avatarURL)
        .addField("Gönderen", oldMessage.author.tag, true)
        .addField("Önceki Mesaj", `\`\`\`${oldMessage.content}\`\`\``, true)
        .addField("Şimdiki Mesaj", `\`\`\`${newMessage.content}\`\`\``, true)
        .addField("Kanal", newMessage.channel.name, true)
    let Log = await db.fetch(`modlogK_${oldMessage.guild.id}`)
    if (!oldMessage.client.channels.get(Log)) return console.log('Log')
    else oldMessage.client.channels.get(Log).send(embedds4)
})
       
        client.on('guildBanRemove', async (guild, member) => {
                        var embed = new Discord.RichEmbed()
                        .setTitle('Üyenin yasaklaması kaldırıldı.')
                        .setAuthor(member.tag, member.avatarURL)
                        .setColor("BLUE")
                        .setDescription(`<@${member.id}>, ${member.tag}`)
                        .setThumbnail(member.avatarURL)
                        .setFooter(`Bora Log Sistemi | ID: ${member.id}`)
                        .setTimestamp();
    let Log = await db.fetch(`modlogK_${guild.id}`)
    if (!client.channels.get(Log)) return console.log('Log')
    else client.channels.get(Log).send(embed)
               
        })
       
        client.on('messageDelete', async msg => {
       if (msg.author.bot) {
return false;
       }
      if (!msg.guild) {
return false;
      }
  
                        var embed = new Discord.RichEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL)
                        .setColor("BLUE")
                        .setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen \`\`\`${msg.content}\`\`\` mesajı silindi.`)
                        .setFooter(`Bora Log Sistemi | ID: ${msg.id}`)
    let Log = await db.fetch(`modlogK_${msg.guild.id}`)
    if (!msg.client.channels.get(Log)) return console.log('Log')
    else msg.client.channels.get(Log).send(embed)          
               
        })
 
        client.on('channelCreate', async channel => {
 
               
                        if (channel.type === "text") {
                                var embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
                                .setFooter(`Bora Log Sistemi | ID: ${channel.id}`)
                                 let Log = await db.fetch(`modlogK_${channel.guild.id}`)
    if (!channel.guild.channels.get(Log)) return console.log('Log')
    else channel.guild.channels.get(Log).send(embed)                      
                        };
                        if (channel.type === "voice") {
                                var embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
                                .setFooter(`Bora Log Sistemi | ID: ${channel.id}`)
         let Log = await db.fetch(`modlogK_${channel.guild.id}`)
    if (!channel.client.channels.get(Log)) return console.log('Log')
    else channel.client.channels.get(Log).send(embed)                       }
                        })
               
        client.on('channelDelete', async channel => {
 if (channel.type === "text") {
                                let embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
                                .setFooter(`Bora Log Sistemi | ID: ${channel.id}`)
         let Log = await db.fetch(`modlogK_${channel.guild.id}`)
    if (!channel.client.channels.get(Log)) return console.log('Log')
    else channel.client.channels.get(Log).send(embed)
                        };
                        if (channel.type === "voice") {
                                let embed = new Discord.RichEmbed()
                        .setColor("BLUE")
                                .setAuthor(channel.guild.name, channel.guild.iconURL)
                                .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
                                .setFooter(`Bora Log Sistemi | ID: ${channel.id}`)
 let Log = await db.fetch(`modlogK_${channel.guild.id}`)
    if (!channel.client.channels.get(Log)) return console.log('Log')
    else channel.client.channels.get(Log).send(embed)                       }
               
        })*/
//------------//

/*client.on('channelCreate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`emirlog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.get(db.fetch(`emirlog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`emirlog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`emirlog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`emirlog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(db.fetch(`emirlog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`emirlog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`emirlog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.get(db.fetch(`emirlog_${message.guild.id}`));
  if (!channel) return;
   
  let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator} kullanıcısının mesajı silindi`, message.author.avatarURL)
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("BLACK")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.get(db.fetch(`emirlog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.RichEmbed()
    .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator} kullanıcısı mesajını düzenledi`, oldMessage.author.avatarURL)
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("BLACK")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`emirlog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("BLACK")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`emirlog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("BLACK")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.fetch(`emirlog_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`emirlog_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});*/

const botadi = "Wonders"

client.on('messageDelete', message => {
  db.fetch(`modlogkanaly_${message.guild.id}`).then(modlogs => {
  const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (message.content.length > 1024) {
      modlogkanal.send({embed: {
    color: 3447003,
    author: {
      name: `${message.author.tag} tarafından gönderilen bir mesaj silindi`,
      icon_url: message.author.DisplayAvatarURL
    },
    fields: [{
        name: `Silinen mesaj 1024 karakterden fazla mesajı gösteremem`,
        value: `\`\`\`Bilinmiyor...\`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
    } else {
      modlogkanal.send({embed: {
    color: 3447003,
    author: {
      name: `${message.author.tag} kullanıcısının mesajı silindi\n`,
      icon_url: message.author.DisplayAvatarURL
    },
    fields: [{
        name: `Silinen mesaj:`,
        value: `\`\`\` ${message.content} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
    }
  }
})
})


client.on('guildBanAdd', async (guild, user) => {
  db.fetch(`modlogkanaly_${guild.id}`).then(modlogs => {
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.RichEmbed()
    .setColor("3447003")
    .setAuthor("Bir kişi sunucudan yasaklandı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});
})

client.on('guildBanRemove', async (guild, user) => {
  db.fetch(`modlogkanaly_${guild.id}`).then(modlogs => {
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.RichEmbed()
    .setColor("3447003")
    .setAuthor("Bir kişinin yasağı kaldırıldı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});
})

client.on('channelCreate', async channel => {
  db.fetch(`modlogkanaly_${channel.guild.id}`).then(modlogs => {
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
      fields: [{
          name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
          value: `\`\`\` ${channel.name} \`\`\``
        },
        {
          name: `Oluşturulan Kanalin Türü`,
          value: `\`\`\` Metin Kanalı \`\`\``
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `${botadi} | Mod-Log Sistemi`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Oluşturulan Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
}); 
      }
    }
  }
});
})

client.on('channelDelete', async channel => {
  db.fetch(`modlogkanaly_${channel.guild.id}`).then(modlogs => {
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
    fields: [{
        name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Silinen Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
      ],
      timestamp: new Date(),
      footer: {
        text: `${botadi} | Mod-Log Sistemi`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Silinen Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
}); 
      }
    }
  }
});
})

client.on('roleDelete', async role => {
  db.fetch(`modlogkanaly_${role.guild.id}`).then(modlogs => {
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Rol Silindi. \nSilinen Rolun İsmi:`,
        value: `\`\`\` ${role.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  }
});
})
client.on('emojiDelete', async emoji => {
  db.fetch(`modlogkanaly_${emoji.guild.id}`).then(modlogs => {
  const modlogkanal = emoji.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Emoji Silindi. \nSilinen Emojinin İsmi:`,
        value: `\`\`\` ${emoji.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  
  }
});
});

client.on('roleCreate', async role => {
  db.fetch(`modlogkanaly_${role.guild.id}`).then(modlogs => {
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
     modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Yeni Bir Rol Oluşturuldu. \nOluşturulan Rolun İsmi:`,
        value: `\`\`\` ${role.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  }
});
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
  db.fetch(`modlogkanaly_${oldMessage.guild.id}`).then(modlogs => {
  const modlogkanal = oldMessage.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }
    modlogkanal.send({embed: {
      color: 3447003,
      author: {
      name: `${oldMessage.author.tag} mesajını düzenledi:\n`,
      icon_url: oldMessage.author.DisplayAvatarURL
      },
      fields: [{
        name: `Eski mesaj:`,
        value: `\`\`\` ${oldMessage.content} \`\`\``
      },
      {
        name: `Yeni Mesaj:`,
        value: `\`\`\` ${newMessage.content} \`\`\``
      }
      ],
      timestamp: new Date(),
      footer: {
      icon_url: oldMessage.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
      }
    }
    });
  }
});
});

client.on('emojiCreate', async emoji => {
  db.fetch(`modlogkanaly_${emoji.guild.id}`).then(modlogs => {
  const modlogkanal = emoji.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir emoji eklendi. \nEklenen Emojinin İsmi:`,
        value: `\`\`\` ${emoji.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    } 
   } 
});
  }
});
})

//-----------------------//

client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye ・"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye ・"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar ・"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik ・"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye ・ ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye ・ ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar ・ ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik ・ ${rekoronline}`)
   } catch(e) { }
  }
})

client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye ・"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye ・"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar ・"))
    let rekoraktif = member.guild.channels.
    find(x =>(x.name).startsWith("Rekor Aktiflik ・"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye ・ ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye ・ ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar ・ ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik ・ ${rekoronline}`)
   } catch(e) { }
  }
})
   
//---------------------//

//Ban Limit
client.on("guildBanAdd", async(guild, user) => {
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  let banlimit = await db.fetch(`banlimit31_${guild.id}`)
  let kullanıcıban = await db.fetch(`banlimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(banlimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`banlimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${kullanıcıban}`)
        
        if(kullanıcıban >= banlimit) {
        
          try {
                guild.kick(entry.executor.id, "Ban Limit")
client.channels.get(log).send(`Sunucundan bir yetkili ban limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)          } catch(err) { }
          db.delete(`banlimitP31_${entry.executor.id}`)
        }
      }
    }
  
})


//Kanal Limit
client.on("channelDelete", async(channel) => {
  const guild = channel.guild;
  const entry = await guild.fetchAuditLogs({type: 12}).then(audit => audit.entries.first())
  let kanallimit = await db.fetch(`klimit31_${guild.id}`)
  let kullanıcılimit = await db.fetch(`klimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(kanallimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`klimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${channel.name}\` adlı kanal ${entry.executor} tarafından silindi!`)
        
        if(kullanıcılimit >= kanallimit) {
                  try {
            client.channels.get(log).send(`Sunucundan bir yetkili kanal limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
            guild.kick(entry.executor.id, "Kanal Limit")
            
          } catch(err) { }
          db.delete(`klimitP31_${entry.executor.id}`)
        }
      }
    }
  
})

//Rol Limit
client.on("roleDelete", async(role) => {
  const guild = role.guild;
  const entry = await guild.fetchAuditLogs({type: 32}).then(audit => audit.entries.first())
  let kanallimit = await db.fetch(`rlimit31_${guild.id}`)
  let kullanıcılimit = await db.fetch(`rlimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(kanallimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`rlimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${role.name}\` adlı rol ${entry.executor} tarafından silindi!`)
        
        if(kullanıcılimit >= kanallimit) {
                  try {
            client.channels.get(log).send(`Sunucundan bir yetkili rol limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
            guild.kick(entry.executor.id, "Rol Limit")
            
          } catch(err) { }
          db.delete(`rlimitP31_${entry.executor.id}`)
        }
      }
    }
  
})

//---------------------//
 
client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let timeout = 86400000
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = db.fetch(`gold_${msg.author.id}`)
          if (i == 'gold') {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());

  var embed = new Discord.RichEmbed()
  .setThumbnail(`https://cdn.discordapp.com/emojis/679038564994121744.gif?v=1`)
  .setDescription(`Seni Burada Görmek Güzel <@${msg.author.id}>** __İşte Bir Gold Üye__\`\`Unutma\`\`<@${msg.author.id}> \`\`Ne Olduğun Değil Ne Olacağın Önemlidir.!\`\``)
  .setColor("BLACK")
  .setFooter(`${client.user.username} - Tüm hakları saklıdır.`, client.user.avatarURL)
   msg.channel.send(embed)
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});

//---------------------//
