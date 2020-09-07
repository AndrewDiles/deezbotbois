import React, { useState } from 'react';
import styled from 'styled-components';

import StyledIcon from '../StyledIcon/StyledIcon';
import ToolTip from './ToolTip';
import {attributeInfo} from '../../Constants/attributes';

const ToolTipIcon = ({ name, iconImport, selfLocation, animated }) => {
	const [messageHovered, setMessageHovered] = useState(false);

	React.useEffect(()=>{
		let targetIcon = document.getElementById(`${name}Icon`);
		let onMouseEnter = (ev) => {
			// Below test will prevent multiple ToolTips pooping up by triggering mouseenter through divs
			if (ev.target === targetIcon) setMessageHovered(true);
		}
		// let onMouseLeave = (ev) => {
		// 	console.log('ev.target',ev.target,attributeInfo[name])
		// 	if (ev.target.id !== attributeInfo[name]) setMessageHovered(false)
		// }
		// if (messageHovered) {
		// 	document.getElementById('root').addEventListener('mousemove', onMouseLeave);
		// }
			const closeWindow = () => {
				if (messageHovered) setMessageHovered(false);
			}
		if (messageHovered) {
			setTimeout(closeWindow,7500)
		}
		if (targetIcon) {
			targetIcon.addEventListener('mouseenter',onMouseEnter);
			// targetIcon.addEventListener('mouseleave',onMouseLeave);
		}
		return ()=>{
			if (!targetIcon) return;
			targetIcon.removeEventListener('mouseenter',onMouseEnter);
			// document.getElementById('root').removeEventListener('mousemove', onMouseLeave);
			// targetIcon.removeEventListener('mouseleave',onMouseLeave);
    }
	},[name, messageHovered]);

	return (
			messageHovered ? (
				<ToolTip
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				fontSize = '0.6em'
				selfLocation = {selfLocation}
				animated = {animated}
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