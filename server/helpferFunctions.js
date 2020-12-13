const generateNewUser = (email, name, navLocation, cellSize, imageUrl, googleImageUrl) => {
	let result = {
		email : email,
		handle : name,
		navLocationPreference : navLocation,
		cellSizePreference : cellSize,
		musicPreference: true,
		sfxPreference: true,
		imageUrl : imageUrl,
		googleImageUrl : googleImageUrl,
		colorTheme : {
			primary: 'white',
			secondary: 'white',
			selected: 'rgba(170, 170, 170, 0.45)',
			notSelected: 'rgba(255,255,255,0.3)',
			hovered: 'silver',
			textColor : 'rgba(0, 0, 0, 0.54)',
		},
		availableSchemes: [
			'vanilla',
			'dark'
		],
		availableBots : ['BotBoxey'],
		availableArms : ["Gun1", "Sword1"],
		availableAcc : ["thickPaint"],
		availableBotColors : {
			primary: ['lime', 'khaki'],
			secondary: ['turquoise','tomato'],
			trim: ['green','darkkhaki'],
			extensions: ['silver','steelblue'],
			rollers: ['black','orchid'],
			eyes: ['orange', 'dodgerblue'],
			armTrim: ['steelblue', 'darkmagenta'],
			armPrimary: ['silver', 'pink'],
			armSecondary: ['deepskyblue', 'firebrick']
		},
		botBuilds : [],
		battleBits: 0,
		levelProgress : [],
		challengeProgress : [],
		tournamentHistory : [],
		lastLogInBitsReceived: 0
	}
	return result
}
module.exports = { generateNewUser };