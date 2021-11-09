const axios = require("axios").default;
const { nomicsAPI } = require("../config/settings.json");
const priceFormatting = require("../utils/priceFormatting");

module.exports = {
	name: "koin",
	syntax: "koin <simbol*>",
	description: "Cek info koin",
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

			let koinText = `*${data?.name} #${
				data?.rank || "[Tidak tersedia]"
			}* ${data?.price_timestamp}
            
Simbol: ${data?.symbol}
Harga: Rp. ${priceFormatting(data?.price)}
Suplai maksimal:  ${priceFormatting(data?.max_supply)}
Sirkulasi: ${priceFormatting(data?.circulating_supply)}
Kapital pasar: Rp. ${priceFormatting(data?.market_cap)}
ATH: Rp. ${priceFormatting(data?.high)}

*Perubahan 1 jam terakhir*
Harga:
- Rp. *${priceFormatting(data["1h"]?.price_change)} (${
				data["1h"]?.price_change_pct || "0"
			}%)*
Kapital pasar: 
- Rp. *${priceFormatting(data["1h"]?.market_cap_change)} (${
				data["1h"]?.market_cap_change_pct || "0"
			}%)*

_Data by nomics_
_Powered by KelasWA-Bot_
`;

			bot.sendText(message.from, koinText);
		} catch (error) {
			console.log(error.message);
		}
	},
};
