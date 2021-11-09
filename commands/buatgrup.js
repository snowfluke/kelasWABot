const students = require("../data/students.json");
const rng = require("../utils/rng");

module.exports = {
	name: "buatgrup",
	syntax: "buatgrup <n*>",
	description: "Buat kelompok sebanyak n anggota",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;
			let n = parseInt(args[0]);
			if (n <= 1 || n > students.length)
				return bot.reply(
					message.from,
					`Jumlah anggota minimal 2 dan maksimal ${students.length}`,
					message.id
				);

			let studentsName = students.map((el) => el.fullName);
			let result = new Array(Math.ceil(students.length / n))
				.fill()
				.map((_) => rng(studentsName).splice(0, n));

			let groupText = "*Hasil pembuatan kelompok*\n";

			for (let i in result) {
				i = parseInt(i);
				groupText += `\n*Kelompok ${i + 1}*\n`;

				for (let j in result[i]) {
					j = parseInt(j);

					j == 0
						? (groupText += `${j + 1}. ${result[i][j]} *(Ketua)*\n`)
						: (groupText += `${j + 1}. ${result[i][j]}\n`);
				}
			}

			groupText += `\n_Powered by KelasWA-Bot_`;
			bot.sendText(message.from, groupText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
