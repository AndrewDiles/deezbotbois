import fs from 'fs';

class DecisionObject {
  // this.objects = [];
  constructor(decisionType) {
		const conditionNames = fs.readdirSync('./conditions');
		const conditionIndex = conditionNames.indexOf(decisionType);
		if (conditionIndex !== -1) {
			const Condition = require(`./conditions/${conditionNames[conditionIndex]}`);
			this.object = new Condition();
		} else {
			const commandNames = fs.readdirSync('./commmands');
			const commandIndex = commandNames.indexOf(decisionType);
			if (commandIndex !== -1) {
				const Command = require(`./commands/${commandNames[commandIndex]}`);
				this.object = new Command();
			} else {
				throw new Error('unsupported')
			}
		}
  }
  // runAll() {
  //     this.objects.forEach(object => object.run());
  // }
}

// function optionCreator(optionType) {


// 	//  I will import an array with each Class name that will look like const options = [command, condition]
// 	// perform options.forEach((option)=>{option.name===optionType && {return new Command}})
// 	if (optionType === 'condition') {
// 		let newCondition = Object.create(conditionFunction);
// 		return newCondition
// 	}
// 	else if (optionType === 'command') {
// 		let newCommand = Object.create(commandFunction);
// 		return newCommand
// 	}
// 	else {
// 		console.log('error in optionCreator of type: ', optionType)
// 		return null
// 	}
// }

// function conditionFunction(conditionType) {
// 	switch(model) {
//     case 'adjacentTo' : {
// 			let conditionObject = new AdjacentTo();
// 			return conditionObject
//     }
// 		break;
// 		default : {}
// 	}
// }
// function commandFunction(commandType, instructionsObject) {

// }

// class AdjacentTo {
// 	static name = 'Adjacent To';
// 	constructor() {
    
//   }
// }

// export default optionCreator