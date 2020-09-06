import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import {heart} from 'react-icons-kit/icomoon/heart' 				// Durability 
import {shield} from 'react-icons-kit/icomoon/shield' 			// Armor
import {sphere} from 'react-icons-kit/icomoon/sphere' 			// Shield
// import {ic_gps_fixed} from 'react-icons-kit/md/ic_gps_fixed'
import {target} from 'react-icons-kit/ikons/target'
// import {target} from 'react-icons-kit/icomoon/target'				// Accuracy
import {hammer} from 'react-icons-kit/icomoon/hammer' 			// Power
import {ic_battery_full} from 'react-icons-kit/md/ic_battery_full' 
// Capacitor

import {ic_battery_charging_50} from 'react-icons-kit/md/ic_battery_charging_50' 
// Reactor

import {wrench} from 'react-icons-kit/icomoon/wrench' 			// AutoRepair
// import {binoculars} from 'react-icons-kit/icomoon/binoculars'
import {ic_wifi_tethering} from 'react-icons-kit/md/ic_wifi_tethering'
// ScanDistance

// import {iosSpeedometer} from 'react-icons-kit/ionicons/iosSpeedometer'
import {ic_timeline} from 'react-icons-kit/md/ic_timeline'	// MovementDistance
import {ic_format_list_numbered} from 'react-icons-kit/md/ic_format_list_numbered'
// Initiative
import {power} from 'react-icons-kit/icomoon/power'					// Costs
import ToolTipIcon from '../ToolTip/ToolTipIcon';

import baseBotAttributes, {attributeInfo} from '../../Constants/attributes';
import { accessoryStats, weaponStats, equipmentSlots } from '../../Constants/equipment';


const Attribute = ({ botNumberSelected, attribute, equipmentStagedToChange }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const colors = useSelector(getThemeColors);
	// const [messageOpen, setMessageOpen] = useState(false);
	// const [messageHovered, setMessageHovered] = useState(false);
	const [baseAttributeValue, setBaseAttributeValue] = useState(null);
	const [equipmentAttributeModifier, setEquipmentAttributeModifier] = useState(null);
	let iconImport = null;
	
	useEffect(()=>{
		if (botNumberSelected === undefined) return;
		else {
			setBaseAttributeValue(baseBotAttributes[userInfo.botBuilds[botNumberSelected].model][attribute]);
		}
	},[userInfo.botBuilds, botNumberSelected]);
	useEffect(()=>{
		if (botNumberSelected === undefined) return;
		let sum = 0;
		equipmentSlots.forEach((slot)=>{
			if (userInfo.botBuilds[botNumberSelected].equipment[slot]) {
				if (weaponStats[userInfo.botBuilds[botNumberSelected].equipment[slot]] && weaponStats[userInfo.botBuilds[botNumberSelected].equipment[slot]][attribute]) {
					sum += weaponStats[userInfo.botBuilds[botNumberSelected].equipment[slot]][attribute];
				}
			}
		})
		setEquipmentAttributeModifier(sum);
	},[userInfo.botBuilds, botNumberSelected])
	// useEffect(()=>{
	// 	let targetIcon = document.getElementById(`${attribute}Icon`);
	// 	let onMouseEnter = (ev) => {
	// 		// Below test will prevent multiple ToolTips pooping up by triggering mouseenter through divs
	// 		if (ev.target === targetIcon) setMessageHovered(true);
	// 	}
	// 	if (targetIcon) {
	// 		targetIcon.addEventListener('mouseenter',onMouseEnter);
	// 	}
	// 	return ()=>{
	// 		if (!targetIcon) return;
	// 		targetIcon.removeEventListener('mouseenter',onMouseEnter);
  //   }
	// },[attribute])
	// const handleClickIcon = () => {
	// 	setMessageOpen(!messageOpen)
	// }

	switch(attribute) {
		case 'Durability' : {
			iconImport = heart;
			break;
		}
		case 'Armor' : {
			iconImport = shield;
			break;
		}
		case 'Shield' : {
			iconImport = sphere;
			break;
		}
		case 'Accuracy' : {
			iconImport = target;
			break;
		}
		case 'Power' : {
			iconImport = hammer;
			break;
		}
		case 'Capacitor' : {
			iconImport = ic_battery_full;
			break;
		}
		case 'Reactor' : {
			iconImport = ic_battery_charging_50;
			break;
		}
		case 'AutoRepair' : {
			iconImport = wrench;
			break;
		}
		case 'ScanDistance' : {
			iconImport = ic_wifi_tethering;
			break;
		}
		case 'ScanCost' : {
			iconImport = power;
			break;
		}
		case 'MovementDistance' : {
			iconImport = ic_timeline;
			break;
		}
		case 'MovementCost' : {
			iconImport = power;
			break;
		}
		case 'Initiative' : {
			iconImport = ic_format_list_numbered;
			break;
		}
		default :{}
	}

	// if (!userInfo.botBuilds) {
	// 	return (<></>)
	// }
	if (attribute === 'BAR') {
		return (
			<AttributeRow>
				<Bar
				color = {colors.secondary}
				/>
			</AttributeRow>
		)
	}
	
  return (
    <AttributeRow
		color = {colors.secondary}
		>
			<ToolTipIcon
			name = {attribute}
			iconImport = {iconImport}
			selfLocation = 'left'
			/>

			{/* <StyledIcon
			id = {`${attribute}Icon`}
			// handleClick = {()=>{handleClickIcon()}}
			// padding = {5}
			icon = {iconImport}
			size = {15}
      />
			<ToolTip
				messageOpen = {messageOpen}
				setMessageOpen = {setMessageOpen}
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				>
					{attributeInfo[attribute]}
			</ToolTip> */}
			<NumberCell
			className = 'centeredFlex'
			>
				{baseAttributeValue}
				
			</NumberCell>
			<NumberCell
			className = 'centeredFlex'
			>
				{equipmentAttributeModifier === 0 ? '-' : equipmentAttributeModifier}
			</NumberCell>
    </AttributeRow>
  )
}
export default Attribute;

const AttributeRow = styled.div`
	display: grid;
	grid-template-columns: repeat(7,35px);
	border-bottom: ${props => `1px solid ${props.color}`}
`
const Bar = styled.div`
	width: 248px;
	height: 4px;
	background: ${props => props.color};
`
const NumberCell = styled.div`
	height: 100%;
	width: 100%;
	font-size: 0.6em;
	/* line-height: 32px;
	text-align: center; */
	/* align-content: center;
	justify-content: center;
	align-self: center;
	justify-self: center;
	margin: auto; */
	/* padding: 50%; */
`