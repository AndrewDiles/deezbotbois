function switchCommand (dispatch, battleInfo, completeCommand, playSFX, speed) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	// console.log('find instructions layout', battleInfo.commandsToExecute[0].command.instructions);

	function modifySwitch (change, currentSwitch, switchNumber) {
		let result = currentSwitch;
		if (switchNumber !== 5){
			switch (change) {
				case 'NONE' : {
					break;
				}
				case 'FLIP' : {
					result = !result;
					break;
				}
				case 'OFF' : {
					result = false;
					break;
				}
				case 'ON' : {
					result = true;
					break;
				}
			}
		} else {
			if (change === 'FLIP' || change === 'ON') {
				result = true;
			} else {
				result = false;
			}
		}
		return result
	}
	for (let i = 1; i <= 5 ; i ++) {
		executingBot.switches[i] = modifySwitch(battleInfo.commandsToExecute[0].command.instructions[i], executingBot.switches[i], i);
	}
	
	executingBot.stance = null;
	executingBot.scanDisplayResults = [];
	executingBot.scanHostileResults = [];
	executingBot.scanFriendResults = [];
	executingBot.scanWallResults = [];
	executingBot.scanCornerResults = [];
	executingBot.aimResults = [];
	executingBot.consecutiveAims = 0;
	executingBot.previousCommand = battleInfo.commandsToExecute[0].command;
	newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
	if (speed !== 0.1) {
		dispatch(playSFX('toggle'));
		setTimeout(()=>{dispatch(completeCommand(newBattleInfo));},speed*1000);
	} else {
		dispatch(completeCommand(newBattleInfo));
	}
	// dispatch(completeCommand(newBattleInfo));
	// return newBattleInfo
}
export default switchCommand