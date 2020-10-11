function getNodeArray (script, viewing) {
	let result = script;
	console.log('result before function', result)
	viewing.forEach((entry, entryIndex)=>{
		if (entryIndex !== viewing.length-1) {
			switch(entry.type) {
				// case 'head' : {
				// 	result=result[entry.index];
				// 	break;
				// }
				case 'condition' : {
					result=result[entry.index];
					break;
				}
				default: {
				}
			}
		}
	})
	console.log('this is the results from the getNode function call', result)
	return result
}

export default getNodeArray