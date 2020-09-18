import React, { useState } from 'react';
import styled from 'styled-components';

import StyledIcon from '../StyledIcon/StyledIcon';
import ToolTip from './ToolTip';
import {attributeInfo} from '../../Constants/attributes';

const ToolTipIcon = ({ name, iconImport, selfLocation, animated }) => {
	const [messageHovered, setMessageHovered] = useState(false);

	// React.useEffect(()=>{
	// 	let targetIcon = document.getElementById(`${name}Icon`);
	// 	let onMouseEnter = (ev) => {
	// 		// Below test will prevent multiple ToolTips pooping up by triggering mouseenter through divs
	// 		if (ev.target === targetIcon) setMessageHovered(true);
	// 	}
	// 	// let onMouseLeave = (ev) => {
	// 		// console.log('ev.target',ev.target,attributeInfo[name])
	// 		// if (ev.target.id !== attributeInfo[name]) {
	// 			// setMessageHovered(false)
	// 		// }
	// 	// }
	// 	// if (messageHovered) {
	// 	// 	document.getElementById('root').addEventListener('mousemove', onMouseLeave);
	// 	// }
	// 		// const closeWindow = () => {
	// 		// 	if (messageHovered) setMessageHovered(false);
	// 		// }
	// 	// if (messageHovered) {
	// 	// 	setTimeout(closeWindow,5000)
	// 	// }
	// 	if (targetIcon) {
	// 		targetIcon.addEventListener('mouseenter',onMouseEnter);
	// 		// targetIcon.addEventListener('mouseleave',onMouseLeave);
	// 	}
	// 	return ()=>{
	// 		if (!targetIcon) return;
	// 		targetIcon.removeEventListener('mouseenter',onMouseEnter);
	// 		// targetIcon.removeEventListener('mouseleave',onMouseLeave);
	// 		// document.getElementById('root').removeEventListener('mousemove', onMouseLeave);
  //   }
	// },[name, messageHovered]);

	const handleClick = () => {
		setMessageHovered(!messageHovered);
	}
	return (
			messageHovered ? (
				<ToolTip
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				fontSize = '0.55em'
				selfLocation = {selfLocation}
				animated = {animated}
				height = '37'
				>
					{attributeInfo[name].indexOf(":") > 0 ? (
						<>
							<b>{attributeInfo[name].slice(0,attributeInfo[name].indexOf(":"))}</b>
							{attributeInfo[name].slice(2+attributeInfo[name].indexOf(":"),attributeInfo[name].length)}
						</>

					) : (
						attributeInfo[name]
					)}
					
				</ToolTip>
			):(
				<StyledIcon
				id = {`${name}Icon`}
				icon = {iconImport}
				size = {15}
				padding = 'mini'
				handleClick = {handleClick}
				/>
			)
	)
}
export default ToolTipIcon