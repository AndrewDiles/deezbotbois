import commandDetails from '../commandDetails';
import getNextCommand from './getNextCommand';

function resolveDeterminingCommands (battleInfo) {
	let battleLogEntriesToAdd = [];
	let commandsToExecute = [];
	battleInfo.objectsToRender.forEach((bot, index)=>{
		const nextCommandResults = getNextCommand(battleInfo.objectsToRender, index, battleInfo.levelInfo);
		let initiative = (100000 * (50-commandDetails[nextCommandResults.command.name].speed)) + (1000 * (bot.attributes.Initiative)) + battleInfo.rotatingTieBreak.findIndex((value) => value === index);
		let newCommand = {
			botIndex: index,
			command: nextCommandResults.command,
			// commandSpeed: commandDetails[nextCommandResults.command.name].speed,
			// botInitiative: bot.attributes.Initiative,
			// tieBreaker: battleInfo.rotatingTieBreak.findIndex((value) => value === index),
			initiative: initiative
		}
		battleLogEntriesToAdd = [...battleLogEntriesToAdd, ...nextCommandResults.battleLogEntries];
		commandsToExecute.push(newCommand);
	})
	// dispatch(addNewBattleLogs(battleLogEntriesToAdd));
	commandsToExecute.sort(function(a, b){return b.initiative - a.initiative});
	return {battleLogEntriesToAdd:battleLogEntriesToAdd, commandsToExecute: commandsToExecute}
}
export default resolveDeterminingCommands