const schedules = require("../data/schedules.json");
const {
	classTeacher,
	classCode,
	classSemester,
	classCategory,
} = require("../config/settings.json");

module.exports = {
	name: "jadwal",
	syntax: "jadwal <hari?>",
	description: "Lihat jadwal",
	async execute(bot, message, args) {
		try {
			let schedule = schedules.filter((el) =>
				args.length === 0
					? true
					: el.day.toLowerCase() === args[0].toLowerCase()
			);

			let jadwalText = `*Jadwal perkuliahan ${
				classCode + classSemester + classCategory
			}*\n`;

			if (schedule.length == 0) {
				schedule = schedules;
				jadwalText += `Dosen akademik: ${classTeacher}\n`;
			}

			for (let day of schedule) {
				jadwalText += `\n*${day.day}*\n`;

				for (let meet of day.meet) {
					jadwalText += `- ${meet.name}\n🕔 ${meet.time[0]} - ${meet.time[1]}\n`;
				}
			}

			jadwalText += `\n_Powered by KelasWA-Bot_`;

			bot.sendText(message.from, jadwalText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
