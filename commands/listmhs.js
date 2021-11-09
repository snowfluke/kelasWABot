const students = require("../data/students.json");
const {
	classCode,
	classSemester,
	classCategory,
} = require("../config/settings.json");
const studentsName = students.map((el) => el.fullName);

module.exports = {
	name: "listmhs",
	syntax: "listmhs",
	description: "Lihat daftar mahasiswa",
	async execute(bot, message) {
		try {
			let listmhsText = `*List mahasiswa ${
				classCode + classSemester + classCategory
			}*\n\n`;

			for (let index in studentsName) {
				listmhsText += `${parseInt(index) + 1}. ${
					studentsName[index]
				}\n`;
			}

			listmhsText += `\n_Powered by KelasWA-Bot_`;

			bot.sendText(message.from, listmhsText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
