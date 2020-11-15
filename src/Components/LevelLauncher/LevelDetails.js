import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import TypeSwitchButton from './TypeSwitchButton';

const LevelDetails = ({ selectionOptions , setSelectionOptions }) => {
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
				<Title>
					LEVEL DETAILS
				</Title>
				<br/>
				<TypeButtonContainer className = 'evenlyFlex'>
					{['LAYOUT', 'OTHER BOTS', 'HISTORY'].map((type)=>{
						return(
							<TypeSwitchButton
							key = {type}
							type = {type}
							selectionOptions = {selectionOptions}
							setSelectionOptions = {setSelectionOptions}
							/>
						)
					})}
				</TypeButtonContainer>
				<br/>
				<Description>
					{selectionOptions.detailsSelected === 'LAYOUT' && 
						'BELOW IS A SAMPLE GRID OF THE SELECTED LEVEL AND THE STARTING LOCATION OF EACH BOT IN THE LEVEL'
					}
					{selectionOptions.detailsSelected === 'OTHER BOTS' && 
						'BELOW IS INFORMATION ABOUT THE OTHER BOTS YOUR BOT WILL ENCOUNTER IN THE SELECTED LEVEL'
					}
					{selectionOptions.detailsSelected === 'HISTORY' && 
						'BELOW IS A LIST OF YOUR RECORDS AND ACHIEVEMENTS FOR THE SELECTED LEVEL'
					}
				</Description>
			</Details>
		</LevelDetailsWrapper>
  )
}

export default LevelDetails;
const Description = styled.div`
	font-size: 0.8em;
	height: 150px;
`
const TypeButtonContainer = styled.div`
	height: 50px;
	width: 100%;
`
const Title = styled.div`
	margin: 10px 0;
	font-size: 18px;
`
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
	transition: transform .75s ease-in-out;
`
const Details = styled.div`
	width: 300px;
	height: 650px;
	flex-direction: column;
	padding: 5px;
	border: ${props => `5px solid ${props.color}`};
	border-radius: 10px;
	transform: scale(1);
	transition: ${props => props.hasAnimated ? 'transform .75s ease-in-out' : '' };
	animation: .75s ease-out 1 expandY;
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: scale(0);
		animation: '';
  }
	transform-origin: center top;
`