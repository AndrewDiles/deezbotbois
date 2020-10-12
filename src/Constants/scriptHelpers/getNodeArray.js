function getNodeArray (script, viewing) {
	let result = script;
	// console.log('result before function', result)
	// console.log('viewing before function', viewing)
	viewing.forEach((entry, entryIndex)=>{
		// console.log({entry})
		if (entryIndex !== viewing.length-1) {
			switch(entry.type) {
				case 'head' : {
					result=result[entry.index];
					break;
				}
				case 'condition' : {
					result=result[entry.index];
					break;
				}
				default: {
				}
			}
		}
	})
	// console.log('this is the results from the getNode function call', result)
	return result
}

export default getNodeArray