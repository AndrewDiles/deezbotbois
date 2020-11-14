function testContents (testLocation, levelInfo) {
	console.log({testLocation})
	let contents = null;
	if (levelInfo.friendlies.length > 0) {
		levelInfo.friendlies.forEach((entry)=>{
			if (entry.location.col === testLocation.col && entry.location.row === testLocation.row) {
				contents = 'friendly';
			}
		})
	}
	if (contents) return contents;
	if (levelInfo.hostiles.length > 0) {
		levelInfo.hostiles.forEach((entry)=>{
			if (entry.location.col === testLocation.col && entry.location.row === testLocation.row) {
				contents =  'hostile';
			}
		})
	}
	if (contents) return contents;
	if (levelInfo.userBots.length > 0) {
		levelInfo.userBots.forEach((entry, index)=>{
			if (entry.location.col === testLocation.col && entry.location.row === testLocation.row) {
				contents =  'userBot';
			}
		})
	}
	return contents
}
export default testContents