const students = require("../data/students.json");

module.exports = {
	name: "buatnama",
	syntax: "buatnama",
	description: "Buat nama acak",
	async execute(bot, message) {
		try {
			const firstName = students.map((el) => el.firstName);
			const midName = students.map((el) => el.middleName);

			const lastName = students.map((el) => el.lastName);
			const name =
				firstName[Math.ceil(Math.random() * firstName.length - 1)] +
				" " +
				midName[Math.ceil(Math.random() * midName.length - 1)] +
				" " +
				lastName[Math.ceil(Math.random() * lastName.length - 1)];

			let buatnamaText = `Kamu akan terlahir kembali dengan nama: 
*${name.trim()}*
            
_Powered by KelasWA-Bot_`;

			bot.reply(message.from, buatnamaText, message.id);
		} catch (error) {
			console.log(error.message);
		}
	},
};
