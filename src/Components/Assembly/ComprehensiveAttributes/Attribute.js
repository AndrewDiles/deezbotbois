import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import iconImporter from '../../../Constants/iconImporter';
import StyledIcon from '../../StyledIcon/StyledIcon';
import ToolTip from '../../ToolTip/ToolTip';
import {attributeInfo} from '../../../Constants/attributes';

const Attribute = ({ attribute, value, type }) => {
	const colors = useSelector(getThemeColors);
	const [icons, setIcons] = React.useState(null);
	const [toolTipToggle, setToolTipToggle] = React.useState(false);
	const [hovered, setHovered] = React.useState(false);

	useEffect(()=>{
		setIcons(iconImporter(attribute))
	},[attribute]);

	if (!icons) {
		return (<></>)
	}
	if (!attributeInfo[attribute])
	console.log(attributeInfo[attribute], 'due to', attribute)
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
				animated = {'command'}
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
					<StyledIcon
					icon = {icons.icon1}
					padding = {5}
					selected = {hovered}
					/>
					{icons.icon2 ? (
						<StyledIcon
						icon = {icons.icon2}
						padding = {5}
						selected = {hovered}
						/>
					) : (
						<Spacer/>
					)}
					<Spacer>
						<Value>
							{value}
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
	min-width: 40px;
	min-height: 40px;
	width: 40px;
	height: 40px;
	
	display: flex;
	align-items: center;
`
const Value = styled.p`
	margin: auto 0;
	/* margin: 0; */
	white-space: nowrap;
	text-align: left;
`