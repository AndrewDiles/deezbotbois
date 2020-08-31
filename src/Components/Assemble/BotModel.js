import React, { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import StyledIcon from '../StyledIcon/StyledIcon';
import {dice} from 'react-icons-kit/icomoon/dice';
import styled from 'styled-components';
import robotNameGen from '../../Constants/robotNameGen';
import ModelChanger from './ModelChanger';

import {
	changeBotColors,
	changeBotName,
	changeBotColorX,
} from '../../Redux/actions';
import settings from '../../Redux/reducers/settings-reducer';

const BotModel = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const colors = useSelector(getThemeColors);
	const botInfo = userInfo.botBuilds;
	// const [initialChange, setInitialChange] = React.useState(true);
	// const [name, setName] = useState(botInfo[botNumberSelected].name);

	// React.useEffect(()=>{
	// 	setInitialChange(true)
	// },[botNumberSelected])
	if (!botInfo[botNumberSelected]) return (<></>)
  return (
    <div
		className = "assemblyGridChild" 
		>
			NAME
			<RowDivCenter
			className = {'centeredFlex'}
			>
				{/* {botInfo[botNumberSelected] && */}
				<StyledInput
				colors = {colors}
				className = "centeredInput" 
				type="text" maxLength = "16" 
				value = {userInfo.botBuilds[botNumberSelected].name}
				onChange = {(ev)=>{
					// initialChange ? setInitialChange(false) :
					dispatch(changeBotName(botNumberSelected, ev.target.value))}}
				/>
				{/* } */}
				<DiceDiv>
					<StyledIcon
					handleClick = {(ev)=>{
						// initialChange ? setInitialChange(false) :
						dispatch(changeBotName(botNumberSelected, robotNameGen()))}}
					size = {14}
					padding = {2}
					icon = {dice}
					disabled = {settings.serverStatus === 'idle'}
    			/>
				</DiceDiv>
			</RowDivCenter>
			<br/>
			<ModelChanger
			botNumberSelected = {botNumberSelected}
			/>
    </div>
  )
}
export default BotModel;

const StyledInput = styled.input`
	background-color: ${props => props.colors.secondary};
	color: ${props => props.colors.textColor};
	height: 26px;
	&:hover {
		background-color: ${props => props.colors.hovered};
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