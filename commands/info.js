module.exports = {
	name: "info",
	syntax: "info",
	description: "Lihat info kuliah",
	async execute(bot, message) {
		try {
			let infoText = `*Informasi perkuliahan*

Link zoom perkuliahan:
- bit.ly/kuliah
- bit.ly/kuliah1

Link presensi:
- bit.ly/absensi

UTS Gasal:
- 29 Nov s.d 4 Des

UAS Gasal:
- 31 Jan s.d Selamanya

_Powered by KelasWA-Bot_`;

			bot.sendText(message.from, infoText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
