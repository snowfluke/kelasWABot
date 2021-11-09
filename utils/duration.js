module.exports = duration = (received, send) => {
	return Math.abs(parseInt(send / 1000) - received) / 1000;
};
