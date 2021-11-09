module.exports = filesizeFormatting = (size) => {
	return (parseInt(size) / (1024 * 1024)).toFixed(2) + "MB";
};
