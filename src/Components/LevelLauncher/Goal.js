import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import StyledIcon from '../StyledIcon/StyledIcon';
import achievementIconImporter from './achievementIconImporter';
import goalsInfo from '../../Constants/levels/goalsInfo';
import AccessoryInventoryItem from '../Assembly/BotEquipment/AccessoryInventoryItem';
import WeaponInventoryItem from '../Assembly/BotEquipment/WeaponInventoryItem';
import Bot from '../Bots/Bot';
import { botColorSchemes } from '../../Constants/colorSchemes';

const Goal = ({ goalInfo, met }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [viewingRewards, setViewingRewards] = React.useState(false);
	
	function copyAndAddColor (type, color) {
		let colorsToSend = {...botColorSchemes.defaultBotColors}
		colorsToSend[type] = color;
		return colorsToSend;
	}
  return (
		<GoalWrapper className = 'evenlyFlex'>
			<StyledIcon
			icon = {achievementIconImporter(goalInfo.type)}
			size = {40}
			selected = {met}
			padding = {5}
			handleClick = {()=>{setViewingRewards(!viewingRewards)}}
			/>
			<InfoContainer className = 'evenlyFlex col'>
				<Label
				obtained = {met}
				color = {colors.hoveredText}
				>
					{viewingRewards ? `REWARD: ${Object.keys(goalInfo.reward)[0].toUpperCase()}` : goalInfo.type}
				</Label>
				{viewingRewards ? (
					<Details>
						{goalInfo.reward.equipment && goalInfo.reward.equipment.acc &&
							<AccessoryInventoryItem
							accessory = {goalInfo.reward.equipment.acc}
							equipmentStaging = {{}}
							setEquipmentStaging = {()=>{}}
							botNumberSelected = {0}
							alreadyEquipped = {0}
							setMessageDisplayed = {()=>{}}
							altBaseSize = {220}
							/>
						}
						{goalInfo.reward.equipment && goalInfo.reward.equipment.arm &&
							<WeaponInventoryItem
							weapon = {goalInfo.reward.equipment.arm}
							equipmentStaging = {{}}
							setEquipmentStaging = {()=>{}}
							botNumberSelected = {0}
							alreadyEquipped = {0}
							setMessageDisplayed = {()=>{}}
							altBaseSize = {220}
							/>
						}
						{goalInfo.reward.color &&
							<ColorReward className = 'evenlyFlex'>
								{Object.keys(goalInfo.reward.color)[0]}
								<Bot
								alternativeBotSize = {60}
								model = {'BotSpikey'}
								botColors = {'default'}
								arm1 = 'Sword1'
        				arm2 = 'Gun1'
        				arm1Angle = {-45}
        				arm2Angle = {135}
								/>
								<Bot
								alternativeBotSize = {60}
								model = {'BotSpikey'}
								botColors = {copyAndAddColor(Object.keys(goalInfo.reward.color)[0],goalInfo.reward.color[Object.keys(goalInfo.reward.color)[0]])}
								arm1 = 'Sword1'
        				arm2 = 'Gun1'
        				arm1Angle = {-45}
        				arm2Angle = {135}
								/>
							</ColorReward>
						}
					</Details>
				) : (
					<Details className = 'endFlex'>
					REQUIREMENTS: 
					{goalsInfo.requirements.pre[goalInfo.type.replace(/\s/g,'')]}
					{goalInfo.threshold}
					{goalsInfo.requirements.post[goalInfo.type.replace(/\s/g,'')]}
					{/* string function taken from: http://biostall.com/removing-all-spaces-from-a-string-using-javascript/ */}
					</Details>
				)}
			</InfoContainer>
		</GoalWrapper>
  )
}

export default Goal;
const GoalWrapper = styled.div`
	width: 100%;
	height: 60px;
	margin-bottom: 5px;
`
const InfoContainer = styled.div`
	width: 250px;
	height: 100%;
`
const Details = styled.div`
	width: 100%;
	height: 75%;
	font-size: 0.6em;
	animation: .5s ease-out 1 expandY;
`
const Label = styled.div`
	width: 100%;
	height: 25%;
	font-size: 0.9em;
	color: ${props => props.obtained && props.color};
	font-weight: ${props => props.obtained && 900};
`
const ColorReward = styled.div`
	position: relative;
	top: -15px;
`