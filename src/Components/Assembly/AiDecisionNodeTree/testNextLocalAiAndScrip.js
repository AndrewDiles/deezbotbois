import testLocalAiAndScript from './testLocalAiAndScript';

function testNextLocalAiAndScript (local, global, type, currentActive) {
	// fast bail is current Active known and isn't onPath
	if (currentActive && currentActive !== 'onPath') {
		// console.log("bailing, local not onPath, so children can't be on path");
	}
	// bail if arguements are not valid - test purposes
	// if (typeof local !== 'object' || local.length === 0 || typeof global !== 'object' || global.length === 0) {
	// 	console.log('bailing, local or global not properly set')
	// 	return 'offPath'
	// } else 
	if (!(type === 'conditionTrue' || type === 'conditionFalse' )) {
		console.log('bailing, type not properly set')
	}

	let currentResult = testLocalAiAndScript(local,global);
	if (currentResult === 'active' || currentResult === 'offPath') {
		return 'offPath'
	}
	let localDepthLevel = local.length;
	if (global.length < localDepthLevel) {
		return 'offPath'
	}
	if (global[localDepthLevel].type === type) return 'onPath'
	else return 'offPath'
}
export default testNextLocalAiAndScript;