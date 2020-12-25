import levelInfo from '../../Constants/levels/levelnfo';
import { initializeBot } from '../../Constants/helperFunctions';
import bots from '../../Constants/botAis/bots';

const initialState = {
	battleLaunched : false,
	status: 'AWAITING_USER_INPUT',
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
		{type: 'battle-init'},
		// {type: 'newTick', number: 0},
		// {type: 'phaseChange'},
		// {type: 'testing-bot', name: 'RY66'},
		// {type: 'test-fail', depth: 0, node: 1, content: 'NO ENEMIES DETECTED'}
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
      case 'LAUNCH_BATTLE': {
				return {
					...state,
					battleLaunched: true,
					status: 'FIRST_TICK',
					battleLog: [...state.battleLog, {type: 'newTick', number: state.tick+1}]
				}
			}
			case 'FIRST_TICK': {
				return {
					...state,
					tick: state.tick++,
					status: 'DETERMINING_COMMANDS',
					battleLog: [...state.battleLog, {type: 'phaseChange', content: '-- DETERMINING ACTIONS --'}]
					// battleLog: newBattleLog
				}
			}
			case 'NEXT_TICK': {
				return {
					...state,
					tick: state.tick++,
					status: 'NEW_TICK'
				}
			}
			case 'DETERMINE_COMMANDS': {
				return {
					...state,
					status: 'DETERMINING_COMMANDS'
				}
			}
			case 'COMMANDS_DETERMINED': {
				return {
					...state,
					battleLog: [...state.battleLog, ...action.newLogEntries],
					commandsToExecute: action.commandsToExecute,
					status: 'EXECUTING_COMMANDS'
				}
			}
			case 'ADD_NEW_BATTLE_LOGS': {
				return {
					...state,
					battleLog: [...state.battleLog, ...action.newLogEntries]
				}
			}
			case 'END_OF_TICK_CLEANUP': {
				// this needs to be written
				return {
					...state,
					status: 'TICK_COMPLETE',
				}
			}
			case 'AWAIT_USER_INPUT': {
				return {
					...state,
					status: 'AWAITING_USER_INPUT',
				}
			}
      default:{
        return state;
      }
    }
	}