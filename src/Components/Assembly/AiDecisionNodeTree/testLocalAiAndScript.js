function testLocalAiAndScript (local, global) {
	// console.log({global})
	// bail if arguements are not valid
	if (typeof local !== 'object' || local.length === 0 || typeof global !== 'object' || global.length === 0) {
		// console.log('bailing from testLocalAi...');
		// console.log({local},{global})
		return 'offPath'
	} else {
		// console.log('test has not bailed');
		function testDepthLevel (localLayer, globalLayer) {
			// console.log({localLayer},{globalLayer})
			if (globalLayer === undefined) {
				return false
			} else if (localLayer.type === globalLayer.type && localLayer.index === globalLayer.index) {
				return true
			} else return false
		}
		let result = 'onPath';
		local.forEach((localDepthLayer, index)=>{
			// console.log({localDepthLayer})
			if (result === 'onPath') {
				// console.log('inner test value is:',testDepthLevel(localDepthLayer, global[index]) )
				if (!global[index] || !testDepthLevel(localDepthLayer, global[index])) {
					result = 'offPath';
				}
			}
		})
		if (result === 'offPath') {
			return result;
		} else {
			if (local.length === global.length) {
				return 'active'
			} else {
				return result
			}
		}
	}
}
export default testLocalAiAndScript;