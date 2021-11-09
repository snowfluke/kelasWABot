module.exports = {
	name: "pilihkan",
	syntax: "pilihkan <n1,n2,..*>",
	description: "Menentukan pilihan",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;

			let choice = args
				.join(" ")
				.split(/,+/)
				.map((el) => el.trim());
			let myChoice = choice[Math.floor(Math.random() * choice.length)];

			let pilihkanText = `Saya lebih memilih *${myChoice}*.
			
_Powered by KelasWA-Bot_`;
			bot.reply(message.from, pilihkanText, message.id);
		} catch (error) {
			console.log(error.message);
		}
	},
};
