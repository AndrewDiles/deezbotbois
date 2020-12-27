const recordKeys = [
	'totalDamageTaken',
	'totalDamageDealt',
	'minEnergyStored',
	'dealtNonCollision',
	'dealtNonMelee',
	'dealtNonRanged',
	'allyHasDied',
	'hasMoved',
];
let recordsToTrack = [...recordKeys];

function recordUpdater (battleInfo) {
	if (battleInfo.tick === 0) {
		recordsToTrack = [...recordKeys];
		// check if an ally exists on this level
		// if they don't, remove ally has died from array
	}
	recordsToTrack.forEach((recordType, recordIndex)=>{
		switch(recordType) {
			case 'totalDamageTaken' : {
				// if damage taken, add it to this number
			}
			case 'totalDamageDealt' : {
				// if damage dealt, add it to this number
			}
			case 'totalDamageTaken' : {
				// if damageTaken, add it to this number
			}
			case 'minEnergyStored' : {
				// if currentCap is less that, replace value
			}
			case 'dealtNonCollision' : {
				// checks damage dealts and verifies types.
				// if any are not collision, set to true, and remove from array
			}
			case 'dealtNonMelee' : {
			
			}
			case 'dealtNonRanged' : {
			
			}
			case 'allyHasDied' : {
			// check to make sure no ally has fallen to 0 durability
			// if at least one has, set to true and remove from array
			}
			case 'hasMoved' : {
			// verify that the starting location of each userBot is the same as their current.
			// if they are not set this to true and remove this from the array
			}
		}
	})
}