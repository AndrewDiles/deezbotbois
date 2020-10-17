import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import { weaponStats } from '../../../../Constants/equipment';
import { getThemeColors } from '../../../../Redux/reducers/user-reducer';
import WarningIcons from '../WarningIcons';


const CounterCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const colors = useSelector(getThemeColors);
	const [weaponWarning, setWeaponWarning] = React.useState(false);

	React.useEffect(()=>{
		// console.log(botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon])
		if (botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon]) {
			// console.log(weaponStats[botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon]])
			if (weaponStats[botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon]].superTypes[0] === 'Melee') {
				setWeaponWarning(false)
			}
			else {
				setWeaponWarning(true)
			}
		}
		else {
			setWeaponWarning(true)
		}
	},[activeNodeArray,nodeInfo, JSON.stringify(botInfo[botNumberSelected].equipment)])

	function setArm(slot) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.weapon = slot;
		setActiveNodeArray(newActiveNodeArray)
	}

	return (		
		<div className = 'commandContents'>
			<WeaponSelectContainer
			weaponWarning = {weaponWarning}
			colors = {colors}
			>
				<Request 
				className = 'centeredFlex'
				warning = {weaponWarning}
				colors = {colors}
				>
					SELECT A MELEE WEAPON
				</Request>
				<WeaponOptions className = 'centeredFlex'>
					{['arm1','arm2','arm3'].map((slot)=>{
						return(
							<StyledButton
							key = {slot}
							handleClick = {()=>{setArm(slot)}}
							selected = {slot === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.weapon}
							fontSize = {9}
							disabled = {!weaponStats[botInfo[botNumberSelected].equipment[slot]]}
							>
								{weaponStats[botInfo[botNumberSelected].equipment[slot]] ?
								(
        		  	  `${weaponStats[botInfo[botNumberSelected].equipment[slot]].name}`
        		  	):(
        		    	'EMPTY SLOT'
        		 		)}
						</StyledButton>
						)
					})}
				</WeaponOptions>
			</WeaponSelectContainer>
			{weaponWarning &&
				<Warning
				colors = {colors}
				>
					<WarningIcons/>
						SELECTED WEAPON IS NOT A MELEE WEAPON
					<WarningIcons/>
				</Warning>
			}
		</div>
	)
}
export default CounterCommandInstructions;
const WeaponSelectContainer = styled.div`
	width: 100%;
	height: 120px;
	display: flex;
	background: ${props => props.weaponWarning && 'rgba(255,0,0,0.2)'};
`
const Request = styled.div`
	height: 100%;
	width: 50%;
	color: ${props => props.warning && props.colors.hoveredText}
`
const WeaponOptions = styled.div`
	height: 100%;
	width: 50%;
	flex-direction: column;
`
const Warning = styled.div`
	color: ${props => props.colors.hoveredText};
	background: rgba(255,0,0,0.2);
`