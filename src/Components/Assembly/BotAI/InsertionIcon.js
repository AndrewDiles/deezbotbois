import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

import StyledIcon from '../../StyledIcon/StyledIcon';
// import {download} from 'react-icons-kit/icomoon/download';
import {androidExit} from 'react-icons-kit/ionicons/androidExit';

import styled from 'styled-components';

const InsertionIcon = ({ aiAndScripts, setAiAndScripts }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
	function handleClick() {
		let newAiAndScript = {...aiAndScripts};
		if (newAiAndScript.insertion === true) {
			newAiAndScript.insertion = false
		} else {
			newAiAndScript.insertion = true;
		}
		setAiAndScripts(newAiAndScript)
	}
	// console.log('selected test:',aiAndScripts.viewing === aiAndScripts.insertion)
  return (
		<IconWrapper>
    	<StyledIcon
			icon = {androidExit}
			padding = '5'
			// disabled = {aiAndScripts === null}
			selected = {aiAndScripts.insertion === true}
			rotation = '180'
			handleClick = {handleClick}
			/>
		</IconWrapper>
  )
}
export default InsertionIcon;

const IconWrapper = styled.div`
	height: 50px;
	width: 50px;
`