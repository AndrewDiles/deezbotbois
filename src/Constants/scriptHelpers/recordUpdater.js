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
// let recordsToTrack = [...recordKeys];

function recordUpdater (battleInfo) {
	let newRecords = { ...battleInfo.recordTracker};

	if (battleInfo.tick === 0) {
		let recordsToTrack = [...recordKeys];
		let allyFound = false;
		battleInfo.objectsToRender.forEach((object)=>{
			if (object.type === 'User') {
				if (object.attributes.CurrentCapacitor < newRecords.minEnergyStored){
					newRecords.minEnergyStored = object.attributes.CurrentCapacitor;
				}
			} else if (object.team === 0) {
				allyFound = true;
			}
		})
		if (!allyFound) {
			recordsToTrack.splice(recordsToTrack.indexOf('allyHasDied'), 1);
		}
		newRecords.recordsToTrack = recordsToTrack;
	} else {
		let recordsToTrack = [...battleInfo.recordTracker.recordsToTrack];
		recordsToTrack.forEach((recordType, recordIndex)=>{
			switch(recordType) {
				case 'totalDamageTaken' : {
					if (battleInfo.recordTracker.recordChanges.length > 0){
						battleInfo.recordTracker.recordChanges.forEach((entry)=>{
							if (entry.name === 'damageTaken') {
								newRecords.totalDamageDealt += entry.value
							}
						})
					}
					break;
				}
				case 'totalDamageDealt' : {
					if (battleInfo.recordTracker.recordChanges.length > 0){
						battleInfo.recordTracker.recordChanges.forEach((entry)=>{
							if (entry.name === 'damageDealt') {
								newRecords.totalDamageDealt += entry.value
							}
						})
					}
					break;
				}
				case 'minEnergyStored' : {
					battleInfo.objectsToRender.forEach((object)=>{
						if (object.type === 'User' && object.attributes.CurrentCapacitor < newRecords.minEnergyStored) {
							newRecords.minEnergyStored = object.attributes.CurrentCapacitor;
							if (object.attributes.CurrentCapacitor === 0) {
								recordsToTrack.splice(recordIndex, 1);
							}
						}
					})
					break;
				}
				case 'dealtNonCollision' : {
					if (battleInfo.recordTracker.recordChanges.length > 0){
						battleInfo.recordTracker.recordChanges.forEach((entry)=>{
							if (entry.name === 'damageDealt' && !entry.superTypes.includes('Collision')) {
								newRecords.dealtNonCollision = true;
								recordsToTrack.splice(recordIndex, 1);
							}
						})
					}
					break;
				}
				case 'dealtNonMelee' : {
					if (battleInfo.recordTracker.recordChanges.length > 0){
						battleInfo.recordTracker.recordChanges.forEach((entry)=>{
							if (entry.name === 'damageDealt' && !entry.superTypes.includes('Melee')) {
								newRecords.dealtNonMelee = true;
								recordsToTrack.splice(recordIndex, 1);
							}
						})
					}
					break;
				}
				case 'dealtNonRanged' : {
					if (battleInfo.recordTracker.recordChanges.length > 0){
						battleInfo.recordTracker.recordChanges.forEach((entry)=>{
							if (entry.name === 'damageDealt' && !entry.superTypes.includes('Ranged')) {
								newRecords.dealtNonRanged = true;
								recordsToTrack.splice(recordIndex, 1);
							}
						})
					}
					break;
				}
				case 'allyHasDied' : {
					if (battleInfo.recordTracker.recordChanges.length > 0){
						battleInfo.recordTracker.recordChanges.forEach((entry)=>{
							if (entry.name === 'allyDied') {
								newRecords.allyHasDied = true;
								recordsToTrack.splice(recordIndex, 1);
							}
						})
					}
					break;
				}
				case 'hasMoved' : {
					if (battleInfo.recordTracker.recordChanges.length > 0){
						battleInfo.recordTracker.recordChanges.forEach((entry)=>{
							if (entry.name === 'userBotMoved') {
								newRecords.hasMoved = true;
								recordsToTrack.splice(recordIndex, 1);
							}
						})
					}
					break;
				}
			}
		})
		newRecords.recordsToTrack = recordsToTrack;
	}
	newRecords.recordChanges = [];
	// console.log({newRecords});
	return newRecords;
}

export default recordUpdater