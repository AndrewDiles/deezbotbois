import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import BotViewingSwitchButton from './BotViewingSwitchButton';
import levelInfo from '../../Constants/levels/levelnfo';
import OtherBotSelector from './OtherBotSelector';
import bots from '../../Constants/botAis/bots';
import styled from 'styled-components';

const ViewHostiles = ({ selectionOptions }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [typeViewing, setTypeViewing] = useState('HOSTILE');
	const [botNumberViewing, setBotNumberViewing] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(0);
	useEffect(()=>{
		let	animatedTimer = setTimeout(()=>{
			setHasAnimated(1)
		},750);
		return () => clearTimeout(animatedTimer)
	},[])
	useEffect(()=>{
		setBotNumberViewing(0);
	},[JSON.stringify(selectionOptions)])
	

  return (
		<HostilesWrapper
		navLocation = {settings.navLocation}
		>
			<Hostiles
			navLocation = {settings.navLocation}
			selectionOptions = {selectionOptions}
			color = {colors.secondary}
			className = 'startFlex col'
			hasAnimated = {hasAnimated}
			>
				<Title>
					OTHER BOTS
				</Title>
				<TypeButtonContainer className = 'evenlyFlex'>
					{['HOSTILE', 'FRIENDLY'].map((type)=>{
						return(
							<BotViewingSwitchButton
							key = {type}
							type = {type}
							typeViewing = {typeViewing}
							setTypeViewing = {setTypeViewing}
							/>
						)
					})}
				</TypeButtonContainer>
				<br/>
				<OtherBotSelector
				botNumberViewing = {botNumberViewing}
				setBotNumberViewing = {setBotNumberViewing}
				typeViewing = {typeViewing}
				levelInfo = {levelInfo[selectionOptions.levelNumber]}
				/>
				<BotName>
					{levelInfo[selectionOptions.levelNumber][typeViewing.toLowerCase()][botNumberViewing] &&
					bots[levelInfo[selectionOptions.levelNumber][typeViewing.toLowerCase()][botNumberViewing].name].name}
				</BotName>
				<Description className = 'centeredFlex'>
					{levelInfo[selectionOptions.levelNumber][typeViewing.toLowerCase()][botNumberViewing] ?
						bots[levelInfo[selectionOptions.levelNumber][typeViewing.toLowerCase()][botNumberViewing].name].scriptInfo 
					: 
						typeViewing === 'HOSTILE' ? 
							'THERE ARE NO HOSTILE BOTS TO DEFEAT.'
						:
							"THERE ARE NO FRIENDLY BOTS TO AID YOUR BOT.  SUCK IT UP."
					}
				</Description>
			</Hostiles>
		</HostilesWrapper>
  )
}

export default ViewHostiles;
const Description = styled.div`
	width: 100%;
	height: 150px;
`
const BotName = styled.div`
	width: 100%;
	height: 25px;
`
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
const TypeButtonContainer = styled.div`
	height: 50px;
	width: 100%;
`