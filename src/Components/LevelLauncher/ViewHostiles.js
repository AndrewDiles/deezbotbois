import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';

const ViewHostiles = ({ selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [hasAnimated, setHasAnimated] = React.useState(0);
	React.useEffect(()=>{
		let	animatedTimer = setTimeout(()=>{
			setHasAnimated(1)
		},1000);
		return () => clearTimeout(animatedTimer)
	},[])

  return (
		<HostilesWrapper
		navLocation = {settings.navLocation}
		>
			<Hostiles
			navLocation = {settings.navLocation}
			color = {colors.secondary}
			className = 'startFlex'
			hasAnimated = {hasAnimated}
			>
				HOSTILES
			</Hostiles>
		</HostilesWrapper>
  )
}

export default ViewHostiles;

const HostilesWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: translate(-25px, 250px);
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'650px': '785px'}
	) {
		transform: translate(25px, 125px);
  }
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: translate(-150px, 450px);
  }
	transition: transform 1s ease-in-out;
`
const Hostiles = styled.div`
	background-color: orange;
	width: 300px;
	height: 400px;
	padding: 5px;
	border: ${props => `5px solid ${props.color}`};
	border-radius: 10px;
	animation: '';
	transform: scale(0);
	transition: ${props => props.hasAnimated ? 'transform 1s ease-in-out' : '' };
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: scale(1);
		animation: 1s ease-out 1 expandY;
  }
	transform-origin: center top;
`





/* transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(0.5*props.width)}px,${props.allOtherHeights+props.gridGap}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(0.5*props.width)}px,${props.allOtherHeights+props.gridGap}px)`
	}; */