import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const StyledInput = ({labelName, value, setValue, disabled, height, width, maxLength, margin}) => {
	const colors = useSelector(getThemeColors);
	const [hasBeenFocused, setHasBeenFocused] = useState(false);

  return (
    <InputWrapper
		height = {height}
		width = {width}
		margin = {margin}
		hasBeenFocused = {hasBeenFocused}
		>
			<LabelWrapper
			hasBeenFocused = {hasBeenFocused}
			>
				<Label
				colors = {colors}
				hasBeenFocused = {hasBeenFocused}
				>
					{labelName}
				</Label>
			</LabelWrapper>
			<Input
			colors = {colors}
			type = 'text'
			maxLength = {maxLength}
			onChange = {(ev)=>{setValue(ev.target.value)}}
			onFocus = {()=>{setHasBeenFocused(true); console.log('has been focused')}}
			onMouseEnter = {()=>{setHasBeenFocused(true); console.log('has been focused')}}
			value = {value && value}
			disabled = {disabled}
			/>
  	</InputWrapper>
	)
}
export default StyledInput;
const InputWrapper = styled.div`
	width: ${props => props.width ? `${props.width}px`: '100%'};
	height: ${props => props.height ? `${props.height}px`: '50xp'};
	margin: ${props => props.margin && `${props.margin}px 0`};
	display: flex;
	/* justify-content: ${props => !props.hasBeenFocused && 'center'};
	text-align: ${props => !props.hasBeenFocused && 'center'}; */
`
const LabelWrapper = styled.label`
	height: 0px;
	width: 0px;
	position: relative;
	top: ${props => props.hasBeenFocused ? '-14px': '10px'};
	left: ${props => props.hasBeenFocused ? '8px': '8px'};
	transition: left 0.5s ease-in-out, top 0.5s ease-in-out;
	z-index: 1;
`
const Label = styled.label`
	font-size: ${props => props.hasBeenFocused ? '8px' : '16px'};
	background-color: ${props => props.hasBeenFocused && props.colors.primary};
	transition: font-size 0.5s ease-in-out, background-color 0.5s ease-in-out;
	white-space: nowrap;
`
const Input = styled.input`
	width: 100%;
	height: 40px;
	font-size: 24px;
	display: block;
	margin-right: auto;
	margin-left: auto;
	text-align: start;
	padding-left: 8px;
	color: ${props => props.colors.textColor};
	border: ${props => `3px solid ${props.colors.secondary}`};
	border-radius: 5px;
	&:hover {
	background-color: ${props => props.colors.hovered};
	cursor: pointer;
	}
	&:focus {
	outline-color: ${props => !props.disabled && props.colors.hoveredText};
	color: ${props => props.colors.hoveredText};
}
`