import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import StyledIcon from '../../StyledIcon/StyledIcon';
// import {dice} from 'react-icons-kit/icomoon/dice';
import {u1F3B2 as dice} from 'react-icons-kit/noto_emoji_regular/u1F3B2'
import styled from 'styled-components';
import robotNameGen from '../../../Constants/robotNameGen';
import ModelChanger from './ModelChanger';
import ColorSelection from './ColorSelection';
import baseBotAttributes from '../../../Constants/attributes';

import { changeBotName } from '../../../Redux/actions';
import settings from '../../../Redux/reducers/settings-reducer';

const BotModel = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const colors = useSelector(getThemeColors);
	const botInfo = userInfo.botBuilds;

	if (!botInfo[botNumberSelected]) return (<></>)
  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			<h3>
				MODEL
			</h3>
			{/* {userInfo.availableBots.length > 1 && */}
				<ModelChanger
				botNumberSelected = {botNumberSelected}
				/>
			{/* } */}
			NAME
			<RowDivCenter
			className = 'centeredFlex'
			>
				<StyledInput
				colors = {colors}
				className = "centeredInput" 
				type="text" maxLength = "16" 
				value = {userInfo.botBuilds[botNumberSelected].name}
				onChange = {(ev)=>{
					dispatch(changeBotName(botNumberSelected, ev.target.value))}}
				/>
				<DiceDiv>
					<StyledIcon
					handleClick = {(ev)=>{
						dispatch(changeBotName(botNumberSelected, robotNameGen()))}}
					size = {14}
					padding = {2}
					icon = {dice}
					disabled = {settings.serverStatus === 'idle'}
    			/>
				</DiceDiv>
			</RowDivCenter>
			<br/>
			COLORS
			<ColorSelection
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			{baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].Description}
			<br/>
			<SpecialDiv>
				{baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].Special1}
			</SpecialDiv>
			<SpecialDiv>
				{baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].Special2}
			</SpecialDiv>
			<SpecialDiv>
				{baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].Special3}
			</SpecialDiv>
    </Wrapper>
  )
}
export default BotModel;

const Wrapper = styled.div`
	width: 252px;
`
const StyledInput = styled.input`
	background-color: ${props => props.colors.secondary};
	color: ${props => props.colors.textColor};
	height: 26px;
	&:hover {
		background-color: ${props => props.colors.hovered};
	}
	&:focus {
		outline-color: ${props => !props.disabled && props.colors.hoveredText};
	}
`
const RowDivCenter = styled.div`
	width: 100%;
	flex-direction: row;
	justify-content: center;
`
const DiceDiv = styled.div`
	width: 28px;
	height: 28px;
	position: relative;
	right: 40px;
	bottom: 5px;
`
const SpecialDiv = styled.div`
	margin-top: 10px;
	font-size: 0.8em;
`