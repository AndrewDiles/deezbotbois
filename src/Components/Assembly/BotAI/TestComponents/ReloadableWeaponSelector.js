import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import { weaponStats } from '../../../../Constants/equipment';
import { getThemeColors } from '../../../../Redux/reducers/user-reducer';
import WarningBar from '../InstructionsComponents/WarningBar';

const ReloadableWeaponSelector = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const botInfo = userInfo.botBuilds;
	const colors = useSelector(getThemeColors);
	const [weaponWarning, setWeaponWarning] = React.useState(false);

	React.useEffect(()=>{
		if (botInfo[botNumberSelected].equipment[nodeInfo.test.armSlot]) {
			if (weaponStats[botInfo[botNumberSelected].equipment[nodeInfo.test.armSlot]].reloadTime) {
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
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot = slot;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
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
					SELECT A RELOADABLE WEAPON
				</Request>
				<Options className = 'evenlyFlex'>
					{['arm1','arm2','arm3'].map((slot)=>{
						return(
							<StyledButton
							key = {slot}
							handleClick = {()=>{setArm(slot)}}
							selected = {slot === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.armSlot}
							fontSize = {9}
							disabled = {!weaponStats[botInfo[botNumberSelected].equipment[slot]]}
							sfx = 'selected'
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
					SELECTED SLOT DOES NOT CONTAIN A RELOADABLE WEAPON
				</WarningBar>
			}
		</>
	)
}
export default ReloadableWeaponSelector;
const WeaponSelectContainer = styled.div`
	width: 100%;
	height: 130px;
	display: flex;
	background: ${props => props.weaponWarning && 'rgba(255,0,0,0.2)'};
`

const Request = styled.div`
	height: 100%;
	width: 49%;
	font-size: 0.8em;
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