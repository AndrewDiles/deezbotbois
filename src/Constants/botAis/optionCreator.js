import conditionsList from '../conditions';
import { comprehensiveStatsBool } from '../attributes';

class DecisionObject {
  constructor(decisionType, depth, conditionMet, conditionUnMet) {
		const conditionIndex = conditionsList.indexOf(decisionType);
		if (conditionIndex !== -1) {
			const Condition = require(`./conditions/${conditionsList[conditionIndex]}`);
			this.condition = new Condition(depth, conditionMet, conditionUnMet);
		} else {
			const commandIndex = comprehensiveStatsBool.indexOf(decisionType);
			if (commandIndex !== -1) {
				const Command = require(`./commands/${comprehensiveStatsBool[commandIndex]}`);
				this.command = new Command();
			} else {
				throw new Error('unsupported')
			}
		}
  }
}
export default DecisionObject











// // import fs from 'fs';
// // import { readdirSync } from 'fs'
// // const fs = require('fs');
// import conditionsList from '../conditions';
// import { comprehensiveStatsBool } from '../attributes';

// class DecisionObject {
//   constructor(decisionType, depth, conditionMet, conditionUnMet) {
// 		// console.log({fs})
// 		// const conditionNames = fs.readdirSync('./conditions');
// 		// const conditionNames = readdirSync('./conditions');
// 		// const conditionIndex = conditionNames.indexOf(decisionType);
// 		const conditionIndex = conditionsList.indexOf(decisionType);
// 		if (conditionIndex !== -1) {
// 			// const Condition = require(`./conditions/${conditionNames[conditionIndex]}`);
// 			console.log({conditionsList})
// 			console.log({conditionIndex})
// 			console.log(conditionsList[conditionIndex])
// 			const Condition = require(`./conditions/${conditionsList[conditionIndex]}`);
// 			console.log(Condition)
// 			this.object = new Condition(depth, conditionMet, conditionUnMet);
// 		} else {
// 			// const commandNames = fs.readdirSync('./commmands');
// 			// const commandNames = readdirSync('./commmands');
// 			// const commandIndex = commandNames.indexOf(decisionType);
// 			const commandIndex = comprehensiveStatsBool.indexOf(decisionType);
// 			if (commandIndex !== -1) {
// 				// const Command = require(`./commands/${commandNames[commandIndex]}`);
// 				const Command = require(`./commands/${comprehensiveStatsBool[commandIndex]}`);
// 				this.object = new Command();
// 			} else {
// 				throw new Error('unsupported')
// 			}
// 		}
//   }
// }
// export default DecisionObject