const axios = require("axios").default;
const testYoutubeUrl = require("../utils/testYoutubeUrl");
const filesizeFormatting = require("../utils/filesizeFormatting");
const { youtubeDownloader } = require("../config/settings.json");

module.exports = {
	name: "yt",
	syntax: "yt <url*>",
	description: "Unduh video youtube",
	async execute(bot, message, args) {
		try {
			if (args.length == 0) return;
			let url = args[0];

			if (!testYoutubeUrl(url))
				return bot.reply(
					message.from,
					`Format URL tidak didukung\n\n_Powered by KelasWA-Bot_`,
					message.id
				);

			const res = await axios({
				method: "POST",
				url: youtubeDownloader.endpoint,
				headers: {
					Host: "api.fastfrom.com",
					"User-Agent":
						"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0",
					Accept: "application/json, text/plain, */*",
					"Accept-Language": "en-US,en;q=0.5",
					Referer: "https://fastfrom.com/",
					"Content-Type": "application/json;charset=utf-8",
					"Content-Length": "65",
					Origin: "https://fastfrom.com",
				},
				data: JSON.stringify({
					url: url,
					lang: "en",
				}),
			});
			if (res.status != 200)
				return bot.reply(message.from, res.statusText, message.id);
			let data = await res.data.meta;

			if (data == null || data == undefined)
				return bot.reply(message.from, `Terjadi kesalahan`, message.id);

			let ytText = `*${data.title}*
Author: ${data.author}
Duration: ${data.duration}

[MP4]`;

			for (let file of data.formats.mp4) {
				ytText += `\n- ${file.title}\nUkuran: ${filesizeFormatting(
					file.filesize
				)}\nLink: ${file.url}\n`;
			}
			ytText += `\n_API by fastfrom_\n_Powered by KelasWA-Bot_`;

			let sender = message.isGroupMsg ? message.author : message.from;

			message.isGroupMsg &&
				bot.reply(
					message.from,
					"Link telah dikirimkan lewat pesan pribadi.\n_Powered by KelasWA-Bot_",
					message.id
				);
			bot.sendText(sender, ytText);
		} catch (error) {
			console.log(error);
		}
	},
};
