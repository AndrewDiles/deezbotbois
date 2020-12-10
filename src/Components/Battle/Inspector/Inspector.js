import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

const Inspector = ({ viewing, cellClicked }) => {
	const [hovering, setHovering] = React.useState(0);
	let colors = useSelector(getThemeColors);
	// const battleInfo = useSelector((state) => state.battleInfo);

  return (
    <Wrapper className = 'startFlex col'>
			<Tab
			viewing = {viewing}
			colors = {colors}
			hovering = {hovering}
			/>
			<InspectorContainer
			viewing = {viewing}
			colors = {colors}
			hovering = {hovering}
			onMouseEnter = {()=>{setHovering(1)}}
			onMouseLeave = {()=>{setHovering(0)}}
			>
			</InspectorContainer>
		</Wrapper>
  )
}

export default Inspector;
const InspectorContainer = styled.div`
	height: ${props => props.viewing === 'cell' ? '600px' : '0px'};
	margin-top: ${props => props.viewing === 'cell' ? '0px' : '20px'};
	width: 300px;
	background-color: ${props => props.colors.primary};
	position: relative;
	top: -10px;
	left: -70px;
	z-index: 10;
	transition: height 0.5s ease-in-out;
	font-size: 0.5em;
	overflow-x: auto;
	border: ${props => props.viewing === 'cell' && `5px solid ${props.hovering ? props.colors.hoveredText : props.colors.secondary}`};
	border-radius: 5px;
	>p{
		display: ${props => props.viewing !== 'cell' && 'none'};
		animation: 0.5s ease-out expandYHalfDelay;
	}
`
const Tab = styled.div`
	height: 20px;
	width: 20px;
	background-color: ${props => props.viewing === 'cell' && props.hovering ? props.colors.hoveredText : props.colors.secondary};
	transform: rotate(45deg);
	display: ${props => props.viewing !== 'cell' && 'none'};
	animation: 0.2s ease-out expandY;
	:hover {
		background-color: ${props => props.colors.hoveredText};
	}
`
const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: start;
	text-align: start;
	position: relative;
	top: 275px;
	left: -70px;
	width: 0px;
	height: 500px;
	overflow: visible;
`