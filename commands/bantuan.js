const { botPrefix, campusName } = require("../config/settings.json");
const fs = require("fs");
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

module.exports = {
	name: "bantuan",
	syntax: "bantuan",
	description: "Lihat bantuan",
	async execute(bot, message) {
		try {
			let helpText = `*Bantuan*
Prefiks: ${botPrefix}
Sintaks: <prefiks><perintah> <argumen>
Argumen: (opsional?) | (wajib*) | (banyak,argumen)
Contoh: ${botPrefix}bantuan

*Perintah*
`;

			let index = 1;
			for (let com of commandFiles) {
				const command = require(`./${com}`);
				helpText += `${index}. ${command.syntax} | _${command.description}_\n`;
				index++;
			}

			helpText += `
*GitHub*
https://github.com/snowfluke/kelasWABot

*Author KelasWA-Bot*
Awal Ariansyah

*Traktir saya kopi*
_0x39Bce682DBFe79a0b940c8E833aaf2ab08098816_

*${campusName}*`;
			let sender = message.isGroupMsg ? message.author : message.from;
			message.isGroupMsg &&
				bot.reply(
					message.from,
					`Bantuan telah dikirimkan ke pesan pribadi.\nPowered by KelasWA-Bot\n`,
					message.id
				);

			bot.sendText(sender, helpText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
