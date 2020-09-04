import React, { useState } from 'react';
import styled from 'styled-components';

import StyledIcon from '../StyledIcon/StyledIcon';
import ToolTip from './ToolTip';
import {attributeInfo} from '../../Constants/attributes';

const ToolTipIcon = ({ name, iconImport}) => {
	const [messageHovered, setMessageHovered] = useState(false);

	React.useEffect(()=>{
		let targetIcon = document.getElementById(`${name}Icon`);
		let onMouseEnter = (ev) => {
			// Below test will prevent multiple ToolTips pooping up by triggering mouseenter through divs
			if (ev.target === targetIcon) setMessageHovered(true);
		}
		// let onMouseLeave = () => {
		// 	setMessageHovered(false)
		// }
		if (targetIcon) {
			targetIcon.addEventListener('mouseenter',onMouseEnter);
			// targetIcon.addEventListener('mouseleave',onMouseLeave);
		}
		return ()=>{
			if (!targetIcon) return;
			targetIcon.removeEventListener('mouseenter',onMouseEnter);
			// targetIcon.removeEventListener('mouseleave',onMouseLeave);
    }
	},[name, messageHovered]);

	return (
			messageHovered ? (
				<ToolTip
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				fontSize = '0.6em'
				>
					{attributeInfo[name]}
				</ToolTip>
			):(
				<StyledIcon
				id = {`${name}Icon`}
				icon = {iconImport}
				size = {15}
				/>
			)
	)
}
export default ToolTipIcon