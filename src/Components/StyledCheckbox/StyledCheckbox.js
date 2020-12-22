import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import { playSFX } from '../../Redux/actions';
import { Icon } from "react-icons-kit";
import {xSquare} from 'react-icons-kit/feather/xSquare';
import {checkSquare} from 'react-icons-kit/feather/checkSquare';

const StyledCheckbox = ( { sfx, handleClick, disabled, value, right, margin} ) => {
	const dispatch = useDispatch();
	let colors = useSelector(getThemeColors);
	const settings = useSelector((state) => state.settings);
	if (settings.serverStatus !== 'idle') disabled = true;
	
  if (handleClick === undefined || handleClick === null) {
    handleClick = () => {
			console.log('clicked styled checkbox without a handle click function');
    }
	}
	
  return (
    <StyledIcon
    disabled = {disabled || null}
    onClick = { disabled ? sfx ? ()=>{dispatch(playSFX('disabled'))} : ()=>{}
			: sfx ? (ev)=>{handleClick(ev);dispatch(playSFX(sfx))} : (ev)=>{handleClick(ev)}
		}
    displaying = {value ? 1 : 0}
		colors = {colors}
		value = {value}
		icon = {value ? checkSquare : xSquare}
		right = {right}
		margin = {margin}
    />
  )
}
export default StyledCheckbox;

const StyledIcon = styled(Icon)`
	position: relative;
	right: ${props => props.right && props.right};
	transition: color .25s, background-color .25s;
  background-color: ${props => props.checked ? props.colors.selected : props.colors.notSelected};
  color: ${props => props.displaying ? 'lime' : 'red'};
	opacity: ${props => props.disabled && 0.5};
	border-radius: 3px;
	margin: ${props => props.margin && props.margin};
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => !props.disabled && props.checked ? props.selected : props.colors.hovered};
    color: ${props => !props.disabled && props.colors.hoveredText};
  }
	&:focus {
		outline-color: ${props => !props.disabled && props.colors.hoveredText};
		color: ${props => props.colors.hoveredText};
	}
`