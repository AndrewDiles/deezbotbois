function getNodeArray (script, viewing) {
	let result = script;
	viewing.forEach((entry, entryIndex)=>{
		if (entry.type !== 'head') {
			switch(entry.type) {
				case 'conditionTrue' : {
					if (result[viewing[entryIndex-1].index] && result[viewing[entryIndex-1].index].condition) {
						result=result[viewing[entryIndex-1].index].condition.conditionMet;
					};
					break;
				}
				case 'conditionFalse' : {
					if (result[viewing[entryIndex-1].index] && result[viewing[entryIndex-1].index].condition) {
						result=result[viewing[entryIndex-1].index].condition.conditionUnMet;
					}
					break;
				}
				default: {
				}
			}
		}
	})
	return result
}

export default getNodeArray