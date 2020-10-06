import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import iconImporter from '../../../Constants/iconImporter';
import StyledIcon from '../../StyledIcon/StyledIcon';
import ToolTip from '../../ToolTip/ToolTip';
import {attributeInfo} from '../../../Constants/attributes';

const Attribute = ({ attribute, value }) => {
	const colors = useSelector(getThemeColors);
	const [icons, setIcons] = useState(null);
	const [toolTipToggle, setToolTipToggle] = useState(false);
	const [hovered, setHovered] = useState(false);

	useEffect(()=>{
		setIcons(iconImporter(attribute))
	},[attribute]);

	if (!icons) {
		return (<></>)
	}
  return (
    <AttributeRow
		className = 'centeredFlex'
		onClick = {e=>{setToolTipToggle(!toolTipToggle)}}
		colors = {colors}
		onMouseEnter = {()=>{setHovered(true);}}
		onMouseLeave = {()=>{setToolTipToggle(false);setHovered(false);}}
		>
			{toolTipToggle ? (
				<ToolTip
				messageHovered = {toolTipToggle}
				setMessageHovered = {setToolTipToggle}
				// fontSize = '0.6em'
				width = '300'
				height = '50'
				animated = {'command300'}
				>
					{attributeInfo[attribute].indexOf(":") > 0 ? (
						<>
							<b>{attributeInfo[attribute].slice(0,attributeInfo[attribute].indexOf(":"))}</b>
							{/* {attributeInfo[attribute].slice(2+attributeInfo[attribute].indexOf(":"),attributeInfo[attribute].length)} */}
						</>
					) : (
						attributeInfo[attribute]
					)}
				</ToolTip>
			) : (
				<AttributeContents 
				// className = 'centeredFlex'
				>
					{icons.icon2 ? (
						<StyledIcon
						icon = {icons.icon1}
						padding = {5}
						selected = {hovered}
						/>
					) : (
						<Spacer/>
					)}
					{icons.icon2 ? (
						<StyledIcon
						icon = {icons.icon2}
						padding = {5}
						selected = {hovered}
						/>
					) : (
						<StyledIcon
						icon = {icons.icon1}
						padding = {5}
						selected = {hovered}
						/>
					)}
					<Spacer>
						<Value>
							{value % 1 === 0 ? value : value.toFixed(2)}
						</Value>
					</Spacer>
				</AttributeContents>
			)}
    </AttributeRow>
  )
}
export default Attribute;
const AttributeRow = styled.div`
	justify-self: center;
	width: 300px;
	height: 50px;
	transition: color .75s, background-color .75s;
	&:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => !props.disabled && props.colors.hovered};
		color: ${props => !props.disabled && props.colors.hoveredText};
`
const AttributeContents = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	width: 150px;
	height: 50px;
	margin: 0, 5px;
`
const Spacer = styled.div`
	min-width: 50px;
	min-height: 50px;
	width: 50px;
	height: 50px;
	padding-left: 20px;
	display: flex;
	align-items: center;
`
const Value = styled.p`
	margin: auto 0;
	/* margin: 0; */
	white-space: nowrap;
	text-align: left;
`