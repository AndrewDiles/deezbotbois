import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const LevelDetails = ({ windowWidth, sizes, selectionOptions,setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);

  return (
		<LevelDetailsWrapper
		navLocation = {settings.navLocation}
		windowWidth = {windowWidth}
		width = {sizes.width}
		gridGap = {sizes.gridGap}
		lvSelHeight = {sizes.lvSelHeight}
		>
			<Details
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			height = {sizes.lvDetailsHeight}
			width = {sizes.width}
			gridGap = {sizes.gridGap}
			lvSelHeight = {sizes.lvSelHeight}
			className = 'centeredFlex'
			>
				LEVEL DETAILS
			</Details>
		</LevelDetailsWrapper>
  )
}

export default LevelDetails;
const LevelDetailsWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight+props.gridGap}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,0px)` :
		'' :
		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight+props.gridGap}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,0px)` :
		''
	};
	transition: transform 1s ease-in-out;
`
const Details = styled.div`
	background-color: mintcream;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scale(1)' :
		'scale(0)' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scale(1)' :
		'scale(0)'
	};
	transition: transform 1s ease-in-out;
	animation: ${props => props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '1s ease-out 1 expandY' :
		'' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '1s ease-out 1 expandY' :
		''
	};
	transform-origin: center top;
`