import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import InsertionIcon from './InsertionIcon';
import DeleteNode from './DeleteNode';

// import StyledButton from '../../StyledButton/StyledButton';
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
	function handleConditionTrue () {
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing.push({type: 'conditionTrue', index: 0})
		setAiAndScripts(newAiAndScripts);
		setDeleteActive(false);
	}
	function handleConditionFalse () {
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing.push({type: 'conditionFalse', index: 0})
		setAiAndScripts(newAiAndScripts);
		setDeleteActive(false);
	}

	return deleteActive ? (
		<DeleteNode
		setDeleteActive = {setDeleteActive}
		activeNodeArray = {activeNodeArray}
		botNumberSelected = {botNumberSelected}
		aiAndScripts = {aiAndScripts}
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
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command &&
				<OptionsRow className ='evenlyFlex'>
					<IconContainer>
						<InsertionIcon
						aiAndScripts = {aiAndScripts}
						setAiAndScripts = {setAiAndScripts}
						/>
					</IconContainer>
				</OptionsRow>
			}
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition &&
				<OptionsRow className ='evenlyFlex'>
					<ButtonContainer case = {true}>
						<StyledDepthMovementButton
						// width = '90'
						onClick = {handleConditionTrue}
						colors = {colors}
						case = {true}
						>
							DEPTH +1
							CASE TRUE
						</StyledDepthMovementButton>
						{/* <ButtonColoration case = {true}>
							DEPTH +1
							CASE TRUE
						</ButtonColoration> */}
					</ButtonContainer>

					<IconContainer>
						<InsertionIcon
						aiAndScripts = {aiAndScripts}
						setAiAndScripts = {setAiAndScripts}
						/>
					</IconContainer>

					<ButtonContainer>
						<StyledDepthMovementButton
						// width = '90'
						onClick = {handleConditionFalse}
						colors = {colors}
						case = {false}
						>
							DEPTH +1
							CASE FALSE
						</StyledDepthMovementButton>
						{/* <ButtonColoration case = {false}>
							DEPTH +1
							CASE FALSE
						</ButtonColoration> */}
					</ButtonContainer>
				</OptionsRow>
			}

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
const OptionsRow = styled.div`
	width: 100%;
	height: 50px;
	padding: 0 5px;
`
const ButtonContainer = styled.div`
	width: 90px;
	height: 40px;
`
const ButtonColoration = styled.div`
	width: 90px;
	height: 40px;
	border-radius: 5px;
	font-size: 8px;
	white-space: pre-wrap;
	text-align: center;
	padding-top: 10px;
	position: relative;
	top: -40px;
	background-color: ${props => props.case ? 'rgba(0,255,0,0.4);' : 'rgba(255,0,0,0.4);'};
`
const StyledDepthMovementButton = styled.button`
	width: 90px;
	height: 40px;
	border-radius: 5px;
	font-size: 8px;
	color: ${props => props.colors.textColor};
	white-space: pre-wrap;
	text-align: center;
	padding: 4px 0 0 0;
	margin: 0;
	border: 1px solid transparent;
  font-weight: 500;
  font-family: 'Press Start 2P', cursive;
	transition: color .75s, background-color .75s;
	background-color: ${props => props.case ? 'rgba(0,255,0,0.2);' : 'rgba(255,0,0,0.2);'};
  &:hover {
    cursor: pointer;
    background-color: ${props => props.selected ? props.selected : props.colors.hovered};
    color: ${props => props.colors.hoveredText};
		background-color: ${props => props.case ? 'rgba(0,255,0,0.4);' : 'rgba(255,0,0,0.4);'};
  }
	&:focus {
		outline-color: ${props => props.colors.hoveredText};
		color: ${props => props.colors.hoveredText};
		background-color: ${props => props.case ? 'rgba(0,255,0,0.4);' : 'rgba(255,0,0,0.4);'};
	}
`