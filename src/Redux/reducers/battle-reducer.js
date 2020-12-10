import levelInfo from '../../Constants/levels/levelnfo';
import { initializeBot } from '../../Constants/helperFunctions';
import bots from '../../Constants/botAis/bots';

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
	battleLog: [
		// {type: 'battle-init'},
		{type: 'new-tick', number: 0},
		{type: 'determining-actions'},
		{type: 'testing-bot', name: 'RY66'},
		{type: 'test-fail', depth: 0, node: 1, content: 'NO EMEIES DETECTED'}
	],
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
					newBattleInfo.objectsToRender.push(initializeBot(userBot, 0, newBattleInfo.levelInfo.userBots[index].location, 'User'));
					newBattleInfo.rotatingTieBreak.push(newBattleInfo.rotatingTieBreak.length);
				})
				newBattleInfo.levelInfo.hostile.forEach((hostile)=>{
					newBattleInfo.objectsToRender.push(initializeBot(bots[hostile.name], 1, hostile.location, 'Bot'));
					newBattleInfo.rotatingTieBreak.push(newBattleInfo.rotatingTieBreak.length);
				})
				newBattleInfo.levelInfo.hostile2.length > 0 && newBattleInfo.levelInfo.hostile2.forEach((hostile)=>{
					newBattleInfo.objectsToRender.push(initializeBot(bots[hostile.name], 2, hostile.location, 'Bot'));
					newBattleInfo.rotatingTieBreak.push(newBattleInfo.rotatingTieBreak.length);
				})
				newBattleInfo.levelInfo.hostile3.length > 0 && newBattleInfo.levelInfo.hostile3.forEach((hostile)=>{
					newBattleInfo.objectsToRender.push(initializeBot(bots[hostile.name], 3, hostile.location, 'Bot'));
					newBattleInfo.rotatingTieBreak.push(newBattleInfo.rotatingTieBreak.length);
				})
				newBattleInfo.levelInfo.friendly.length > 0 && newBattleInfo.levelInfo.friendly.forEach((friendly)=>{
					newBattleInfo.objectsToRender.push(initializeBot(bots[friendly.name], 0, friendly.location, 'Bot'));
					newBattleInfo.rotatingTieBreak.push(newBattleInfo.rotatingTieBreak.length);
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