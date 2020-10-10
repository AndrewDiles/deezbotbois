function getNodeArray (script, viewing) {
	let result = script;
	viewing.forEach((entry, entryIndex)=>{
		if (entryIndex !== viewing.length-1) {
			switch(entry.type) {
				case 'condition' : {
					result=result[entry.index];
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