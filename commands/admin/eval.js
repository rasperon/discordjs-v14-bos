const { SlashCommandBuilder, EmbedBuilder, Options } = require('discord.js');
const { execute } = require('../../events/ready');
const config = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('JavaScript kodunu çalıştırır(Geliştiricime özel)')
    .addStringOption(option => 
        option.setName('kod')
        .setDescription('Çalıştırılacak kod')
        .setRequired(true)),
        async execute (interaction) {
            async function sendMessage (message) {
                const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription(message)
                .setFooter({ text: 'Rasperon 💖', iconURL: 'https://media.discordapp.net/attachments/1207570564944887859/1228605968774987817/Dark_anime.jpg?ex=662ca779&is=661a3279&hm=b80c5659c42fb4050e8a7290434f097b37c651b67bb3a8eb002353cc5a2f4e83&=&format=webp&width=610&height=610' });
                await interaction.reply({ embeds: [embed], ephmeral: true})
            }

            if (interaction.member.id !== config.ownerID ) 
            return await sendMessage(`⚠ Bu komut Rasperon'a özeldir ve üzgünüm, hiç kimse Rasperon olamaz.`);

            const  { options } = interaction;
            var code = options.getString('kod');
            var output;

            try{
                output = await eval(code)
            } catch (error) {
                output = error.toString();
            }
            var replyString = `**Input:**\n\`\`\`js\n${code}\n\`\`\`\n\n**Output:**\n\`\`\`js\n${output}\n\`\`\``
            if (interaction.replied){
                const embed = new EmbedBuilder()
               .setColor("Red")
               .setDescription(replyString)
               .setFooter({ text: 'Rasperon 💖', iconURL: 'https://media.discordapp.net/attachments/1207570564944887859/1228605968774987817/Dark_anime.jpg?ex=662ca779&is=661a3279&hm=b80c5659c42fb4050e8a7290434f097b37c651b67bb3a8eb002353cc5a2f4e83&=&format=webp&width=610&height=610' });
               await interaction.editReply({ content: ``, embeds: [embed], ephmeral: true});
            } else{
                await sendMessage(replyString);
            }
        }
}
