import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Bot from '../../Bots/Bot';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

const Description = ({ cellContents }) => {
	const colors = useSelector(getThemeColors);

	console.log('find arm angles?', cellContents)
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
					>
    		  	<label>NAME</label>
       			<div>
							{cellContents.name}
						</div>
    			</BotInfo>
					<BotInfo
					colors = {colors}
					>
    		  	<label>MODEL</label>
       			<div>
							{cellContents.model}
						</div>
    			</BotInfo>
				</div>
			</TopRow>
		</Wrapper>
  )
}

export default Description;
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
	>label{
		position:relative;
  	top:-5px;
  	left:-25%;
  	background-color: ${props => props.colors.primary};
		font-size: 0.6em;
	}
	>div{
		position: relative;
		font-size: 0.8em;
	}
`
const TopRow = styled.div`
	width: 100%;
	height: 70px;
	margin-top: 10px;
`