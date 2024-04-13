const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`[+] Bot hazır. ${client.user.tag} ismiyle aktifleşti.`);
	},
};
