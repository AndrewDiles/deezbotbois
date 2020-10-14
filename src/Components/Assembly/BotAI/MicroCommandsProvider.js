import React from 'react';


import WaitCommand from './Commands/WaitCommand';

const MicroCommandsProvider = ({ nodeInfo, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {
console.log(nodeInfo)
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
			<>
				aimandatk
			</>
		)
		break;
	}
	case 'aimCommand' : {
		return (
			<>
				aimcomm
			</>
		)
		break;
	}
	case 'chargeCommand' : {
		return (
			<>
				charge
			</>
		)
		break;
	}
	case 'counterCommand' : {
		return (
			<>
				counter
			</>
		)
		break;
	}
	case 'elevenAttackCommand' : {
		return (
			<>
				11
			</>
		)
		break;
	}
	case 'guardCommand' : {
		return (
			<>
				guard
			</>
		)
		break;
	}
	case 'meleeAttackCommand' : {
		return (
			<>
				mel atk
			</>
		)
		break;
	}
	case 'moveCommand' : {
		return (
			<>
				move
			</>
		)
		break;
	}
	case 'ramCommand' : {
		return (
			<>
				ram
			</>
		)
		break;
	}
	case 'rangedAttackCommand' : {
		return (
			<>
				ranged
			</>
		)
		break;
	}
	case 'rechargeCommand' : {
		return (
			<>
				recharge
			</>
		)
		break;
	}
	case 'redirectCommand' : {
		return (
			<>
				redirect
			</>
		)
		break;
	}
	case 'repairCommand' : {
		return (
			<>
				repair
			</>
		)
		break;
	}
	case 'scanCommand' : {
		return (
			<>
				scan
			</>
		)
		break;
	}
	case 'waitCommand' : {
		return (
			<WaitCommand
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		)
		break;
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