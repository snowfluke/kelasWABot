const { decryptMedia } = require("@open-wa/wa-automate");

module.exports = {
	name: "stiker",
	syntax: "stiker",
	description: "Konversi gambar ke stiker",
	async execute(bot, message) {
		try {
			if (message.type !== "image") return;

			const mimetype = message.mimetype;
			const data = await decryptMedia(message);

			const base64 = `data:${mimetype};base64,${data.toString("base64")}`;
			bot.sendImageAsSticker(message.from, base64);
		} catch (error) {
			console.log(error);
		}
	},
};
