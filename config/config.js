module.exports = config = (start) => {
	const options = {
		sessionId: "KelasWA",
		authTimeout: 0,
		disableSpins: true,
		headless: true,
		cacheEnabled: false,
		killProcessOnBrowserClose: true,
		throwErrorOnTosBlock: false,
		chromiumArgs: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--aggressive-cache-discard",
			"--disable-cache",
			"--disable-application-cache",
			"--disable-offline-load-stale-cache",
			"--disk-cache-size=0",
		],
		skipUpdateCheck: true,
		restartOnCrash: start,
		qrTimeout: 0,
	};
	return options;
};
