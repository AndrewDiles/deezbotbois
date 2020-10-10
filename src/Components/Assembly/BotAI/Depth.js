import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import {moveUp} from 'react-icons-kit/icomoon/moveUp';
import StyledIcon from '../../StyledIcon/StyledIcon';

const Depth = ({ aiAndScripts, setAiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	
	if (!userInfo.botBuilds) {
		return (<></>)
	}
	function handleDecrementDepthLevel () {
		let newAiAndScripts = {...aiAndScripts};
		newAiAndScripts.viewing = newAiAndScripts.viewing.pop();
		setAiAndScripts(newAiAndScripts);
	}
  return (
    <Wrapper>
			<Spacer/>
			<span>
				DEPTH LV {aiAndScripts.viewing.length}
			</span>
			<StyledIcon
			handleClick = {handleDecrementDepthLevel}
			padding = {5}
			icon = {moveUp}
			disabled = {aiAndScripts.viewing.length === 1}
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