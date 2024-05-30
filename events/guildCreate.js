const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildCreate,
    execute: async (guild) => {
        let client = guild.client;
        const add = client.channels.cache.get("1240150233804181557");
        
        guild.fetchOwner().then(owner => {
            let ownerTag = owner ? owner.user.tag : "Bilinmiyor";
            let ownerID = owner ? owner.id : "Bilinmiyor";


            const embed = new EmbedBuilder()
                .setTitle(`Sunucuya Eklendim`)
                .setTimestamp()
                .setColor("#037bfc")
                .setThumbnail(guild.iconURL())
                .setDescription(`Sunucu İsmi: ${guild.name}\n Sunucu ID: ${guild.id} \n Kurucu: ${ownerTag} \n Kurucu ID: ${ownerID}, Üye sayısı: ${guild.memberCount}`);

            add.send({ embeds: [embed] });
        }).catch(console.error);
    }
};
