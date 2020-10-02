import baseBotAttributes, {
	comprehensiveStatsAdditive,
	comprehensiveStatsMultiplicative,
	comprehensiveStatsBool
} from './attributes';

// function that calculates all bot attributes given a botBuild object
export function generateAttributes (botBuild) {
	const model = botBuild.model;

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

	return attributesReturn
}