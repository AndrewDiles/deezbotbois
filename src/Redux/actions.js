// SFX ACTIONS
// request sfx:
export const playSFX = (sfxName) => ({
	type: 'PLAY_SFX',
	sfxName: sfxName
});
// remove last sfx played
export const removeSFX = () => ({
	type: 'REMOVE_SFX',
})
// reset sfx requests:
// export const resetSFX = () => ({
// 	type: 'RESET_SFX',
// });

// BATTLE ACTIONS
// setup the BattleInfo for initial display based on levelInfo and bots being sent in
export const initializeBattle = (challenge, levelNumber, userBots, ) => ({
	type: 'INITIALIZE_BATTLE',
	challenge: challenge,
	levelNumber: levelNumber,
	userBots: userBots,
})
// commence the battle
export const launchBattle = (newRecords) => ({
	type: 'LAUNCH_BATTLE',
	newRecords: newRecords
})
// process the first tick
export const firstTick = () => ({
	type: 'FIRST_TICK',
})
// process the next tick
export const nextTick = () => ({
	type: 'NEXT_TICK'
})
// run through bot ais to find their commands
export const determineCommands = () => ({
	type: 'DETERMINE_COMMANDS'
})
// begins execution of commands
export const commandsDetermined = (commandsToExecute, newLogEntries) => ({
	type: 'COMMANDS_DETERMINED',
	commandsToExecute, commandsToExecute,
	newLogEntries: newLogEntries,
})
// signals to Execution.js that it needs to run an execution
export const callingExecution = () => ({
	type: 'CALLING_EXECUTION'
})
// halts progress until last execution is complete
export const executionInProgress = () => ({
	type: 'EXECUTION_IN_PROGRESS'
})
// pops commands to execute and resets status
export const executionComplete = () => ({
	type: 'EXECUTION_COMPLETE'
})
// resets status to commence next execution
export const nextExecution = () => ({
	type: 'NEXT_EXECUTION'
})
// begins clean up
export const executionsComplete = () => ({
	type: 'EXECUTIONS_COMPLETE'
})
// tick is complete
export const endOfCleanUp = (newRecords) => ({
	type: 'END_OF_CLEANUP',
	newRecords: newRecords
})
// if ticks are not set to auto-fire, wait on user
export const awaitUserInput = () => ({
	type: 'AWAIT_USER_INPUT'
})
// manually adds new Battle Logs - this may end up being obsolete
export const addNewBattleLogs = (newLogEntries) => ({
	type: 'ADD_NEW_BATTLE_LOGS',
	newLogEntries: newLogEntries,
})
// replace BattleInfo - used to save multiple action calls
export const completeCommand = (newBattleInfo) => ({
	type: 'COMPLETE_COMMAND',
	newBattleInfo: newBattleInfo,
})

// SETTINGS ACTIONS
// setting url:
export const updateUrl = (url) => ({
  type: 'URL_UPDATE',
  url: url
});
// setting nav bar location:
export const setNavLocation = (navLocation) => ({
  type: 'SET_NAV_LOCATION',
  navLocation: navLocation
});
// setting music:
export const setMusic = (music) => ({
	type: 'SET_MUSIC',
	music: music
});
// setting sfx:
export const setSfx = (sfx) => ({
	type: 'SET_SFX',
	sfx: sfx
});
// setting execution speed:
export const setExecutionSpeed = (speed) => ({
	type: 'SET_EXECUTION_SPEED',
	speed: speed
});
// toggling auto tick fire offs:
export const toggleAutoTick = () => ({
	type: 'TOGGLE_AUTO_TICK',
});
// setting cell size:
export const setCellSize = (size) => ({
  type: 'SET_CELL_SIZE',
  size: size
});
// settings color testing scheme for settings
export const setColorTesting = (colors) => ({
	type: 'SET_COLORS_TESTING',
	colors: colors
})
// settings border disabled for BattleGrid
export const toggleBorder = () => ({
	type: 'TOGGLE_BORDER'
})
// retruns color testing scheme to null after log out
export const resetColorTesting = () => ({
	type: 'SET_COLORS_TESTING_DEFAULT',
})
// activating user tab in nav bar:
export const activateProfileTab = () => ({
  type: 'ACTIVATE_PROFILE_TAB',
});
// deactivating user tab in nav bar:
export const deactivateProfileTab = () => ({
  type: 'DEACTIVATE_PROFILE_TAB',
});
// hovering over user tab in nav bar:
export const hoverProfileTab = () => ({
  type: 'HOVER_PROFILE_TAB',
});
// communicating with server:
export const communicating = () => ({
  type: 'BEGIN_COMMUNICATING_WITH_SERVER',
});
// server communications successful:
export const communicationsSuccessful = () => ({
  type: 'COMMUNICATIONS_WITH_SERVER_SUCCESSFUL',
});
// server communications failed:
export const communicationsFailed = (error) => ({
  type: 'COMMUNICATIONS_WITH_SERVER_FAILURE',
  error: error
});

