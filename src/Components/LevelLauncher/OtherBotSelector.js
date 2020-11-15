import React from 'react';
import styled from 'styled-components';
import StyledIcon from '../StyledIcon/StyledIcon';
import {arrowRight} from 'react-icons-kit/icomoon/arrowRight';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';
import Bot from '../Bots/Bot';
import bots from '../../Constants/botAis/bots';

const OtherBotSelector = ({ botNumberViewing, setBotNumberViewing, typeViewing, levelInfo }) => {
	if (!levelInfo) {
		return (
			<></>
		)
	}

	const handleRotateBot = (direction) => {
		if (direction === 'left') {
			if (botNumberViewing === 0) return;
			else setBotNumberViewing(botNumberViewing-1);
		}
		else if (direction === 'right'){
			if (botNumberViewing === levelInfo[typeViewing.toLowerCase()].length-1) return;
			else setBotNumberViewing(botNumberViewing+1);
		}
		else {
			console.log('unusual error in handleRotateBot function');
		}
	}
  return (
    <Wrapper>
			SELECT BUILD
			<RowDivSpace>
				<Bot
				alternativeBotSize = {40}
				model = {levelInfo[typeViewing.toLowerCase()][botNumberViewing-1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing-1].name].model}
				faded = {true}
				botColors = {levelInfo[typeViewing.toLowerCase()][botNumberViewing-1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing-1].name].colors}
				arm1 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing-1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing-1].name].arm1}
				arm2 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing-1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing-1].name].arm2}
				arm3 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing-1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing-1].name].arm3}
				arm1Angle = '-45'
				arm2Angle = '45'
				arm3Angle = '235'
				/>
				<StyledIcon
				handleClick = {()=>{handleRotateBot('left')}}
				padding = {5}
				icon = {arrowLeft}
				disabled = {botNumberViewing === 0}
      	/>
				<Bot
				alternativeBotSize = {70}
				model = {levelInfo[typeViewing.toLowerCase()][botNumberViewing] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing].name].model}
				botColors = {levelInfo[typeViewing.toLowerCase()][botNumberViewing] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing].name].colors}
				arm1 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing].name].arm1}
				arm2 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing].name].arm2}
				arm3 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing].name].arm3}
				arm1Angle = '-45'
				arm2Angle = '45'
				arm3Angle = '235'
				/>
				<StyledIcon
				handleClick = {()=>{handleRotateBot('right')}}
				padding = {5}
				icon = {arrowRight}
				disabled = {botNumberViewing === levelInfo[typeViewing.toLowerCase()].length-1 || levelInfo[typeViewing.toLowerCase()].length === 0}
    		/>
				<Bot
				alternativeBotSize = {40}
				model = {levelInfo[typeViewing.toLowerCase()][botNumberViewing+1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing+1].name].model}
				faded = {true}
				botColors = {levelInfo[typeViewing.toLowerCase()][botNumberViewing+1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing+1].name].colors}
				arm1 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing+1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing+1].name].arm1}
				arm2 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing+1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing+1].name].arm2}
				arm3 = {levelInfo[typeViewing.toLowerCase()][botNumberViewing+1] && bots[levelInfo[typeViewing.toLowerCase()][botNumberViewing+1].name].arm3}
				arm1Angle = '-45'
				arm2Angle = '45'
				arm3Angle = '235'
				/>
			</RowDivSpace>
    </Wrapper>
  )
}
export default OtherBotSelector;

const Wrapper = styled.div`
	width: 100%;
	height: 100px;
	display : flex;
	font-size: 16px;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: center;
`
const RowDivSpace = styled.div`
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	align-items: center;
`