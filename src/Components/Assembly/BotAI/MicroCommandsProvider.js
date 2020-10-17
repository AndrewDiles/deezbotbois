import React from 'react';

import CommandWithoutInstructions from './Commands/CommandWithoutInstructions';

import AimAndAttackCommandInstructions from './Commands/AimAndAttackCommandInstructions';
import AimCommandInstructions from './Commands/AimCommandInstructions';
import ChargeCommandInstructions from './Commands/ChargeCommandInstructions';
import CounterCommandInstructions from './Commands/CounterCommandInstructions';
import ElevenAttackCommandInstructions from './Commands/ElevenAttackCommandInstructions';
import MeleeAttackCommandInstructions from './Commands/MeleeAttackCommandInstructions';
import MoveAttackCommandInstructions from './Commands/MoveAttackCommandInstructions';
import RamCommandInstructions from './Commands/RamCommandInstructions';
import RangedAttackCommandInstructions from './Commands/RangedAttackCommandInstructions';

const MicroCommandsProvider = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {
// console.log(nodeInfo)
if (!nodeInfo || !nodeInfo.name) {
	return (
		<>
			MISSING NODE DATA
		</>
	)
}
switch(nodeInfo.name) {
	case 'aimAndAttackCommand' : {
		return (
			<AimAndAttackCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'aimCommand' : {
		return (
			<AimCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'chargeCommand' : {
		return (
			<ChargeCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'counterCommand' : {
		return (
			<CounterCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'elevenAttackCommand' : {
		return (
			<ElevenAttackCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'guardCommand' : {
		return (
			<CommandWithoutInstructions/>
		)
	}
	case 'meleeAttackCommand' : {
		return (
			<MeleeAttackCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'moveCommand' : {
		return (
			<MoveAttackCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'ramCommand' : {
		return (
			<RamCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'rangedAttackCommand' : {
		return (
			<RangedAttackCommandInstructions
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
	}
	case 'rechargeCommand' : {
		return (
			<CommandWithoutInstructions/>
		)
	}
	case 'redirectCommand' : {
		return (
			<CommandWithoutInstructions/>
		)
	}
	case 'repairCommand' : {
		return (
			<CommandWithoutInstructions/>
		)
	}
	case 'scanCommand' : {
		return (
			<CommandWithoutInstructions/>
		)
	}
	case 'waitCommand' : {
		return (
			<CommandWithoutInstructions/>
		)
	}
	default: {
	}
}

	return (
    <div className = 'innerNodeOptionsWrapper'>
			?{nodeInfo.name}?
		</div>
  )
}
export default MicroCommandsProvider;