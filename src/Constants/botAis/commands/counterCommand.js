class CounterCommand {
  constructor() {
		this.name = 'counterCommand';
		this.instructions = {
			weapon: 'arm1',
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a melee weapon
	setArm(armSlot) {
		this.instructions.weapon = armSlot;
	}
}
module.exports = CounterCommand