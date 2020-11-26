import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import {chevronLeft} from 'react-icons-kit/feather/chevronLeft';
import {chevronRight} from 'react-icons-kit/feather/chevronRight';
import StyledIcon from '../../StyledIcon/StyledIcon';

const NodeSelector = ({ aiAndScripts, setAiAndScripts, activeNodeArray, setDeleteActive }) => {
	const userInfo = useSelector((state) => state.userInfo);
	if (!userInfo.botBuilds) {
		return (<></>)
	}
	function handleDecrementNodeNumber () {
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing[newAiAndScripts.viewing.length-1].index --;
		setAiAndScripts(newAiAndScripts);
		setDeleteActive(false);
	}
	function handleIncrementNodeNumber () {
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing[newAiAndScripts.viewing.length-1].index ++;
		setAiAndScripts(newAiAndScripts);
		setDeleteActive(false);
	}
  return (
    <Wrapper>
			<StyledIcon
			handleClick = {handleDecrementNodeNumber}
			padding = {5}
			icon = {chevronLeft}
			disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === 0}
			sfx = 'selected'
    	/>
			<span>
				NODE # {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index+1}
			</span>
			<StyledIcon
			handleClick = {handleIncrementNodeNumber}
			padding = {5}
			icon = {chevronRight}
			disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === activeNodeArray.length}
			sfx = 'selected'
    	/>
    </Wrapper>
  )
}
export default NodeSelector;
const Wrapper = styled.div`
	width: 250px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`