// USER ACTIONS
// receiving user info from server:
export const receiveUserInfo = (userInfo) => ({
  type: 'RECEIVE_USER_INFO',
  userInfo: userInfo
});
export const logOut = () => ({
	type: 'LOG_OUT'
});
// update user's nav location preference:
export const updateNavPref = (navLocation) => ({
  type: 'UPDATE_NAV_LOCATION_PREFERENCE',
  navLocation: navLocation
});

// update user's music preference:
export const updateMusicPref = (musicPreference) => ({
	type: 'UPDATE_MUSIC_PREFERENCE',
	musicPreference: musicPreference
})
// update user's sfx preference:
export const updateSfxPref = (sfxPreference) => ({
	type: 'UPDATE_SFX_PREFERENCE',
	sfxPreference: sfxPreference
})
export const increaseBitCount = (bitIncrease, currentTime) => ({
  type: 'INCREASE_BIT_COUNT',
	bitIncrease: bitIncrease,
	currentTime: currentTime,
});
export const receiveBotInfo = (botInfo) => ({
	type: 'RECEIVE_BOT_INFO',
	botInfo: botInfo
})
export const changeBotColors = (index, botColors) => ({
	type: 'CHANGE_BOT_COLORS',
	index: index,
	botColors: botColors
})
export const changeBotName = (index, botName) => ({
	type: 'CHANGE_BOT_NAME',
	index: index,
	botName: botName
})
export const changeBotModel = (index, botModel, maxArms, maxAccs) => ({
	type: 'CHANGE_BOT_MODEL',
	index: index,
	botModel: botModel,
	maxArms : maxArms,
	maxAccs : maxAccs
})
export const changeBotColorX = (index, colorPosition, color) => ({
	type: 'CHANGE_BOT_COLOR_X',
	index: index,
	colorPosition: colorPosition,
	color: color
})
export const equipItem = (index, slotKey, name) => ({
	type: 'EQUIP_ITEM',
	index: index,
	slotKey: slotKey,
	name: name
})
export const unequipItem = (index, slotKey, equipmentName) => ({
	type: 'UNEQUIP_ITEM',
	index: index,
	slotKey: slotKey,
	equipmentName: equipmentName
})
export const resetTechTree = (index) => ({
	type: 'RESET_TECH_TREE',
	index: index
})
export const addTech = (index, techIndex) => ({
	type: 'ADD_TECH',
	index: index,
	techIndex: techIndex
})
export const removeTechs = (index, techIndexArray) => ({
	type: 'REMOVE_TECHS',
	index: index,
	techIndexArray: techIndexArray
})
export const replaceUserInfo = (newUserInfo) => ({
	type: 'REPLACE_USER_INFO',
	newUserInfo: newUserInfo,
});
export const replaceScript = (index, newScript) => ({
	type: 'REPLACE_SCRIPT',
	index: index,
	newScript: newScript,
});
export const replaceAttributes = (index, newAttributes) => ({
	type: 'REPLACE_ATTRIBUTES',
	index: index,
	newAttributes: newAttributes,
})