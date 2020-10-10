import fs from 'fs';

class DecisionObject {
  constructor(decisionType, depth, conditionMet, conditionUnMet) {
		const conditionNames = fs.readdirSync('./conditions');
		const conditionIndex = conditionNames.indexOf(decisionType);
		if (conditionIndex !== -1) {
			const Condition = require(`./conditions/${conditionNames[conditionIndex]}`);
			this.object = new Condition(depth, conditionMet, conditionUnMet);
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
}
export default DecisionObject