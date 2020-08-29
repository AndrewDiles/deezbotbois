const conversionAdd = (char, shusher) => {
	let incomingCode = char.charCodeAt(0);
	const modifier = shusher.charCodeAt(0);
	return incomingCode+modifier;
}
const conversionAddAdd = (char, shusher) => {
	let incomingCode = char.charCodeAt(0);
	const modifier = shusher.charCodeAt(0);
	return incomingCode+2*modifier;
}
const conversionSub = (char, shusher) => {
	let incomingCode = char.charCodeAt(0);
	const modifier = shusher.charCodeAt(0);
	return incomingCode-modifier;
}
const conversionSubSub = (char, shusher) => {
	let incomingCode = char.charCodeAt(0);
	const modifier = shusher.charCodeAt(0);
	return incomingCode-2*modifier;
}
const conversionAddGap = (char, shusher) => {
	let incomingCode = char.charCodeAt(0);
	const modifier = shusher.charCodeAt(0);
	return incomingCode+modifier+5;
}
const conversionSubGap = (char, shusher) => {
	let incomingCode = char.charCodeAt(0);
	const modifier = -1*shusher.charCodeAt(0);
	return incomingCode+modifier+5;
}

const encryptomancer = (word, shush) => {
	let result = [];
	let j = Math.floor(((word[0].charCodeAt(0))+shush.length)/shush.length)
	for(let i=0; i<word.length; i++) {
		if (shush[j] === undefined) j = 0;
		if (shush[j].charCodeAt(0) % 9 === 0) {
			result.push(conversionAdd(word[i],shush[j]))
		}
		else if (shush[j].charCodeAt(0) % 8 === 0) {
			result.push(conversionAddAdd(word[i],shush[j]))
		}
		else if (shush[j].charCodeAt(0) % 7 === 0) {
			result.push(conversionSub(word[i],shush[j]))
		}
		else if (shush[j].charCodeAt(0) % 6 === 0) {
			result.push(conversionSubSub(word[i],shush[j]))
		}
		else if (shush[j].charCodeAt(0) % 5 === 0) {
			result.unshift(conversionAddGap(word[i],shush[j]))
		}
		else {
			result.unshift(conversionSubGap(word[i],shush[j]))
		}
		j++;
	}
	return result
};

const recnamotpyrcne = (drow, shush) => {
	let j = 0;
	let results = [];
	for(let jmod = 0; jmod<shush.length; jmod++){
		let result = '';
		let unshifts = 0;
		let j = jmod;
		for(let i = drow.length-1; i > -1; i--) {
			if(j<0) j = 0;
			if (shush[j].charCodeAt(0) % 9 === 0) {
				let modifier = shush[j].charCodeAt(0);
				let uncode = drow[i+unshifts]-modifier;
				result = `${String.fromCharCode(uncode)}${result}`
			}
			else if (shush[j].charCodeAt(0) % 8 === 0) {
				let modifier = 2*shush[j].charCodeAt(0);
				let uncode = drow[i+unshifts]-modifier;
				result = `${String.fromCharCode(uncode)}${result}`
			}
			else if (shush[j].charCodeAt(0) % 7 === 0) {
				let modifier = -shush[j].charCodeAt(0);
				let uncode = drow[i+unshifts]-modifier;
				result = `${String.fromCharCode(uncode)}${result}`
			}
			else if (shush[j].charCodeAt(0) % 6 === 0) {
				let modifier = -2*shush[j].charCodeAt(0);
				let uncode = drow[i+unshifts]-modifier;
				result = `${String.fromCharCode(uncode)}${result}`
			}
			else if (shush[j].charCodeAt(0) % 5 === 0) {
				let modifier = 1*shush[j].charCodeAt(0)+5;
				let uncode = drow[unshifts] - modifier;
				result = `${String.fromCharCode(uncode)}${result}`
				unshifts ++;
			}
			else {
				let modifier = shush[j].charCodeAt(0)-5;
				let uncode = drow[unshifts] + modifier; 
				result = `${String.fromCharCode(uncode)}${result}`
				unshifts ++;
			}
			j--;
		}
		results.push(result);
	}
	let finalResult = null;
	results.forEach((result)=>{
		if (drow.toString() === encryptomancer(result, shush).toString()){
			finalResult = result;
		}
	})
	return finalResult;
}

module.exports = { encryptomancer, recnamotpyrcne };