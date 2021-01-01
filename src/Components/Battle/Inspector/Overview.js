import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Bot from '../../Bots/Bot';
import StyledButton from '../../StyledButton/StyledButton';
import SwitchIcon from './SwitchIcon';
import Weapons from './Weapons';
import Accessories from './Accessories';
import baseBotAttributes from '../../../Constants/attributes';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

const Overview = ({ cellContents }) => {
	const colors = useSelector(getThemeColors);
	const [equipmentViewing, setEquipmentViewing] = React.useState('weapons'); 

  return (
    <Wrapper className = 'startFlex col'>
			<TopRow className = 'evenlyFlex'>
				<Bot
				alternativeBotSize = {70}
				model = {cellContents.model}
				botColors ={cellContents.colors}
				arm1 = {cellContents.equipment.arm1}
				arm2 = {cellContents.equipment.arm2}
				arm3 = {cellContents.equipment.arm3}
				arm1Angle = {cellContents.arm1Angle}
				arm2Angle = {cellContents.arm2Angle}
				arm3Angle = {cellContents.arm3Angle}
				/>
				<div>
					<BotInfo
					colors = {colors}
					length = {cellContents.name.length}
					>
    		  	<label>NAME</label>
       			<BotText
						 className = 'centeredFlex'
						 >
							{cellContents.name}
						</BotText>
    			</BotInfo>
					<BotInfo
					colors = {colors}
					length = {baseBotAttributes[cellContents.model].Name.length}
					>
    		  	<label>MODEL</label>
						<BotText
						className = 'centeredFlex'
						>
							{baseBotAttributes[cellContents.model].Name.toUpperCase()}
						</BotText>
    			</BotInfo>
				</div>
			</TopRow>

			{/* INSERT ROWS OF DURABILITY AND CAPACITOR HERE */}
			
			<Row className = 'centeredFlex'>
				<StyledButton
				fontSize = {10}
				width = {137}
				handleClick = {()=>{setEquipmentViewing('weapons')}}
				selected = {equipmentViewing === 'weapons'}
				sfx = {equipmentViewing === 'weapons' ? 'disabled' : 'toggle'}
				>
					WEAPONS
				</StyledButton>
				<StyledButton
				fontSize = {10}
				width = {137}
				handleClick = {()=>{setEquipmentViewing('accessories')}}
				selected = {equipmentViewing === 'accessories'}
				sfx = {equipmentViewing === 'accessories' ? 'disabled' : 'toggle'}
				>
					ACCESSORIES
				</StyledButton>
			</Row>
			{equipmentViewing === 'weapons' ? (
				<Weapons cellContents = {cellContents}/>
			):(
				<Accessories cellContents = {cellContents}/>
			)}
			SWITCHES:
			<Row className = 'evenlyFlex'>
				{[1,2,3,4,5].map((switchNumber)=>{
					return (
						<SwitchIcon
						key = {switchNumber}
						switchNumber = {switchNumber}
						value = {cellContents.switches[switchNumber]}
						/>
					)
				})}
			</Row>
		</Wrapper>
  )
}

export default Overview;
const BotText = styled.div`
	width: 150px;
`
const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`
const BotInfo = styled.div`
	width: 150px;
	height: 35px;
	border: ${props => `3px solid ${props.colors.secondary}`};
	border-radius: 5px;
	margin: 5px 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	text-align: center;
	>label{
		position:relative;
  	top:-5px;
		justify-self: start;
  	left: 5px;
  	background-color: ${props => props.colors.primary};
		font-size: 8px;
	}
	>div{
		position: relative;
		top: -2px;
	font-size: ${props => props.length > 11 ? '10px' : '12px'};
	}
`
const TopRow = styled.div`
	width: 100%;
	height: 70px;
	margin-top: 15px;
`
const Row = styled.div`
	margin-top: 15px;
`