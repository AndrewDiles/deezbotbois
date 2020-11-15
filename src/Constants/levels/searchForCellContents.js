function testContents (testLocation, levelInfo) {
	//TODO: switch from forEachs, and use for loops and break; if contents are determined
	let contents = null;
	if (levelInfo.friendly.length > 0) {
		levelInfo.friendly.forEach((entry)=>{
			if (entry.location.col === testLocation.col && entry.location.row === testLocation.row) {
				contents = 'friendly';
			}
		})
	}
	if (contents) return contents;
	if (levelInfo.hostile.length > 0) {
		levelInfo.hostile.forEach((entry)=>{
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