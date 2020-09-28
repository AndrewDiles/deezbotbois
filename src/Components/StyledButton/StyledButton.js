import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const StyledButton = ( { id, handleClick, disabled, selected, absolute, colorSampling, width, fontSize, children} ) => {
	let colors = useSelector(getThemeColors);
	const settings = useSelector((state) => state.settings);
	if (settings.serverStatus !== 'idle') disabled = true;
	if (settings.currentUrl === 'settings') colors = settings.colorsTesting;
	if (colorSampling) colors = colorSampling;
	
  
  if (handleClick === undefined || handleClick === null) {
    handleClick = () => {
      // console.log('clicked styled button without a handle click function')
    }
  }
  return (
      <ButtonStylings
			id = {id}
      disabled = {disabled || null}
      onClick = {(ev)=> {handleClick(ev)}}
      selected = {selected}
      children = {children}
			colors = {colors}
			absolute = {absolute}
			width = {width}
			fontSize = {fontSize}
      >
        {children}
      </ButtonStylings>
  )
}
export default StyledButton;

const ButtonStylings = styled.button`
  width: ${props=>props.width ? `${props.width}px` : '125px'};
	min-height: 40px;
  /* padding: 5px; */
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  background-color: ${props => props.selected ? props.colors.selected : props.colors.notSelected};
  /* margin: 5px; */
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: ${props=>props.fontSize ? `${props.fontSize}px` : '12px'};
  font-weight: 500;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  color: ${props => props.colors.textColor};
	opacity: ${props => props.disabled && 0.5};
  transition: color .75s, background-color .75s;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => !props.disabled && props.selected ? props.selected : props.colors.hovered};
    color: ${props => !props.disabled && props.colors.hoveredText};
  }
	&:focus {
		/* -webkit-appearance:none; */
		outline-color: ${props => !props.disabled && props.colors.hoveredText};
	}
`