import React from 'react';
import { useSelector } from "react-redux";

import styled from 'styled-components';
import StyledIcon from '../StyledIcon/StyledIcon';
import {arrowRight} from 'react-icons-kit/icomoon/arrowRight';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';
import Bot from '../Bots/Bot';

const BotSelection = ({ setBotNumberSelected, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const botInfo = userInfo.botBuilds;

	const handleRotateBot = (direction) => {
		if (!userInfo.botBuilds) return;
		if (direction === 'left') {
			if (botNumberSelected === 0) return;
			else setBotNumberSelected(botNumberSelected-1);
		}
		else if (direction === 'right'){
			if (botNumberSelected === userInfo.botBuilds.length-1) return;
			else setBotNumberSelected(botNumberSelected+1);
		}
		else {
			console.log('unusual error in handleRotateBot function');
		}
	}
	if (!userInfo.botBuilds) {
		return (<></>)
	}
  return (
    <Wrapper>
			SELECT BUILD
			<RowDivSpace>
				<Bot
				alternativeBotSize = {40}
				model = {botInfo[botNumberSelected-1] && botInfo[botNumberSelected-1].model}
				faded = {true}
				/>
				<StyledIcon
				handleClick = {()=>{handleRotateBot('left')}}
				padding = {5}
				icon = {arrowLeft}
				disabled = {botNumberSelected === 0}
      	/>
				<Bot
				alternativeBotSize = {70}
				model = {botInfo[botNumberSelected] && botInfo[botNumberSelected].model}
				/>
				<StyledIcon
				handleClick = {()=>{handleRotateBot('right')}}
				// handleClick = {()=>{handleColorThemeClick(paleGreen)}}
				padding = {5}
				icon = {arrowRight}
				disabled = {botNumberSelected === userInfo.botBuilds.length-1}
    		/>
				<Bot
				alternativeBotSize = {40}
				faded = {true}
				model = {botInfo[botNumberSelected+1] && botInfo[botNumberSelected+1].model}
				/>
			</RowDivSpace>
    </Wrapper>
  )
}
export default BotSelection;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display : flex;
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