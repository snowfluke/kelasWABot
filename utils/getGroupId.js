const { classGroupName } = require("../config/settings.json");

module.exports = getGroupId = async (bot) => {
	console.log("-----------------------------------------------");
	let groups = await bot.getAllGroups();
	if (groups.length == 0)
		return console.log(`- The number doesn't have any groups associated!`);

	let group = groups.filter(
		(el) =>
			el.formattedTitle == classGroupName ||
			el.contact.name == classGroupName
	);

	if (group.length == 0)
		return console.log(`- No group found with the name: ${classGroupName}`);

	console.log(
		`- Copy this id into classGroupId in config/settings.json: ${group[0].id}`
	);
	console.log("-----------------------------------------------");
};
