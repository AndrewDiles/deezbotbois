import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import styled from 'styled-components';

const NodeInsersionIndicator = ({ setHelpNeeded }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	function handleClick() {
		setHelpNeeded(false);
	}
	return (
		<Wrapper
		className = 'centeredFlex'
		colors = {colors}
		onClick = {handleClick}
		>
			PLEASE SET AN INSERTION POINT FOR A NODE 
		</Wrapper>
	)
}
export default NodeInsersionIndicator;

const Wrapper = styled.div`
	/* display: flex; */
	/* position: relative; */
	width: 248px;
	height: 50px;
	z-index: 15;
	font-size: 0.7em;
	color: ${props => props.colors.hoveredText};
	background: ${props => props.colors.hovered};
	:hover {
		cursor: pointer;
	}
`
