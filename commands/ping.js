const duration = require("../utils/duration");

module.exports = {
	name: "ping",
	syntax: "ping",
	description: "Cek koneksi bot",
	async execute(bot, message) {
		try {
			bot.reply(
				message.from,
				`Pong! Pingnya ${duration(message.t, Date.now())} detik`,
				message.id
			);
		} catch (error) {
			console.log(error);
		}
	},
};
