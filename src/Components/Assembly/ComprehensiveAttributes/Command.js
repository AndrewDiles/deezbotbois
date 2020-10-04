import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import iconImporter from '../../../Constants/iconImporter';
import StyledIcon from '../../StyledIcon/StyledIcon';
import ToolTip from '../../ToolTip/ToolTip';
import {commandInfo} from '../../../Constants/attributes';

// import {xCircle} from 'react-icons-kit/feather/xCircle';
import {xSquare} from 'react-icons-kit/feather/xSquare';
// import {x} from 'react-icons-kit/feather/x';
// import {checkCircle} from 'react-icons-kit/feather/checkCircle';
import {checkSquare} from 'react-icons-kit/feather/checkSquare';
// import {check} from 'react-icons-kit/feather/check';

const Command = ({ attribute, value }) => {
	const colors = useSelector(getThemeColors);
	const [icons, setIcons] = useState(null);
	const [toolTipToggle, setToolTipToggle] = useState(false);
	const [hovered, setHovered] = useState(false);

	useEffect(()=>{
		setIcons(iconImporter(attribute));
	},[attribute]);

	if (!icons) {
		return (<></>)
	}

	return (
		<CommandRow
		onClick = {e=>{setToolTipToggle(!toolTipToggle)}}
		colors = {colors}
		onMouseEnter = {()=>{setHovered(true);}}
		onMouseLeave = {()=>{setToolTipToggle(false);setHovered(false);}}
		value = {value}
		>
			{toolTipToggle ? (
				<ToolTip
				messageHovered = {toolTipToggle}
				setMessageHovered = {setToolTipToggle}
				// fontSize = '0.6em'
				width = '300'
				height = '50'
				animated = {'command'}
				>
					{commandInfo[attribute].indexOf(":") > 0 ? (
						<>
							<b>{commandInfo[attribute].slice(0,commandInfo[attribute].indexOf(":"))}</b>
							{/* {commandInfo[attribute].slice(2+commandInfo[attribute].indexOf(":"),commandInfo[attribute].length)} */}
						</>

					) : (
						commandInfo[attribute]
					)}
				</ToolTip>
			) : (
				<>
					<StyledIcon
					icon = {icons.icon1}
					padding = {5}
					selected = {hovered}
					/>
					<StyledIcon
					icon = {icons.icon2}
					padding = {5}
					selected = {hovered}
					/>
					{value ? (
						<StyledIcon
					icon = {checkSquare}
					padding = {5}
					selected = {hovered}
					/>
					) : (
					<StyledIcon
					icon = {xSquare}
					padding = {5}
					selected = {hovered}
					/>
					)}
				</>
			)}
		</CommandRow>
	)
}
export default Command;
const CommandRow = styled.div`
	justify-self: center;
	opacity: ${props => props.value === false && 0.5};
	width: 300px;
	height: 50px;
	transition: color .75s, background-color .75s;
	&:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => !props.disabled && props.colors.hovered};
		color: ${props => !props.disabled && props.colors.hoveredText};
  }
`