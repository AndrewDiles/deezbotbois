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
			console.log({key});
			console.log(baseBotAttributes[model][key]);
			attributesReturn[key] = baseBotAttributes[model][key];
		})
	}
	addKeyToAttributes(comprehensiveStatsAdditive);
	addKeyToAttributes(comprehensiveStatsMultiplicative);
	addKeyToAttributes(comprehensiveStatsBool);


	return attributesReturn
}