const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
const ms = require('ms')
module.exports = async message => {
  let client = message.client;
  if (message.author.bot) return;
  let prefix = await ayarlar.prefix
  if(message.content.startsWith(prefix)) {
  let kullanıcı = await db.fetch(`karaliste_${message.author.id}`);
  if(kullanıcı) return message.channel.send(
  new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription("Sen botun komutlarını kullanamazsın! Çünkü botun kara listesindesin!")
  )
  };
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
  cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
  cmd = client.commands.get(client.aliases.get(command));
  }
  //let veri = await db.fetch(`bakım`)
  //let açıklama = await db.fetch(`açıklama`)
//if(veri) {
 //if(message.author.id !== "340585082236567552") {
 if (cmd){
 let veri = await db.fetch(`bakım`)
 let açıklama = await db.fetch(`açıklama`)
 if(veri) {
 if(message.author.id !== "340585082236567552") {
 let codeming = new Discord.RichEmbed()
 .setTitle('Bakımdayız')
 .setDescription('Bot,şu an kurucu tarafından bakıma alındı.')
 .addField('Bakım Sebebi:', veri)
 .addField('Bakım Bitiş Tarihi', açıklama)
 .setColor('RED')
message.channel.send(codeming).then(m => m.delete(10000))
 return
 }  
} //if (cmd){
  /*let kushinabotbyarashi = db.fetch(`kushinabot.byarashi`)
  let tarih = db.fetch(`bakimtarih`)
  let sebep = db.fetch(`bakimsebep`)  // SUNUCUYA BAK

  if(!ayarlar.sahip.includes(message.author.id)){
  if(kushinabotbyarashi == 'aktif'){
  let bakim = new Discord.RichEmbed()
  .setTitle('KOMUTLAR KULLANILAMAZ!')
  .setDescription(`Şuan da Bora botumuz bakım altındadır! \n Tahmin Edilen Bitiş Tarihi: **${tarih}**\n Bakım sebebi: **${sebep}**`)
  .setFooter('Bora botumuz bakım altındadır.')
  
  return message.channel.send(bakim)
 } 

 */ /*if (cmd) {
  let botbakım = db.fetch(`dreamcode.botbakim${message.author.id}`)
  let bakımyüzde = db.fetch(`bakimyüzde${message.author.id}`)
  let bakımsebep = db.fetch(`bakimsebep${message.author.id}`)
  let cfxtime = await db.fetch(`afk_süre${message.author.id}`);
  let cfxs = ms(Date.now() - cfxtime);
  //if(!ayarlar.sahip.includes(message.author.id)) {
  if(botbakım == 'aktif'){
  let bakim = new Discord.RichEmbed()
  .setTitle('Bora Bot Bakımda')
  .setColor('BLACK')
  .setDescription(`Tahmini bitiş: **${bakımyüzde}**\nBakım sebebi: **${bakımsebep}**`)
  .setFooter('Eğer uzun süre açılmazsa yapımcıma başvurunuz!') 
  return message.channel.send(bakim)
  }*/ 
  //}
    
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  };