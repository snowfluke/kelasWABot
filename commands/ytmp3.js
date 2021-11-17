const axios = require("axios").default;
const testYoutubeUrl = require("../utils/testYoutubeUrl");
const getYoutubeVideoId = require("../utils/getYoutubeVideoId");
const { youtubeMp3 } = require("../config/settings.json");
const cherio = require("cherio");

module.exports = {
	name: "ytmp3",
	syntax: "ytmp3 <url*>",
	description: "Unduh mp3 dari video youtube",
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

			let id = getYoutubeVideoId(url);
			if (!id)
				return bot.reply(
					message.from,
					`Format URL tidak didukung\n\n_Powered by KelasWA-Bot_`,
					message.id
				);

			const res = await axios({
				method: "GET",
				url: youtubeMp3.endpoint + id,
			});

			if (res.status != 200)
				return bot.reply(message.from, res.statusText, message.id);
			let data = await res.data;

			if (data == null || data == undefined)
				return bot.reply(message.from, `Terjadi kesalahan`, message.id);

			let $ = await cherio.load(data, null, false);
			let raw = $("a");
			let baseUrl = raw["0"].attribs.href.split("/320/");
			let mp3 = raw
				.text()
				.replace(/\n/g, "")
				.replace(/\s/g, "")
				.trim()
				.split("MP3")
				.filter((er) => er.length > 1)
				.map((el) => {
					return {
						resolution: el.split("kbps")[0],
						size: el.split("kbps")[1],
					};
				});

			let ytmp3Text = `*Youtube to Mp3*\n${url}\n`;

			for (let file of mp3) {
				ytmp3Text += `\n[${file.resolution}kbps]\nUkuran: ${
					file.size
				}\nLink: ${baseUrl.join('/'+file.resolution+'/')}\n`;
			}

			ytmp3Text += `\n_API by yt-download.org_\n_Powered by KelasWA-Bot_`;

			let sender = message.isGroupMsg ? message.author : message.from;
			message.isGroupMsg &&
				bot.reply(
					message.from,
					"Link telah dikirimkan lewat pesan pribadi.\n_Powered by KelasWA-Bot_",
					message.id
				);
			bot.sendText(sender, ytmp3Text);
		} catch (error) {
			console.log(error);
		}
	},
};
