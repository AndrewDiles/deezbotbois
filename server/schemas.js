let yup = require('yup');

yup.setLocale({
  mixed: {
    default: 'Invalid entry',
	},
	array: {
    default: `Invalid array`,
  },
  number: {
    default: `Invalid number`,
	},
	object: {
    default: `Invalid object`,
	},
	string: {
    default: `Invalid string`,
	},
	boolean: {
		default: `Invalid boolean`,
	}
});

const userInfoSchema = yup.object().shape({
	email: yup.string(),
	handle: yup.string(),
	navLocationPreference: yup.string(),
	cellSizePreference: yup.number(),
	musicPreference: yup.boolean(),
	sfxPreference: yup.boolean(),
	imageUrl: yup.string(),
	googleImageUrl: yup.string(),
	colorTheme: yup.object(),
	availableBots: yup.array(),
	availableArms: yup.array(),
	availableAcc: yup.array(),
	availableBotColors: yup.object(),
	botBuilds: yup.array(),
	battleBits: yup.number(),
	levelProgress: yup.array(),
	challengeProgress: yup.array(),
	tournamentHistory: yup.array(),
	lastLogInBitsReceived: yup.number()
});
module.exports = userInfoSchema;