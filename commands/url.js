const axios = require("axios").default;
const { cuttly } = require("../config/settings.json");

module.exports = {
	name: "url",
	syntax: "url <link*> <namaLink*>",
	description: "Memperpendek URL",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;
			let link = args.shift();
			let linkName = args.join("").replace(/\s/g, "");

			let params = `short=${link}&name=${linkName}`;
			const res = await axios({
				method: "POST",
				url: cuttly.endpoint + cuttly.key + params,
			});

			let data = await res.data;
			if (data.url.status != 7) {
				const reply = (text) =>
					bot.reply(
						message.from,
						text + "\n_Powered by KelasWA-Bot_",
						message.id
					);

				switch (data.url.status) {
					case 1:
						reply("Link sudah dipendekkan!");
						break;
					case 2:
						reply("Bukan link!");
						break;
					case 3:
						reply("Nama link sudah diambil!");
						break;
					case 4:
						reply("API Key tidak valid!");
						break;
					case 5:
						reply("Link mengandung karakter tidak valid!");
						break;
					case 6:
						reply("Link diblokir!");
						break;
					default:
						break;
				}

				return;
			}

			bot.reply(
				message.from,
				data.url.shortLink + `\n_Powered by KelasWA-Bot && Cuttly_`,
				message.id
			);
		} catch (error) {
			bot.reply(
				message.from,
				`Saya hanya bisa menangani 6 URL dalam satu menit. Harap coba lagi.\n_Powered by KelasWA-Bot && Cuttly_`,
				message.id
			);
		}
	},
};
