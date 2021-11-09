const { create, Client } = require("@open-wa/wa-automate");
const commandHandler = require("./commander/commandHandler");
const config = require("./config/config");
const { classGroupId } = require("./config/settings.json");
const crons = require("./utils/crons");
const getGroupId = require("./utils/getGroupId");

const start = async (bot = new Client()) => {
	bot.onStateChanged((state) => {
		console.log(state);
		if (state === "CONFLICT" || state === "UNLAUNCHED") bot.forceRefocus();
	});

	bot.onIncomingCall(async (callData) => {
		await bot.sendText(
			callData.peerJid,
			"Maaf sedang tidak bisa menerima panggilan.\n\n-ini adalah pesan otomatis (bot)"
		);
	});

	if (classGroupId.length == 0) {
		return getGroupId(bot);
	}

	bot.onMessage(async (message) => {
		bot.getAmountOfLoadedMessages().then((msg) => {
			if (msg >= 3000) {
				console.log("Clear cache messages");
				bot.cutMsgCache();
			}
		});
		commandHandler(bot, message);
	});

	try {
		crons(bot);
	} catch (error) {
		console.log(error);
	}
};

create(config(start))
	.then((bot) => start(bot))
	.catch((err) => console.log(err));
