import getNodeArray from './getNodeArray';
const waitCommand = {name: 'waitCommand', instructions: {}};

function getNextCommand (objectsToRender, indexInQuestion) {
	const botData = objectsToRender[indexInQuestion];
	let result = null;
	let commandCandidate = null;
	// let nodeTestNumber = 1;  	// This is the 1+index of mapToTest
	// let depthTestLevel = 1;		// This is mapToTest.length
	const mapToTest = [{type: 'head', index: 0}]

	if (testIsDestroyed(botData)) return {name: 'noneBotIsDestroyed'}

	for (let i = 0; i < botData.script.length; i++) {
		if (result) break;
		const nodeBlockInQuestion = getNodeArray(botData.script, mapToTest);
		if (testNodeBlockIsEmpty(nodeBlockInQuestion)) {
			result = waitCommand;
		} else {
			
		}



		// what will function look like?
		// test if unit is alive,
		// if alive, proceed to other tests, else, set command to dead.

		// test if node/depth is a command
		// if command, test if legal and sufficient energy
		// let conditionResult = test(objectsToRender, indexInQuestion, depthTestLevel, nodeTestNumber)
		//  then if conditionResult is false, move to false branch.branch
		//  if conditionResult is true, move to true branch









	}
	
	
	return result
}

export default getNextCommand

function testIsDestroyed (botData) {
	return botData.CurrentDurability === 0 ? true : false
}
function testNodeBlockIsEmpty (nodeBlock) {
	return nodeBlock ? false : true
}
function testNodeIsCondition (nodeBlock) {
	return Object.keys(nodeBlock)[0] === 'condition' ? true : false
}