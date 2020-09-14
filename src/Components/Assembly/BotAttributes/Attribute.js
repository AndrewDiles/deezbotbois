import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import iconImporter from '../../../Constants/iconImporter';

import ToolTipIcon from '../../ToolTip/ToolTipIcon';

import baseBotAttributes from '../../../Constants/attributes';
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
	let icons = iconImporter(attribute);
	let iconImport = null;
	if (attribute.includes('Cost')) iconImport = icons.icon2;
	else iconImport = icons.icon1;

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
			backgroundColor = {colors.secondary}
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
	background-color: ${props => props.type === 'sum' && props.backgroundColor};
	/* line-height: 32px;
	text-align: center; */
	/* align-content: center;
	justify-content: center;
	align-self: center;
	justify-self: center;
	margin: auto; */
	/* padding: 50%; */
`