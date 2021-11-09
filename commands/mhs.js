const students = require("../data/students.json");

module.exports = {
	name: "mhs",
	syntax: "mhs <nama/nim*>",
	description: "Cari mahasiswa",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;
			let keywords = args.join(" ");

			let results = students.filter(
				(el) =>
					el.fullName.toLowerCase().includes(keywords) ||
					el.nim == keywords
			);

			if (results.length == 0)
				return bot.reply(
					message.from,
					`Pencarian ${keywords} tidak ditemukan.\n_Powered by KelasWA-Bot_`,
					message.id
				);

			let mhsText = `*Menampilkan pencarian _${keywords}_*\n`;
			for (let student of results) {
				mhsText += `\nNIM: ${student.nim}
Nama: ${student.fullName}
Whatsapp: ${student.contact.whatsapp}
Email: ${student.contact.email}\n`;
			}

			mhsText += `\n_Powered by KelasWA-Bot_`;
			bot.sendText(message.from, mhsText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
