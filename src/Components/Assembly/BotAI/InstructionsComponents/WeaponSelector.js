import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import { weaponStats } from '../../../../Constants/equipment';
import { getThemeColors } from '../../../../Redux/reducers/user-reducer';
import WarningBar from './WarningBar';

const WeaponSelector = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, weaponType }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const colors = useSelector(getThemeColors);
	const [weaponWarning, setWeaponWarning] = React.useState(false);

	React.useEffect(()=>{
		if (botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon]) {
			if (weaponStats[botInfo[botNumberSelected].equipment[nodeInfo.instructions.weapon]].superTypes[0] === weaponType) {
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
		<>
			<WeaponSelectContainer
			weaponWarning = {weaponWarning}
			colors = {colors}
			>
				<Request 
				className = 'centeredFlex'
				warning = {weaponWarning}
				colors = {colors}
				>
					SELECT A {weaponType.toUpperCase()} WEAPON
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
        		    	'EMPTY'
        		 		)}
						</StyledButton>
						)
					})}
				</Options>
			</WeaponSelectContainer>
			{weaponWarning &&
				<WarningBar>
					SELECTED SLOT DOES NOT CONTAIN A {weaponType.toUpperCase()} WEAPON
				</WarningBar>
			}
		</>
	)
}
export default WeaponSelector;
const WeaponSelectContainer = styled.div`
	width: 100%;
	height: 120px;
	display: flex;
	background: ${props => props.weaponWarning && 'rgba(255,0,0,0.2)'};
`

const Request = styled.div`
	height: 100%;
	width: 49%;
	color: ${props => props.warning && props.colors.hoveredText};
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