const lecturers = require("../data/lecturers.json");

module.exports = {
	name: "dosen",
	syntax: "dosen <nama*>",
	description: "Cari dosen",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;
			let keywords = args.join(" ");

			let results = lecturers.filter((el) =>
				el.fullName.toLowerCase().includes(keywords)
			);

			if (results.length == 0)
				return bot.reply(
					message.from,
					`Pencarian ${keywords} tidak ditemukan.\n_Powered by KelasWA-Bot_`,
					message.id
				);

			let dosenText = `*Menampilkan pencarian _${keywords}_*\n`;
			for (let lecturer of results) {
				dosenText += `\nNIDN/NIP/NIDK: ${lecturer.identityNumber}
Nama: ${lecturer.fullName} ${lecturer.title}
Whatsapp: ${lecturer.whatsapp}
Email: ${lecturer.email}\n`;
			}

			dosenText += `\n_Powered by KelasWA-Bot_`;
			bot.sendText(message.from, dosenText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
