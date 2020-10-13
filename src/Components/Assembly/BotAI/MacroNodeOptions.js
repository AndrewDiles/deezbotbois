import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import InsertionIcon from './InsertionIcon';
import DeleteNode from './DeleteNode';

import StyledIcon from '../../StyledIcon/StyledIcon';
import {moveUp} from 'react-icons-kit/icomoon/moveUp';
import {moveDown} from 'react-icons-kit/icomoon/moveDown';
import {iosTrash} from 'react-icons-kit/ionicons/iosTrash';

import {replaceScript} from '../../../Redux/actions';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';



const MacroNodeOption = ({ activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts, setDeleteActive, deleteActive }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	let colors = useSelector(getThemeColors);
	const dispatch = useDispatch();

// Purpose of this component is to provide buttons to move the Node's array index, delete the Node and set the inserstion point
	console.log({activeNodeArray})
	function handleShiftLeft () {
		let temp = {...activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]};
		let newScript = [...botInfo[botNumberSelected].script];
		let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing);
		targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]] = targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index-1]];
		targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index-1]] = temp;
		dispatch(replaceScript(botNumberSelected, newScript));
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing[aiAndScripts.viewing.length-1].index --;
		setAiAndScripts(newAiAndScripts);
		setDeleteActive(false);
	}
	function handleShiftRight () {
		let temp = {...activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]};
		let newScript = [...botInfo[botNumberSelected].script];
		let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing);
		targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]] = targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index+1]];
		targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index+1]] = temp;
		dispatch(replaceScript(botNumberSelected, newScript));
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing[aiAndScripts.viewing.length-1].index ++;
		setAiAndScripts(newAiAndScripts);
		setDeleteActive(false);
	}
	
	return deleteActive ? (
		<DeleteNode
		setDeleteActive = {setDeleteActive}
		activeNodeArray = {activeNodeArray}
		botNumberSelected = {botNumberSelected}
		aiAndScripts = {aiAndScripts}
		setAiAndScripts = {setAiAndScripts}
		/>
	) : (
    <Wrapper>
			<RowContainer>
				<IconContainer>
					<StyledIcon
					handleClick = {handleShiftLeft}
					padding = {5}
					icon = {moveUp}
					rotation = '-90'
					disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === 0}
    			/>
				</IconContainer>
				<IconContainer>
					<StyledIcon
					handleClick = {()=>{setDeleteActive(!deleteActive)}}
					padding = {5}
					icon = {iosTrash}
    			/>
				</IconContainer>
				<IconContainer>
					<StyledIcon
					handleClick = {handleShiftRight}
					padding = {5}
					icon = {moveDown}
					rotation = '-90'
					disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === activeNodeArray.length-1}
    			/>
				</IconContainer>
			</RowContainer>
			{aiAndScripts.insertion ? (
				<InsertionMessageContainer
				set = {true}
				colors = {colors}
				>
					NODE OPTION TYPE 
					<br/>
					WILL BE CHANGED
				</InsertionMessageContainer>
			) : (
				<InsertionMessageContainer
				colors = {colors}
				>
					SET INSERTION POINT
				</InsertionMessageContainer>
			)}
				
			<IconRow>
				<IconContainer>
					<InsertionIcon
					aiAndScripts = {aiAndScripts}
					setAiAndScripts = {setAiAndScripts}
					/>
				</IconContainer>
			</IconRow>
    </Wrapper>
  )
}
export default MacroNodeOption;
const RowContainer = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-between;
`
const InsertionMessageContainer = styled.p`
	width: 100%;
	height: 35px;
	font-size: 1.0em;
	margin: ${props => props.set ? '3px 0 0 0': '0px'};
	padding-top: ${props => !props.set && '22px'};
	color: ${props => props.set && props.colors.hoveredText};
	vertical-align: bottom;
`
const Wrapper = styled.div`
	width: 100%;
	height: 135px;
	display: flex;
	flex-direction: column;
	justify-content: column;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`
const IconContainer = styled.div`
	height: 50px;
	width: 50px;
`
const IconRow = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
`