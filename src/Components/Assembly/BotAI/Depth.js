import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import {moveUp} from 'react-icons-kit/icomoon/moveUp';
import {chevronUp} from 'react-icons-kit/feather/chevronUp';
import StyledIcon from '../../StyledIcon/StyledIcon';

const Depth = ({ aiAndScripts, setAiAndScripts, setDeleteActive }) => {
	const userInfo = useSelector((state) => state.userInfo);
	
	if (!userInfo.botBuilds) {
		return (<></>)
	}
	function handleDecrementDepthLevel () {
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing.pop();
		setAiAndScripts(newAiAndScripts);
		setDeleteActive(false);
	}
	// console.log({aiAndScripts})
  return (
    <Wrapper>
			<Spacer/>
			<span>
				DEPTH LV {aiAndScripts.viewing.length}
			</span>
			<StyledIcon
			handleClick = {handleDecrementDepthLevel}
			padding = {5}
			icon = {chevronUp}
			disabled = {aiAndScripts.viewing.length === 1}
			sfx = 'confirm'
    	/>
    </Wrapper>
  )
}
export default Depth;
const Spacer = styled.div`
	width: 50px;
	height: 50px;
`
const Wrapper = styled.div`
	width: 250px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`