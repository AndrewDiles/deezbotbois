class CounterCommand {
  constructor() {
		this.command = {
			name: 'counterCommand',
			instructions: {
				weapon: 'arm1',
			}
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a melee weapon
	setArm(armSlot) {
		this.command.instructions.weapon = armSlot;
	}
}
export default CounterCommand