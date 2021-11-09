const Calc = require("expression-calculator");
var calc = new Calc();

module.exports = {
	name: "hitung",
	syntax: "hitung <ekspresi*> <variabel1:nilai1,...?>",
	description: "Kalkulator perhitungan.",
	async execute(bot, message, args) {
		try {
			let footer = `\n_Powered by KelasWA-Bot_`;
			let documentation = `*Cara pakai*

Contoh:
- .hitung 5*1
- .hitung a*b/3+c a:1,b:5,c:10
- .hitung 0101&0001

Operator yang didukung:
Aritmatika: *, /, +, -, **, %
Bitwise: &, |, ^, ~

Hitung akar:
.hitung akar:100
${footer}`;

			if (args.length == 0)
				return bot.reply(message.from, documentation, message.id);
			let expression = args[0];
			let variable = args[1] ? args[1].split(",") : undefined;
			if (variable == undefined) {
				let sqrtCheck = expression.split(":");
				if (
					sqrtCheck[0].toLowerCase() == "akar" ||
					!isNaN(sqrtCheck[1])
				) {
					bot.reply(
						message.from,
						`${Math.sqrt(sqrtCheck[1])}\n${footer}`,
						message.id
					);
					return;
				}

				bot.reply(
					message.from,
					`${calc.compile(expression).calc()}\n${footer}`,
					message.id
				);
				return;
			}

			let variableMap = variable.map((el) => el.split(":"));
			let variableObj = Object.fromEntries(variableMap);
			bot.reply(
				message.from,
				`${calc.compile(expression).calc(variableObj)}\n${footer}`,
				message.id
			);
		} catch (error) {
			bot.reply(message.from, error.message, message.id);
		}
	},
};
