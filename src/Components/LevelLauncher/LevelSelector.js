import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

const LevelSelector = ({ windowWidth, sizes, selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);

  return (
		<LevelSelectWrapper
		navLocation = {settings.navLocation}
		windowWidth = {windowWidth}
		width = {sizes.width}
		gridGap = {sizes.gridGap}
		>
			<LevelSelect
			height = {sizes.lvSelHeight}
			width = {sizes.width}
			className = 'centeredFlex'
			>
				LEVEL SELECT
			</LevelSelect>
		</LevelSelectWrapper>
  )
}

export default LevelSelector;

const LevelSelectWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translateX(${-0.5*props.width}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translateX(${-(props.width + (props.gridGap/2))}px)` :
		`translateX(${-(props.width + (props.gridGap/2))}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translateX(${-0.5*props.width}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translateX(${-(props.width + (props.gridGap/2))}px)` :
		`translateX(${-(props.width + (props.gridGap/2))}px)`
		};
	transition: transform 1s ease-in-out;
`
const LevelSelect = styled.div`
	background-color: blue;
	width: ${props=>`${props.width}px`};
	height: ${props=> `${props.height}px`};
	animation: 1s ease-out 1 expandY;
	transform-origin: center top;
`