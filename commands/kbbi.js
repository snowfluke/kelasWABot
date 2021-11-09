const axios = require("axios").default;
const { kbbi } = require("../config/settings.json");

module.exports = {
	name: "kbbi",
	syntax: "kbbi <kata*>",
	description: "Mencari kata di KBBI",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;
			let word = args[0];
			let res = await axios({
				method: "GET",
				url: `${kbbi.endpoint}?format=json&phrase=${word}`,
			});

			let data = res.data.kateglo;
			if (data == null || data == undefined) return;

			let kbbiText = `*[${word}]* ${data.ref_source_name}\n`;
			let words = data.definition;

			for (let def of words) {
				kbbiText += `\n*${def.def_num}. ${def.phrase}*\n${
					def.def_text
				}\ncth: ${
					def.sample
						? def.sample.replace(/--/g, `*_${def.phrase}_*`)
						: "_tidak ada_"
				}\n`;
			}

			kbbiText += `\n_Powered by KelasWA-Bot && Kateglo_`;
			bot.reply(message.from, kbbiText, message.id);
		} catch (error) {
			console.log(error);
		}
	},
};
