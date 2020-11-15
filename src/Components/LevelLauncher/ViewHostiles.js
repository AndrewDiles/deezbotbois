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
		},750);
		return () => clearTimeout(animatedTimer)
	},[])

  return (
		<HostilesWrapper
		navLocation = {settings.navLocation}
		>
			<Hostiles
			navLocation = {settings.navLocation}
			selectionOptions = {selectionOptions}
			color = {colors.secondary}
			className = 'startFlex'
			hasAnimated = {hasAnimated}
			>
				<Title>
					OTHER BOTS
				</Title>
			</Hostiles>
		</HostilesWrapper>
  )
}

export default ViewHostiles;
const Title = styled.div`
	margin: 10px 0;
	font-size: 18px;
`
const HostilesWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: translate(-150px, 500px);
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'650px': '785px'}
	) {
		transform: translate(50px, 250px);
  }
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: translate(-150px, 450px);
  }
	transition: transform .75s ease-in-out;
`
const Hostiles = styled.div`
	background-color: orange;
	width: 300px;
	height: 400px;
	padding: 5px;
	font-size: 0.8em;
	border: '';
	border-radius: 10px;
	animation: ${props => props.selectionOptions.detailsSelected === 'OTHER BOTS' ? '.75s ease-out 1 expandYHalfDelay' : ''};
	transform: ${props => props.selectionOptions.detailsSelected === 'OTHER BOTS' ? 'scale(1)' : 'scale(0)'};
	transition: ${props => props.hasAnimated ? 'transform .75s ease-in-out' : '' };
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: scale(1);
		animation: .75s ease-out 1 expandY;
		border: ${props => `5px solid ${props.color}`};
  }
	transform-origin: center top;
`