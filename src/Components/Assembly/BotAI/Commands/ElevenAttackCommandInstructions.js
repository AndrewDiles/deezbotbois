import React from 'react';
import { useSelector } from "react-redux";
import AttackTypeSetter from '../InstructionsComponents/AttackTypeSetter';
import WeaponSelector from '../InstructionsComponents/WeaponSelector';
import TargettingToggle from '../InstructionsComponents/TargettingToggle';
import TargetSelector from '../InstructionsComponents/TargetSelector';
import AttackDirectionSetter from '../InstructionsComponents/AttackDirectionSetter';
import RotatingOrTargettingToggles from '../InstructionsComponents/RotatingOrTargettingToggles';
import RotationSetter from '../InstructionsComponents/RotationSetter';
import DirectionSetter from '../InstructionsComponents/DirectionSetter';
import { weaponStats } from '../../../../Constants/equipment';
// import { getThemeColors } from '../../../../Redux/reducers/user-reducer';


const ElevenAttackCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [energyWeaponError, setEnergyWeaponError] = React.useState(false);

	React.useEffect(()=>{
		if (!userInfo.botBuilds[botNumberSelected]) {
			return
		}
		let selectedWeaponInfo = weaponStats[botInfo[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.weapon]];
		if (selectedWeaponInfo) {
			if (selectedWeaponInfo.subTypes.includes("Energy")) {
				setEnergyWeaponError(false)
			} else {
				setEnergyWeaponError(true)
			}
		} else {
			setEnergyWeaponError(false)
		}		
		console.log('change trigger')
	},[
		activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.weapon,
		botInfo[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.weapon]
	])
	if (!userInfo.botBuilds[botNumberSelected]) {
		return <></>
	}
	return (		
		<div className = 'commandContents'>
			<AttackTypeSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			<WeaponSelector
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
			weaponType = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'melee' ? 'Melee' : 'Ranged'}
			/>
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'melee' &&
				<TargettingToggle
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'melee' &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === true &&
				<TargetSelector
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'melee' &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === false &&
				<AttackDirectionSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}

			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'ranged' &&
				<RotatingOrTargettingToggles
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'ranged' &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === true &&
				<TargetSelector
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'ranged' &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === false &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true &&
				<RotationSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'ranged' &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === false &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false &&
				<DirectionSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}

				/>
			}
		</div>
	)
}
export default ElevenAttackCommandInstructions;