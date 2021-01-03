import React from 'react';
import styled from 'styled-components';
import Attribute from '../../Assembly/ComprehensiveAttributes/Attribute';
import Command from '../../Assembly/ComprehensiveAttributes/Command';
import { comprehensiveStatsAdditive, comprehensiveStatsMultiplicative, comprehensiveStatsBool } from '../../../Constants/attributes';

const Attributes = ({ cellContents }) => {
	const [hasNon1Multiplier, setHasNon1Multiplier] = React.useState(false);
	React.useState(()=>{
		let non1Found = false;
		for (let i = 0; i < comprehensiveStatsMultiplicative.length; i++) {
			// console.log(comprehensiveStatsMultiplicative[i],cellContents.attributes[comprehensiveStatsMultiplicative[i]])
			if (cellContents.attributes[comprehensiveStatsMultiplicative[i]] !== 1) {
				non1Found = true;
				break;
			}
		}
		setHasNon1Multiplier(non1Found);
	},[])
  return (
    <Wrapper className = 'startFlex col'>
			MODULAR ATTRIBUTES:
			{cellContents.attributes.CurrentBurn !== 0 &&
				<AttributeContainer>
					<Attribute
					attribute = 'Burn'
					value = {cellContents.attributes.CurrentBurn}
					singleLeftDisplay = {1}
					width = {274}
					/>
				</AttributeContainer>
			}
			<AttributeContainer>
				<Attribute
				attribute = 'Durability'
				value = {cellContents.attributes.Durability}
				currentValue = {cellContents.attributes.CurrentDurability}
				singleLeftDisplay = {1}
				width = {274}
				/>
			</AttributeContainer>
			<AttributeContainer>
				<Attribute
				attribute = 'Capacitor'
				value = {cellContents.attributes.Capacitor}
				currentValue = {cellContents.attributes.CurrentCapacitor}
				singleLeftDisplay = {1}
				width = {274}
				/>
			</AttributeContainer>
			<AttributeContainer>
				<Attribute
				attribute = 'Armor'
				value = {cellContents.attributes.Armor}
				currentValue = {cellContents.attributes.CurrentArmor === cellContents.attributes.Armor ? null : cellContents.attributes.CurrentArmor}
				singleLeftDisplay = {1}
				width = {274}
				/>
			</AttributeContainer>
			<br/>
			FIXED ATTRIBUTES:
			{comprehensiveStatsAdditive.map((attributeName, index)=>{
				if (attributeName === 'Durability' || attributeName === 'Capacitor' || attributeName === 'Armor' ||
				cellContents.attributes[attributeName] === 0) {
					return null
				} else
				return (
					<AttributeContainer key = {index}>
						<Attribute
						attribute = {attributeName}
						value = {cellContents.attributes[attributeName]}
						// singleLeftDisplay = {1}
						width = {274}
						/>
					</AttributeContainer>
				)
			})}
			<br/>

			{hasNon1Multiplier && 'DAMAGE & DAMAGE REDUCTION MULTIPLIERS:'}
			{comprehensiveStatsMultiplicative.map((attributeName, index)=>{
				return cellContents.attributes[attributeName] !== 1 && (
					<AttributeContainer key = {index}>
						<Attribute
						attribute = {attributeName}
						value = {cellContents.attributes[attributeName]}
						// singleLeftDisplay = {1}
						width = {274}
						/>
					</AttributeContainer>
				)
			})}
			{hasNon1Multiplier && <br/>}

			{cellContents.attributes.BurnAndCorrosionBoost && 
				<>
					STATUS BOOSTS:
					<AttributeContainer>
						<Command
						attribute = {'BurnAndCorrosionBoost'}
						value = {cellContents.attributes.BurnAndCorrosionBoost}
						excludesConfirmation = {1}
						width = {274}
						/>
					</AttributeContainer>
				<br/>
				</>
			}

			<br/>
			AVAILABLE COMMANDS:
			{comprehensiveStatsBool.map((commandName, index)=>{
				return (cellContents.attributes[commandName] && commandName !== 'BurnAndCorrosionBoost') && (
					<AttributeContainer key = {index}>
						<Command
						attribute = {commandName}
						value = {cellContents.attributes[commandName]}
						excludesConfirmation = {1}
						width = {274}
						animated = 'command200'
						/>
					</AttributeContainer>
				)
			})}
		</Wrapper>
  )
}

export default Attributes;
const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	margin-top: 15px;
	overflow-y: auto;
	font-size: 1.5em;
`
const AttributeContainer = styled.div`
	width: 274px;
	height: 50px;
`