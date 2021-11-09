module.exports = priceFormatting = (price) => {
	if (price == undefined) return "0";

	let splitted = price.split(".");
	splitted[0] = splitted[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	return splitted.join(",");
};
