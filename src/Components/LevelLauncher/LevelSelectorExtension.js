import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
// import BotSelector from './BotSelector';

const LevelSelectorExtension = ({ windowWidth, sizes, selectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);

  return (
		<LevelSelectExtensionWrapper
		navLocation = {settings.navLocation}
		windowWidth = {windowWidth}
		width = {sizes.width}
		gridGap = {sizes.gridGap}
		lvSelHeight = {sizes.lvSelHeight}
		>
			<LevelSelectExtension
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			height = {sizes.allOtherHeights-sizes.lvSelHeight}
			width = {sizes.width}
			gridGap = {sizes.gridGap}
			className = 'centeredFlex'
			>
				LEVEL EXTENSION
			</LevelSelectExtension>
		</LevelSelectExtensionWrapper>
  )
}

export default LevelSelectorExtension;

const LevelSelectExtensionWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)` :
		`translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)` :
		`translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)`
		};
	transition: transform 1s ease-in-out;
`
const LevelSelectExtension = styled.div`
	background-color: blue;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props => props.navLocation === 'top' ?
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scaleY(0)' :
		'scaleY(1)' :

		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scaleY(0)' :
		'scaleY(1)'
		};
	transition: transform 1s ease-in-out;
	animation: ${props => props.navLocation === 'top' ?
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '' :
		'1s ease-out 1 expandY' :

		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '' :
		'1s ease-out 1 expandY'
		};
	transform-origin: center top;
`