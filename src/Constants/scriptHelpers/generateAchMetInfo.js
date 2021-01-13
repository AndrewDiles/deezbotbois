function generateAchMetInfo (userProgress, battleInfo) {
	const levelInfo = battleInfo.levelInfo;
	const currentStates = battleInfo.recordTracker;
	const userProgressOnThisLevel = userProgress[levelInfo.levelNumber];
	let result = {ach1: false, ach2: false, ach3: false};
	['ach1','ach2','ach3'].forEach((achNumber)=>{
		if (userProgressOnThisLevel && userProgressOnThisLevel[0][achNumber]) {
			result[achNumber] = true;
		} else {
			switch (levelInfo[achNumber].type) {
				case 'SPEED DEMON' : {
					result[achNumber] = levelInfo[achNumber].threshold >= battleInfo.tick;
					break;
				}
				case 'OVERKILL' : {
					result[achNumber] = levelInfo[achNumber].threshold <= currentStates.totalDamageDealt;
					break;
				}
				case 'BUSHIDO' : {
					result[achNumber] = !currentStates.dealtNonMelee;
					break;
				}
				case 'BEST FRIENDS' : {
					result[achNumber] = !currentStates.allyHasDied;
					break;
				}
				case 'LAST STAND' : {
					result[achNumber] = !currentStates.hasMoved;
					break;
				}
				case 'GUTS' : {
					result[achNumber] = !currentStates.dealtNonCollision;
					break;
				}
				case 'HOTSHOT' : {
					result[achNumber] = !currentStates.dealtNonRanged;
					break;
				}
				case 'GOLDEN STANDARD' : {
					result[achNumber] = currentStates.totalDamageTaken === 0;
					break;
				}
				case 'POWER HOG' : {
					result[achNumber] = currentStates.minEnergyStored >= levelInfo[achNumber].threshold;
					break;
				}
				default : {
					console.log('unknown achievement type in AchMet generation');
				}
			}
		}
	})


	return result
}
export default generateAchMetInfo;

// {generateAchMetInfo(userInfo.levelProgress, battleInfo.levelInfo, battleInfo.recordTracker)}