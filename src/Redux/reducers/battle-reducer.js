import levelInfo from '../../Constants/levels/levelnfo';
import { initializeUserBot } from '../../Constants/helperFunctions'; 

const initialState = {
	battleLaunched : false,
	userOptions :{
		animation : true,
		wait : true
	},
	challenge : null,
	levelInfo : {},
	objectsToRender : [],
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
	ticksSinceDamageTaken: 0,
	commandsToExecute: [],
	rotatingTieBreak: [],
	battleHasOutcome: false,
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
				action.userBots.forEach((userBot, index)=>{
					// function to add current stats goes here - current stats,
					newBattleInfo.objectsToRender.push(initializeUserBot(userBot, 1, newBattleInfo.levelInfo.userBots[index].location));
				})
				
				// requires: 
				// .levelNumber or .challenge which will have shape { start: x, finish: y}
				// .userBots
        return newBattleInfo
      }
      
      default:{
        return state;
      }
    }
	}