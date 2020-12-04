function testContents (testLocation, levelInfo) {
	function sameCell (location1, location2) {
		if (location1.col === location2.col && location1.row === location2.row) return true;
		return false
	}
	if (levelInfo.friendly.length > 0) {
		for (let i = 0; i < levelInfo.friendly.length; i++) {
			if (sameCell(levelInfo.friendly[i].location, testLocation)) return 'friendly'
		}
	}
	if (levelInfo.hostile.length > 0) {
		for (let i = 0; i < levelInfo.hostile.length; i++) {
			if (sameCell(levelInfo.hostile[i].location, testLocation)) return 'hostile'
		}
	}
	if (levelInfo.userBots.length > 0) {
		for (let i = 0; i < levelInfo.userBots.length; i++) {
			if (sameCell(levelInfo.userBots[i].location, testLocation)) return 'userBot'
		}
	}
	return null
}
export default testContents