import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import {xCircle} from 'react-icons-kit/feather/xCircle'

const StyledIcon = ( { handleClick, disabled, selected, children, icon, glowing, size, padding, absolute, id, rotation, hovered} ) => {
	const settings = useSelector((state) => state.settings);
	let colors = useSelector(getThemeColors);
	if (settings.currentUrl === 'settings') colors = settings.colorsTesting;
	if (settings.serverStatus !== 'idle') disabled = true;
	if (!handleClick) {
		handleClick = () => {}
	}
	if (!icon) {
		console.log('An icon was not properly passed down')
		icon = xCircle;
		colors.textColor = 'red';
	}
  return (
      <IconStylings
			id = {id}
      disabled = {disabled || null}
      onClick = {(ev)=> {!disabled && handleClick(ev)}}
      icon = {icon}
      selected = {selected}
      children = {children}
      size = {size || 30}
			colors = {colors}
			glowing = {glowing}
			padding = {padding}
			absolute = {absolute}
			rotation = {rotation}
			hovered = {hovered}
      >
        {children}
      </IconStylings>
  )
}
export default StyledIcon;

const IconStylings = styled(Icon)`
  padding: ${props => props.padding && `${props.padding}px`};
	padding-bottom: ${props => props.padding === 'mini' && '5px'};
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  color: ${props => !props.glowing && props.hovered ? props.colors.hoveredText : props.selected ? props.colors.textColor : props.colors.textColor};
	animation: ${props => props.glowing && '1s linear infinite alternate glowGift'};
  margin: 5px;
	transform: ${props => props.rotation && `rotate(${props.rotation}deg)`};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  text-align: center;
	opacity: ${props => props.disabled && 0.5};
  transition: color .75s, background-color .75s;
	background-color: ${props => props.hovered ? props.colors.hovered : props.selected ? props.colors.selected : props.colors.notSelected};
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => !props.disabled && props.selected ? props.selected : props.colors.hovered};
		color: ${props => !props.disabled && props.colors.hoveredText};
  }
	> i {
		text-align: center;
		justify-content: center;
		align-self: center;
	}
`