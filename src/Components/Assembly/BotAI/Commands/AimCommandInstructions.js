import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import { weaponStats } from '../../../../Constants/equipment';
import { getThemeColors } from '../../../../Redux/reducers/user-reducer';
import WarningIcons from '../WarningIcons';


const AimCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const colors = useSelector(getThemeColors);
	const [weaponWarning, setWeaponWarning] = React.useState(false);

	React.useEffect(()=>{
		if (botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon]) {
			if (weaponStats[botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon]].superTypes[0] === 'Ranged') {
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
	function toggleRotationType() {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating = !newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating;
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
					SELECT A RANGED WEAPON
				</Request>
				<Options className = 'centeredFlex'>
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
				</Options>
			</WeaponSelectContainer>
			{weaponWarning &&
				<Warning
				colors = {colors}
				>
					<WarningIcons/>
						SELECTED WEAPON IS NOT A RANGED WEAPON
					<WarningIcons/>
				</Warning>
			}
			<br/>
			<AimTypeSelectionContainer>
				<Request className = 'centeredFlex'>
					SELECT AIMING METHOD
				</Request>
				<Options className = 'centeredFlex'>
					<StyledButton
					handleClick = {()=>{toggleRotationType()}}
					selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true}
					fontSize = {9}
					// disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true}
					>
						BY INCREMENT
					</StyledButton>
					<StyledButton
					handleClick = {()=>{toggleRotationType()}}
					selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false}
					fontSize = {9}
					// disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false}
					>
						SET DIRECTION
					</StyledButton>
				</Options>
			</AimTypeSelectionContainer>
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating ?
			(
				<>
					rotation amount setter and display
				</>
			) : (
				<>
					rotation to setter and display
				</>
			)}
		</div>
	)
}
export default AimCommandInstructions;
const WeaponSelectContainer = styled.div`
	width: 100%;
	height: 120px;
	display: flex;
	background: ${props => props.weaponWarning && 'rgba(255,0,0,0.2)'};
`
const AimTypeSelectionContainer = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
`
const Request = styled.div`
	height: 100%;
	width: 50%;
	color: ${props => props.warning && props.colors.hoveredText}
`
const Options = styled.div`
	height: 100%;
	width: 50%;
	flex-direction: column;
`
const Warning = styled.div`
	color: ${props => props.colors.hoveredText};
	background: rgba(255,0,0,0.2);
`