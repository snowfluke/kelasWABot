const wiki = require("wikijs").default;
const { wikiAPI } = require("../config/settings.json");

module.exports = {
	name: "wiki",
	syntax: "wiki <katakunci*>",
	description: "Pencarian wikipedia",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;
			let keywords = args.join(" ");

			let res = await wiki({
				apiUrl: wikiAPI.endpoint,
			}).page(keywords);

			let data = await res.chain().summary().links().request();
			let wikiText = `*${data.title}*
            
${data.extract}

Tag: ${data.links.join(", ")}

_Data by Wikipedia_
_Powered by KelasWA-Bot_`;

			bot.sendText(message.from, wikiText);
		} catch (error) {
			bot.reply(
				message.from,
				"Artikel tidak ditemukan.\n_Powered by KelasWA-Bot_",
				message.id
			);
		}
	},
};
