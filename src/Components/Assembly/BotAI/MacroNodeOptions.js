import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

import StyledIcon from '../../StyledIcon/StyledIcon';
import {moveUp} from 'react-icons-kit/icomoon/moveUp';
import {iosTrash} from 'react-icons-kit/ionicons/iosTrash';

import {replaceScript} from '../../../Redux/actions';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';



const MacroNodeOption = ({ activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const dispatch = useDispatch();
	const [deleteActive, setDeleteActive] = React.useState(false);

// Purpose of this component is to provide buttons to move the Node's array index, delete the Node and set the inserstion point

	function handleShiftLeft () {
		let temp = activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index];
		let newScript = [...botInfo[botNumberSelected].script];
		let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing);
		targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]] = targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]-1];
		targetNodeArray[[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]-1] = temp;
		dispatch(replaceScript(botNumberSelected, newScript));
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing[aiAndScripts.viewing.length-1].index --;
		setAiAndScripts(newAiAndScripts);
	}
	function handleShiftRight () {

	}
	function handleDelete () {

	}


	
  return (
    <Wrapper>
			<RowContainer>
				<IconWrapper>
					<StyledIcon
					handleClick = {handleShiftLeft}
					padding = {5}
					icon = {moveUp}
					rotation = '-90'
					disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === 0}
    			/>
				</IconWrapper>
				<IconWrapper>
					<StyledIcon
					handleClick = {()=>{setDeleteActive(!deleteActive)}}
					padding = {5}
					icon = {iosTrash}
    			/>
				</IconWrapper>
				<IconWrapper>
					<StyledIcon
					handleClick = {handleShiftRight}
					padding = {5}
					icon = {moveUp}
					rotation = '90'
					disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === activeNodeArray.length-1}
    			/>
				</IconWrapper>
			</RowContainer>
			<RowContainer>
				
			</RowContainer>
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
const Wrapper = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: column;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`
const IconWrapper = styled.div`
	height: 50px;
	width: 50px;
`