import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

import StyledIcon from '../../StyledIcon/StyledIcon';
import {download} from 'react-icons-kit/icomoon/download'

import styled from 'styled-components';

const InsertionIcon = ({ aiAndScripts, setAiAndScripts }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
	function handleClick() {
		let newAiAndScript = {...aiAndScripts};
		if (newAiAndScript.insertion === newAiAndScript.viewing) {
			newAiAndScript.insertion = null
		} else {
			newAiAndScript.insertion = aiAndScripts.viewing;
		}
		setAiAndScripts(newAiAndScript)
	}
	// console.log('selected test:',aiAndScripts.viewing === aiAndScripts.insertion)
  return (
    <StyledIcon
		icon = {download}
		padding = '5'
		disabled = {aiAndScripts === null}
		selected = {aiAndScripts.viewing === aiAndScripts.insertion}
		rotation = '90'
		handleClick = {handleClick}
		/>
  )
}
export default InsertionIcon;