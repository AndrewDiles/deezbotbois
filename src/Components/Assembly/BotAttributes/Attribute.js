import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

import {heart} from 'react-icons-kit/icomoon/heart' 				// Durability 
import {shield} from 'react-icons-kit/icomoon/shield' 			// Armor
import {sphere} from 'react-icons-kit/icomoon/sphere' 			// Shield
// import {ic_gps_fixed} from 'react-icons-kit/md/ic_gps_fixed'
// import {target} from 'react-icons-kit/ikons/target'
// import {bullseye} from 'react-icons-kit/ikons/bullseye'
import {u1F3AF} from 'react-icons-kit/noto_emoji_regular/u1F3AF'
// import {target} from 'react-icons-kit/icomoon/target'				// Accuracy
// import {hammer} from 'react-icons-kit/icomoon/hammer' 			
import {u1F529} from 'react-icons-kit/noto_emoji_regular/u1F529'// Power
// import {ic_battery_full} from 'react-icons-kit/md/ic_battery_full'
import {battery} from 'react-icons-kit/entypo/battery'
// import {u1F50B} from 'react-icons-kit/noto_emoji_regular/u1F50B'
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
import ToolTipIcon from '../../ToolTip/ToolTipIcon';

import baseBotAttributes, {attributeInfo} from '../../../Constants/attributes';
import { accessoryStats, weaponStats, equipmentSlots } from '../../../Constants/equipment';


const Attribute = ({ botNumberSelected, attribute, equipmentStaging }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const colors = useSelector(getThemeColors);
	const [baseAttributeValue, setBaseAttributeValue] = useState(null);
	const [equipmentAttributeValue, setEquipmentAttributeValue] = useState(0);
	const [techAttributeValue, setTechAttributeValue] = useState(0);
	const [grandSum, setGrandSum] = useState(0);
	const [changes, setChanges] = useState(0);
	const [percentChanges, setPercentChanges] = useState(0);
	
	useEffect(()=>{
		if (botNumberSelected === undefined) return;
		else {
			setBaseAttributeValue(baseBotAttributes[userInfo.botBuilds[botNumberSelected].model][attribute]);
			// setequipmentAttributeValue(0);
			let equipmentSum = 0;
			equipmentSlots.forEach((slot)=>{
				if (accessoryStats[userInfo.botBuilds[botNumberSelected].equipment[slot]] && accessoryStats[userInfo.botBuilds[botNumberSelected].equipment[slot]][attribute]
					) {
						equipmentSum += accessoryStats[userInfo.botBuilds[botNumberSelected].equipment[slot]][attribute];
				}
				else if (weaponStats[userInfo.botBuilds[botNumberSelected].equipment[slot]] && weaponStats[userInfo.botBuilds[botNumberSelected].equipment[slot]][attribute]) {
					equipmentSum += weaponStats[userInfo.botBuilds[botNumberSelected].equipment[slot]][attribute];
				}
			})
			setEquipmentAttributeValue(equipmentSum);
			let techSum = 0;
			userInfo.botBuilds[botNumberSelected].techTree.forEach((techPurchased, purchaseIndex)=>{
				if (techPurchased === true) {
					if (baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].TechTree[purchaseIndex].affect === attribute){
						techSum += baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].TechTree[purchaseIndex].magnitude;
					}
				}
			})
			setTechAttributeValue(techSum);
		}
	},[userInfo.botBuilds, botNumberSelected]);
	useEffect(()=>{
		setGrandSum(baseAttributeValue + equipmentAttributeValue + techAttributeValue)
	},[ baseAttributeValue, equipmentAttributeValue, techAttributeValue]);
	useEffect(()=>{
		if (attribute === 'BAR') return;
		if (!equipmentStaging.from || !equipmentStaging.to || !equipmentStaging.from.name || !equipmentStaging.to.name) {
			setChanges(0);
			setPercentChanges(0);
		}
		else {
			// console.log('from name',equipmentStaging.from.name, 'to name',equipmentStaging.to.name)
			let sum = 0;
			if(equipmentStaging.from.slot.includes('acc')) {
				if (accessoryStats[equipmentStaging.from.name][attribute]) sum -= accessoryStats[equipmentStaging.from.name][attribute];
				if (accessoryStats[equipmentStaging.to.name][attribute]) sum += accessoryStats[equipmentStaging.to.name][attribute];
				setChanges(sum);
				let percent = 100*((((sum+grandSum)/grandSum))-1);
				// let formattedPercent = (Math.floor(10*percent))/10;
				let formattedPercent = (Math.round(percent));
				setPercentChanges(formattedPercent);
			}
			else if (equipmentStaging.from.slot.includes('arm')) {
				if (weaponStats[equipmentStaging.from.name][attribute]) sum -= weaponStats[equipmentStaging.from.name][attribute];
				if (weaponStats[equipmentStaging.to.name][attribute]) sum += weaponStats[equipmentStaging.to.name][attribute];
				setChanges(sum);
				let percent = 100*((((sum+grandSum)/grandSum))-1);
				let formattedPercent = (Math.round(percent));
				setPercentChanges(formattedPercent);
			}
			else {
				console.log('This condition should not have been reached')
			}
		}
	},[equipmentStaging])
	let iconImport = null;
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
			iconImport = u1F3AF;
			break;
		}
		case 'Power' : {
			iconImport = u1F529;
			break;
		}
		case 'Capacitor' : {
			iconImport = battery;
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
			animated = 'attribute'
			/>
			<NumberCell className = 'centeredFlex'>
				{baseAttributeValue}
			</NumberCell>
			<NumberCell className = 'centeredFlex'>
				{equipmentAttributeValue === 0 ? '' : equipmentAttributeValue}
			</NumberCell>
			<NumberCell className = 'centeredFlex'>
				{techAttributeValue === 0 ? '' : techAttributeValue}
			</NumberCell>
			<NumberCell className = 'centeredFlex'
			type = 'sum'
			>
				{grandSum}
			</NumberCell>
			<NumberCell className = 'centeredFlex'
			change = {changes}
			>
				{changes === 0 ? '' : Math.abs(changes)}
			</NumberCell>
			<NumberCell className = 'centeredFlex'
			change = {percentChanges}
			type = 'percent'
			>
				{percentChanges === 0 ? '' : `${Math.abs(percentChanges)}%`}
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
	font-size: ${props => props.type === 'sum' ? '0.7em' : props.type === 'percent' ? '0.4em' :'0.5em'};
	color: ${props => props.change > 0 ? 'limegreen' : props.change < 0 ? 'darkred' : ''};
	/* line-height: 32px;
	text-align: center; */
	/* align-content: center;
	justify-content: center;
	align-self: center;
	justify-self: center;
	margin: auto; */
	/* padding: 50%; */
`