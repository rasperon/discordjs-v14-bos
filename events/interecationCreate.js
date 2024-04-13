const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`${interaction.commandName} ile eşleen komut bulunamadı.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Bu komut yürütülürken bir hata oluştu.!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Bu komut yürütülürken bir hata oluştu.!', ephemeral: true });
			}
		}
	},
};
