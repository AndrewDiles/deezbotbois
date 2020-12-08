import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import { playSFX } from '../../Redux/actions';

const StyledButton = ( { sfx, id, handleClick, disabled, selected, absolute, colorSampling, width, maxHeight, minHeight, fontSize, children, value} ) => {
	const dispatch = useDispatch();
	let colors = useSelector(getThemeColors);
	const settings = useSelector((state) => state.settings);
	if (settings.serverStatus !== 'idle') disabled = true;
	if (settings.currentUrl === 'settings') colors = settings.colorsTesting;
	if (colorSampling) colors = colorSampling;
	
  if (handleClick === undefined || handleClick === null) {
    handleClick = () => {
			console.log('clicked styled button without a handle click function');
    }
	} 
	
  return (
      <ButtonStylings
			id = {id}
			className = 'baseButtonStyles'
      disabled = {disabled || null}
      onClick={ disabled ? sfx ? ()=>{dispatch(playSFX('disabled'))} : ()=>{}
				: sfx ? (ev)=>{handleClick(ev);dispatch(playSFX(sfx))} : (ev)=>{handleClick(ev)}
      }
      selected = {selected}
      children = {children}
			colors = {colors}
			absolute = {absolute}
			width = {width}
			fontSize = {fontSize}
			maxHeight = {maxHeight}
			minHeight = {minHeight}
			value = {value}
      >
        {children}
      </ButtonStylings>
  )
}
export default StyledButton;

const ButtonStylings = styled.button`
  width: ${props=>props.width ? `${props.width}px` : '125px'};
	min-height: ${props => props.minHeight ? `${props.minHeight}px` : '40px'};
	max-height: ${props => props.maxHeight && `${props.maxHeight}px`};
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  background-color: ${props => props.selected ? props.colors.selected : props.colors.notSelected};
  font-size: ${props=>props.fontSize ? `${props.fontSize}px` : '12px'};
  color: ${props => props.colors.textColor};
	opacity: ${props => props.disabled && 0.5};
	white-space: pre-line;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => !props.disabled && props.selected ? props.selected : props.colors.hovered};
    color: ${props => !props.disabled && props.colors.hoveredText};
  }
	&:focus {
		outline-color: ${props => !props.disabled && props.colors.hoveredText};
		color: ${props => props.colors.hoveredText};
	}
`