import React from 'react';
import { useSelector } from "react-redux";

import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import {starFull} from 'react-icons-kit/icomoon/starFull'

const Star = ({ color, animated, size }) => {
	const settings = useSelector((state) => state.settings);
			return (
			<StyledIcon
			navlocation = {settings.navLocation}
			icon = {starFull}
			size = {size || 40}
			color = {color}
			animated = {animated}
			/>
		)
}
export default Star;
const StyledIcon = styled(Icon)`
	position: ${props => props.animated ? 'absolute' : ''};
	height: ${props => props.size ? `${props.size}px` : '40px'};
  width: ${props => props.size ? `${props.size}px` : '40px'};
	color: ${props => props.color};
	z-index: 25;
	animation: ${props => props.animated ? props.navlocation === 'left' ? '3s ease-in 0s infinite alternate slideStarLeft;':'3s ease-in 0s infinite alternate slideStarUpRight;':''}
`