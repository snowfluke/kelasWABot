const fs = require("fs");
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));
const { botPrefix, classGroupId } = require("../config/settings.json");

let commandMap = new Map();
for (let file of commandFiles) {
	const command = require(`../commands/${file}`);
	commandMap.set(command.name, command);
}

module.exports = commandHandler = async (bot, message) => {
	if (message.isGroupMsg && classGroupId !== message.from) return;
	if (message.type !== "chat" && message.type !== "image") return;

	let msg = message.type == "image" ? message.caption : message.body;
	if (!msg.startsWith(botPrefix)) return;

	const args = msg.slice(botPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!commandMap.has(commandName)) return;
	const command = commandMap.get(commandName);

	try {
		command.execute(bot, message, args);
	} catch (error) {
		console.error(error);
	}
};
