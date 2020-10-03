import baseBotAttributes, {
	comprehensiveStatsAdditive,
	comprehensiveStatsMultiplicative,
	comprehensiveStatsBool
} from './attributes';

import {accessoryStats} from '../Constants/equipment';

// function that calculates all bot attributes given a botBuild object
export function generateAttributes (botBuild) {
	const model = botBuild.model;
	const equipped = botBuild.equipment;

	

	let attributesReturn = {}

	function addKeyToAttributes (arrayOfKeys) {
		arrayOfKeys.forEach((key)=>{
			// console.log({key});
			// console.log(baseBotAttributes[model][key]);
			attributesReturn[key] = baseBotAttributes[model][key];
		})
	}
	addKeyToAttributes(comprehensiveStatsAdditive);
	addKeyToAttributes(comprehensiveStatsMultiplicative);
	addKeyToAttributes(comprehensiveStatsBool);

	baseBotAttributes[model].TechTree.forEach((tech, index)=>{
		if (botBuild.techTree[index]) {
			if (comprehensiveStatsAdditive.includes(tech.affect)) {
				attributesReturn[tech.affect] += tech.magnitude;
			}
			else if (comprehensiveStatsMultiplicative.includes(tech.affect)) {
				attributesReturn[tech.affect] *= tech.magnitude;
			}
		}
		if (tech && comprehensiveStatsBool.includes(tech.affect)) {
			botBuild.techTree[index] ? 
			attributesReturn[tech.affect] = true : attributesReturn[tech.affect] = false;
		}
	})

	for (let n = 1; n <= 5; n++) {
		let accNumber = `acc${n}`;
		if (equipped[accNumber]) {
			let accessoryInfo = accessoryStats[equipped[accNumber]];
			delete accessoryInfo.name;
			delete accessoryInfo.description;
			delete accessoryInfo.potency;
			let accKeys = Object.keys(accessoryInfo);
			accKeys.forEach((key)=>{
				if (comprehensiveStatsAdditive.includes(key)) {
					attributesReturn[key] += accessoryInfo[key]
				}
				else if (comprehensiveStatsMultiplicative.includes(key)) {
					attributesReturn[key] *= accessoryInfo[key]
				}
				else if (comprehensiveStatsBool.includes(key)) {
					attributesReturn[key] = true
				}
			})
		}
	}
	
	return attributesReturn
}