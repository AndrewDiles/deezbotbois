import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { changeBotModel, resetTechTree } from '../../../Redux/actions';

import styled from 'styled-components';
import StyledIcon from '../../StyledIcon/StyledIcon';
import {arrowRight} from 'react-icons-kit/icomoon/arrowRight';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';
import Bot from '../../Bots/Bot';
import baseBotAttributes from '../../../Constants/attributes';


const ModelChanger = ({ botNumberSelected }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const [indexOfSelectedModel, setIndexOfSelectedModel] = useState(
		userInfo.availableBots.indexOf(userInfo.botBuilds[botNumberSelected].model)); 
	
	useEffect(()=>{
		setIndexOfSelectedModel(userInfo.availableBots.indexOf(userInfo.botBuilds[botNumberSelected].model))
	},[botNumberSelected])
	
	const handleSwapModel = (direction) => {
		if (direction === 'left') {
			if (indexOfSelectedModel === 0) return;
			else {
				// need to verify and remove excess arms and acc
				dispatch(changeBotModel(
					botNumberSelected, 
					userInfo.availableBots[indexOfSelectedModel-1],
					baseBotAttributes[userInfo.availableBots[indexOfSelectedModel-1]].WeaponSlots,
					baseBotAttributes[userInfo.availableBots[indexOfSelectedModel-1]].AccessorySlots,
				));
				setIndexOfSelectedModel(indexOfSelectedModel-1);
				dispatch(resetTechTree(botNumberSelected));
			}
		}
		else if (direction === 'right'){
			if (indexOfSelectedModel === userInfo.availableBots.length-1) return;
			else {
				dispatch(changeBotModel(
					botNumberSelected,
					userInfo.availableBots[indexOfSelectedModel+1],
					baseBotAttributes[userInfo.availableBots[indexOfSelectedModel+1]].WeaponSlots,
					baseBotAttributes[userInfo.availableBots[indexOfSelectedModel+1]].AccessorySlots,
				));
				setIndexOfSelectedModel(indexOfSelectedModel+1);
				dispatch(resetTechTree(botNumberSelected));
			}
		}
		else {
			console.log('unusual error in handleSwapModel function');
		}
	}
	if (!userInfo.botBuilds) {
		return (<></>)
	}
	let colorsToSendToBotComponent = null;
	if (botNumberSelected !== null) {
		colorsToSendToBotComponent = userInfo.botBuilds[botNumberSelected].colors;
	}
	if (userInfo.availableBots.length === 1) {
		return (
			<Wrapper>
				{baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].Name}
				<RowDivSpace
				justifyContent = 'center'
				>
					<Bot
					alternativeBotSize = {70}
					model = {userInfo.botBuilds[botNumberSelected].model}
					arm1 = {userInfo.botBuilds[botNumberSelected].equipment.arm1}
					arm2 = {userInfo.botBuilds[botNumberSelected].equipment.arm2}
					arm3 = {userInfo.botBuilds[botNumberSelected].equipment.arm3}
					arm1Angle = '-45'
					arm2Angle = '45'
					arm3Angle = '235'
					botColors ={colorsToSendToBotComponent}
					/>
				</RowDivSpace>
			</Wrapper>
		)
	}
  return (
    <Wrapper>
			CHANGE MODEL
			<br/>
			{baseBotAttributes[userInfo.botBuilds[botNumberSelected].model].Name}
			<RowDivSpace
			justifyContent = 'space-between'
			>
				<Bot
				alternativeBotSize = {40}
				model = {userInfo.availableBots[indexOfSelectedModel-1]}
				botColors ={colorsToSendToBotComponent}
				faded = {true}
				/>
				<StyledIcon
				handleClick = {()=>{handleSwapModel('left')}}
				padding = {5}
				icon = {arrowLeft}
				disabled = {indexOfSelectedModel === 0}
      	/>
				<Bot
				alternativeBotSize = {70}
				model = {userInfo.botBuilds[botNumberSelected].model}
				arm1 = {userInfo.botBuilds[botNumberSelected].equipment.arm1}
				arm2 = {userInfo.botBuilds[botNumberSelected].equipment.arm2}
				arm3 = {userInfo.botBuilds[botNumberSelected].equipment.arm3}
				arm1Angle = '-45'
				arm2Angle = '45'
				arm3Angle = '235'
				botColors ={colorsToSendToBotComponent}
				/>
				<StyledIcon
				handleClick = {()=>{handleSwapModel('right')}}
				padding = {5}
				icon = {arrowRight}
				disabled = {indexOfSelectedModel === userInfo.availableBots.length-1}
    		/>
				<Bot
				alternativeBotSize = {40}
				faded = {true}
				model = {userInfo.availableBots[indexOfSelectedModel+1]}
				botColors ={colorsToSendToBotComponent}
				/>
			</RowDivSpace>
    </Wrapper>
  )
}
export default ModelChanger;

const Wrapper = styled.div`
	width: 100%;
	height: 125px;
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
	justify-content: ${props => props.justifyContent};
	align-content: center;
	align-items: center;
`