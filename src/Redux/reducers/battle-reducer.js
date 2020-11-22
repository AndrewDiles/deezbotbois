import levelInfo from '../../Constants/levels/levelnfo';
const initialState = {
	battleLaunched : false,
	userOptions :{
		animation : true,
		sound : 1,
		wait : true
	},
	challenge : null,
	levelInfo : {},
	botInfo : [],
	recordTracker: {
		totalDamageTaken: 0,
		totalDamageDealt: 0,
		dealtNonCollision: false,
		dealtNonMelee: false,
		dealtNonRanged: false,
		allyHasDied: false,
		hasMoved: false,
		minEnergyStored: 999,
	},
	tick: 0,
	initiativeOrder: [],
	initiativeIndex: 0,
	rotatingTieBreak: [],
	battleHasOutcome = false,
}
// upon initialization, set minEnergyStored to lowest of all user bots
// add additional values for currentStats
export default function battleInfo(
  state = initialState, action) {
    switch(action.type) {
      case 'INITIALIZE_BATTLE': {
				// const newBattleInfo = {...initialState};
				const newBattleInfo = JSON.parse(JSON.stringify(initialState));
				if (action.challenge) {
					newBattleInfo.challenge = action.challenge;
					newBattleInfo.levelInfo = levelInfo[action.challenge.start];
				} else {
					newBattleInfo.levelInfo = levelInfo[action.levelNumber];
				}
				newBattleInfo.userOptions.sound = action.userVolumeLevel;
				action.userBots.forEach((userBot)=>{
					const botToAdd = JSON.parse(JSON.stringify(userBot));

					// function to add current stats goes here
					newBattleInfo.botInfo.push(botToAdd);
					setBotSnapshot(JSON.parse(JSON.stringify(data.botBuilds)))
				})
				
				// requires: 
				// .levelNumber or .challenge which will have shape { start: x, finish: y}
				// .userBots
        return {
          ...state,
          currentUrl : action.url,
        }
      }
      
      default:{
        return state;
      }
    }
  }