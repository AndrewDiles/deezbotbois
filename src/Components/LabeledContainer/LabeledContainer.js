import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';

const LabeledContainer = ({ label, children }) => {
	const colors = useSelector(getThemeColors);

  return (
    <Wrapper
		colors = {colors}
		>
			<label>
				{label}
			</label>
			<div>
				{children}
			</div>
    </Wrapper>
  )
}

export default LabeledContainer;

const Wrapper = styled.div`
	border: ${props => `5px solid ${props.colors.secondary}`};
	border-radius: 5px;
	padding: 0 5px;
	> label {
		position:relative;
  	top:-15px;
  	background-color: ${props => props.colors.primary};
		font-size: 0.8em;
	}
	> div {
		position: relative;
		bottom: 10px;
	}
	:hover {
		border-color: ${props => props.colors.hovered};
		color: ${props => props.colors.hoveredText};
	}
`