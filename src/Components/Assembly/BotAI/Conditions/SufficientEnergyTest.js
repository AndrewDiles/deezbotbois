import React from 'react';
import { useSelector } from "react-redux";
import CommandSetter from '../TestComponents/CommandSetter';
import WeaponSelector from '../TestComponents/WeaponSelector';
import WarningBar from '../InstructionsComponents/WarningBar';
import { weaponStats } from '../../../../Constants/equipment';

const SufficientEnergyTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, attributes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	if (!userInfo.botBuilds[botNumberSelected]) {
		return <></>
	}
	return (		
		<div className = 'commandContents'>
			{attributes[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName] === false &&
				<WarningBar>
					BOT DOES NOT KNOW SELECTED COMMAND
				</WarningBar>
			}
			<CommandSetter
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
			attributes = {attributes}
			/>
			{attributes[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName] === false &&
				<WarningBar>
					BOT DOES NOT KNOW SELECTED COMMAND
				</WarningBar>
			}
			<br/>
			{(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'aimAndAttackCommand' || 
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'chargeCommand' || 
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'counterCommand' || 
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'elevenAttackCommand' || 
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'meleeAttackCommand' || 
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'rangedAttackCommand' ) &&
				<>
				<WeaponSelector
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				botNumberSelected = {botNumberSelected}
				aiAndScripts = {aiAndScripts}
				weaponType = 'any'
				/>
				<br/>
				{(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'aimAndAttackCommand' || 
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'rangedAttackCommand') && 
				userInfo.botBuilds[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot] &&
				weaponStats[userInfo.botBuilds[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot]].superTypes[0] !== 'Ranged' &&
					<WarningBar>
						SELECTED SLOT DOES NOT CONTAIN A RANGED WEAPON
					</WarningBar>
				}
				{(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'counterCommand' || 
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'meleeAttackCommand') && 
				userInfo.botBuilds[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot] &&
				weaponStats[userInfo.botBuilds[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot]].superTypes[0] !== 'Melee' &&
					<WarningBar>
						SELECTED SLOT DOES NOT CONTAIN A MELEE WEAPON
					</WarningBar>
				}
				{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName === 'elevenAttackCommand' && 
				userInfo.botBuilds[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot] &&
				weaponStats[userInfo.botBuilds[botNumberSelected].equipment[activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot]].subTypes[0] !== 'Energy' &&
					<WarningBar>
						SELECTED SLOT DOES NOT CONTAIN AN ENERGY WEAPON
					</WarningBar>
				}
				</>
			}
			
		</div>
	)
}
export default SufficientEnergyTest;