import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

const ViewLayout = ({ windowWidth, sizes, selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);

  return (
		<LayoutWrapper
		navLocation = {settings.navLocation}
		windowWidth = {windowWidth}
		width = {sizes.width}
		gridGap = {sizes.gridGap}
		allOtherHeights = {sizes.allOtherHeights}
		lvSelHeight = {sizes.lvSelHeight}
		lvDetailsHeight = {sizes.lvDetailsHeight}
		>
			<Layout
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			height = {sizes.allOtherHeights}
			width = {sizes.width}
			gridGap = {sizes.gridGap}
			className = 'centeredFlex'
			>
				LAYOUT
			</Layout>
		</LayoutWrapper>
  )
}

export default ViewLayout;

const LayoutWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ?
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(1.5*props.width + (props.gridGap))}px,${props.allOtherHeights+props.gridGap}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(1.5*props.width + (props.gridGap))}px,${props.allOtherHeights+props.gridGap}px)`
	};
	transition: transform 1s ease-in-out;
`
const Layout = styled.div`
	background-color: orange;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)`
	};
	transition: transform 1s ease-in-out;
	animation: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '' : '1s ease-out 1 expandY' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '' : '1s ease-out 1 expandY'
	};
	transform-origin: center top;
`