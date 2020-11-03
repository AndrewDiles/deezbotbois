function getNodeArray (script, viewing) {
	let result = script;
	// console.log('result before function', result)
	// console.log('viewing before function', viewing)
	viewing.forEach((entry, entryIndex)=>{
		// console.log({entry})
		if (entry.type !== 'head') {
			// console.log('INSIDE SWITCH');
			switch(entry.type) {
				case 'conditionTrue' : {
					// console.log('previous index:', viewing[entryIndex-1].index);
					// console.log(result[viewing[entryIndex-1].index]);
					// console.log(result[viewing[entryIndex-1].index].condition);
					// console.log(result[viewing[entryIndex-1].index].condition.conditionMet);
					result=result[viewing[entryIndex-1].index].condition.conditionMet;
					break;
				}
				case 'conditionFalse' : {
					// console.log('previous index:', viewing[entryIndex-1].index);
					result=result[viewing[entryIndex-1].index].condition.conditionUnMet;
					break;
				}
				default: {
				}
			}
		}
		// console.log({result})
	})
	// console.log('this is the results from the getNode function call', result)
	return result
}

export default getNodeArray