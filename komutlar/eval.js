const Discord = require("discord.js");

exports.run = async (bot, message, args, color, prefix) =>  { 
        if (message.author.id !== '363047525097275392')  
    return;
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Eval Sonucu;')
        .setColor('RANDOM')
        .addField('📥 Giriş:', `\`\`\`js\n${codein}\`\`\``)
        .addField('📤 Çıkış', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['evalma', 'evsat'],
  permLevel: 0
};

exports.help = {
  name: 'eval',
  description: 'Kod denersiniz.',
  usage: 'eval <kod>'
};