const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[UYARI] ${filePath} konumundaki komutta gerekli bir "data" veya "execute" özelliği eksik.`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`[=] ${commands.length} (/) komutu bulundu.`);

		await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

		console.log(`[+] Başarıyla ${commands.length} (/) komut yüklendi.`);
	} catch (error) {
		console.error(error);
	}
})();
