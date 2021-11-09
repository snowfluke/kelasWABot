const axios = require("axios").default;
const { nomicsAPI } = require("../config/settings.json");
const priceFormatting = require("../utils/priceFormatting");

module.exports = {
	name: "harga",
	syntax: "harga <simbol*>",
	description: "Cek harga koin",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;

			let koin = args[0].toUpperCase();
			let params = `ids=${koin}&interval=1h&convert=IDR&per-page=1&page=1`;

			let res = await axios.get(
				nomicsAPI.endpoint + nomicsAPI.key + params
			);
			if (res.status != 200)
				return bot.reply(message.from, res.statusText);

			let data = await res.data[0];
			if (data == undefined)
				return bot.reply(
					message.from,
					`Koin dengan simbol ${koin} tidak ditemukan.\n\n_Powered by KelasWA-Bot_`,
					message.id
				);

			let hargaText = `Rp. ${priceFormatting(data?.price)}
_Powered by KelasWA-Bot && nomics_`;
			bot.reply(message.from, hargaText, message.id);
		} catch (error) {
			console.log(error.message);
		}
	},
};
