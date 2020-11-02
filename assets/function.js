function isAnagram (string1, string2) {
	let testArray = [];
	let canStillBeAnAnagram = true;
	for (let i = 0; i<string1.length-1; i++) {
		testArray.push(true);
	}
	string1Array = string1.split('');
	string2Array = string2.split('');
	string2Array.forEach((testChar)=>{
		let foundIndeces = [];
		string1Array.forEach((potentialCharMatch, index)=>{
			if (testChar === potentialCharMatch) {
				foundIndeces.push(index)
			}
		})
		if (foundIndeces.length === 0 ) {
			canStillBeAnAnagram = false;
		} else if (foundIndeces.length === 1) {
			if (testArray[foundIndeces[0]]) {
				canStillBeAnAnagram = false;
			} else {
				testArray[foundIndeces[0]] = true;
			}
		}else if (foundIndeces.length > 1 ) {
			let charHandled = false;
			foundIndeces.forEach((foundIndex)=>{
				if (!testArray[foundIndex]) {
					testArray[foundIndex] = true;
					charHandled = true;
				}
			})
			if (charHandled = false) {
				canStillBeAnAnagram = false;
			}
		}
	})
	if (!canStillBeAnAnagram){
		return false
	} else {
		let success = true;
		testArray.forEach((test)=>{
			if (!test) {
				success = false;
			}
		})
		return success
	}
}