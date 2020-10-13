import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
import {chevronUp} from 'react-icons-kit/feather/chevronUp';
import StyledIcon from '../../StyledIcon/StyledIcon';
import NodeDisplay from './NodeDisplay';

const NodeSelector = ({ botNumberSelected, aiAndScripts, setAiAndScripts, activeNodeArray, setDeleteActive }) => {
	const userInfo = useSelector((state) => state.userInfo);
	// const [activeNodeArray, setActiveNodeArray] = React.useState([]);
	
	// React.useEffect(()=>{
	// 	if (!userInfo.botBuilds) return
	// 	setActiveNodeArray(getNodeArray(userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing ))
	// },[setActiveNodeArray, botNumberSelected, userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing])
	// console.log(activeNodeArray)
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
			icon = {chevronUp}
			rotation = '-90'
			disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === 0}
    	/>
			<span>
				NODE # {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index+1}
			</span>
			<StyledIcon
			handleClick = {handleIncrementNodeNumber}
			padding = {5}
			icon = {chevronUp}
			rotation = '90'
			disabled = {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === activeNodeArray.length}
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