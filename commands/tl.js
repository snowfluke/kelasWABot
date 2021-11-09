const axios = require("axios").default;
const { libretranslateAPI } = require("../config/settings.json");

module.exports = {
	name: "tl",
	syntax: "tl <id/en?> <teks*>",
	description: "Terjemahkan teks ke en/id",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;

			args[0] !== "en" && args[0] !== "id" && args.unshift("id");

			let target = args[0];
			let source = target == "id" ? "en" : "id";
			let text =
				(source == "id"
					? "hasil terjemahan: "
					: "translated result: ") + args.join(" ").slice(2).trim();

			let res = await axios(libretranslateAPI.endpoint, {
				method: "POST",
				data: JSON.stringify({
					q: text,
					source: source,
					target: target,
				}),
				headers: { "Content-Type": "application/json" },
			});

			let raw = await res.data;
			let data = await raw.translatedText;

			let tlText = `[${source} -> ${target}]
${data.substring(0, 1).toUpperCase() + data.substring(1)}
                
_APIs by libretranslate_
_Powered by KelasWA-Bot_`;

			bot.reply(message.from, tlText, message.id);
		} catch (error) {
			console.log(error);
		}
	},
};
