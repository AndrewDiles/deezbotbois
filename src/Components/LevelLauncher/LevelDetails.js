import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import ViewLayout from './ViewLayout';

const LevelDetails = ({ selectionOptions,setSelectionOptions }) => {
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
		<LevelDetailsWrapper
		navLocation = {settings.navLocation}
		>
			<Details
			navLocation = {settings.navLocation}
			color = {colors.secondary}
			className = 'startFlex'
			hasAnimated = {hasAnimated}
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
	transform: translate(-150px, 250px);
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'650px': '785px'}
	) {
		transform: translate(50px,0px);
  }
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: '';
  }
	transition: transform 1s ease-in-out;
`
const Details = styled.div`
	background-color: mintcream;
	width: 300px;
	height: 650px;
	flex-direction: column;
	padding: 5px;
	border: ${props => `5px solid ${props.color}`};
	border-radius: 10px;
	transform: scale(1);
	transition: ${props => props.hasAnimated ? 'transform 1s ease-in-out' : '' };
	animation: 1s ease-out 1 expandY;
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: scale(0);
		animation: '';
  }
	transform-origin: center top;
`