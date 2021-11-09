const cron = require("cron");
const { classGroupId } = require("../config/settings.json");
const students = require("../data/students.json");
const keyFacts = require("../data/facts.json");

const reminderText = (subject) => {
	return `Jam perkuliahan *${subject}* akan segera dimulai! @everyone
	
Link zoom:
- bit.ly/perkuliahan
- bit.ly/perkuliahan1

Link presensi:
- bit.ly/LinkAbsensi

_Powered by KelasWA-Bot_`;
};

const getRandom = (arr) => Math.floor(Math.random() * arr.length);

module.exports = crons = (bot) => {
	// SENIN
	const SistemPendukungKeputusan = new cron.CronJob(
		"45 7 * * 1",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Belajar membuat bot")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);

	const Multimedia = new cron.CronJob(
		"30 9 * * 1",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Eksplorasi API whatsapp")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);

	// SELASA
	const DesainDanManajemenJaringan = new cron.CronJob(
		"45 7 * * 2",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Mengenal variable")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);

	// RABU
	const MetodeNumerik = new cron.CronJob(
		"45 7 * * 3",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Dasar-dasar JS")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);

	const PemrogramanBerorientasiObjek2 = new cron.CronJob(
		"30 9 * * 3",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Manajemen server discord")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);

	// KAMIS
	const MobileProgramming = new cron.CronJob(
		"45 7 * * 4",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Mengenal Pepe si Kodok")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);

	const KonsepDataMining = new cron.CronJob(
		"30 9 * * 4",
		() => {
			try {
				bot.sendTextWithMentions(
					classGroupId,
					reminderText("Konsep stalking")
				);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);

	const dailyFact = new cron.CronJob(
		"0 7 * * *",
		() => {
			try {
				const candidates = students.filter((el) => el.complete);
				const keys = Object.keys(keyFacts);
				const selectedCandidate = candidates[getRandom(candidates)];
				const selectedKey = keys[getRandom(keys)];
				const selectedFact = keyFacts[selectedKey];

				let dailyFactText = `*Fakta harian*
				
${selectedCandidate.fullName} ${selectedFact.pretext} *${selectedCandidate.data[selectedKey]}*. ${selectedFact.posttext}.

_Data diambil dari Laptop si Unyil, 14 Agustus 1945_
_Powered by KelasWA-Bot_`;

				bot.sendText(classGroupId, dailyFactText);
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);
};
