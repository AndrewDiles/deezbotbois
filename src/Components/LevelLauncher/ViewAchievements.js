import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import Bot from '../Bots/Bot';
import styled from 'styled-components';
import levelInfo from '../../Constants/levels/levelnfo';
import Goals from './Goals';

const ViewAchievements = ({ selectionOptions, setSelectionOptions }) => {
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
		<AchievementsWrapper
		navLocation = {settings.navLocation}
		>
			<Achievements
			navLocation = {settings.navLocation}
			selectionOptions = {selectionOptions}
			color = {colors.secondary}
			className = 'startFlex'
			hasAnimated = {hasAnimated}
			>
				<Title>
					LEVEL RECORDS
				</Title>
				{userInfo.levelProgress[selectionOptions.levelNumber].length === 0 ?
					'LEVEL HAS NOT BEEN COMPLETED'
				: 
					<>
						<RowEntry className = 'startFlex'>
							<NarrowLabel className = 'centeredFlex'>
								MODEL WINS
							</NarrowLabel>
							<RatioContainer className = 'centeredFlex col'>
								<RatioChild className = 'startFlex'>
									{userInfo.levelProgress[selectionOptions.levelNumber].length-1}
								</RatioChild>
								<DivisionSymbol
								color = {colors.textColor}
								/>
								<RatioChild className = 'endFlex'>
									{userInfo.availableBots.length}
								</RatioChild>
							</RatioContainer>
							<EntryContents
							className = 'evenlyFlex'
							>
								{userInfo.levelProgress[selectionOptions.levelNumber].map((botName, index)=>{
									if (index !== 0) {
										return(
											<Bot
											key = {index}
											alternativeBotSize = {(userInfo.levelProgress[selectionOptions.levelNumber].length-1) > 4 ? 24 : 38}
											model = {botName}
											botColors = {'default'}
											/>
										)
									}
								})}
							</EntryContents>
						</RowEntry>
						<RowEntry className = 'startFlex'>
							<Label className = 'centeredFlex'>
								FASTEST WIN
							</Label>
							<EntryContents className = 'centeredFlex'>
								{userInfo.levelProgress[selectionOptions.levelNumber][0].minTicks} TICKS
							</EntryContents>
						</RowEntry>
						<RowEntry className = 'startFlex'>
							<Label className = 'centeredFlex'>
								LEAST DAMAGE TAKEN
							</Label>
							<EntryContents className = 'startFlex indent'>
								{userInfo.levelProgress[selectionOptions.levelNumber][0].minDamageTaken}
							</EntryContents>
							<br/>
							<Label className = 'centeredFlex'>
								MOST DAMAGE DEALT
							</Label>
							<EntryContents className = 'startFlex indent'>
								{userInfo.levelProgress[selectionOptions.levelNumber][0].maxDamageDealt}
							</EntryContents>
						</RowEntry>
					</>
				}
				<br/>
				<Goals
				metInfo = {userInfo.levelProgress[selectionOptions.levelNumber][0]}
				goalInfo = {[levelInfo[selectionOptions.levelNumber].ach1,levelInfo[selectionOptions.levelNumber].ach2,levelInfo[selectionOptions.levelNumber].ach3]}
				/>
			</Achievements>
		</AchievementsWrapper>
  )
}

export default ViewAchievements;
const Label = styled.div`
	height: 100%;
	width: 80px;
	font-size: 0.7em;
`
const NarrowLabel = styled.div`
	height: 100%;
	width: 50px;
	font-size: 0.7em;
`
const RatioContainer = styled.div`
	height: 100%;
	width: 30px;
	font-size: 0.7em;
`
const DivisionSymbol = styled.div`
	height: 2px;
	width: 50px;
	transform: rotate(-45deg);
	background-color: ${props => props.color};
`
const RatioChild = styled.div`
	height: 50%;
	width: 30px;
`
const EntryContents = styled.div`
	height: 100%;
	width: 200px;
`
const RowEntry = styled.div`
	height: 40px;
	width: 100%;
	margin-bottom: 5px;
`
const Title = styled.div`
	margin: 10px 0;
	font-size: 18px;
`
const AchievementsWrapper = styled.div`
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
		transform: translate(200px, 450px);
  }
	transition: transform .75s ease-in-out;
`
const Achievements = styled.div`
	width: 300px;
	height: 400px;
	padding: 5px;
	font-size: 0.8em;
	border: '';
	border-radius: 10px;
	animation: ${props => props.selectionOptions.detailsSelected === 'HISTORY' ? '.75s ease-out 1 expandYHalfDelay' : ''};
	transform: ${props => props.selectionOptions.detailsSelected === 'HISTORY' ? 'scale(1)' : 'scale(0)'};
	transition: ${props => props.hasAnimated ? 'transform .75s ease-in-out' : '' };
	flex-direction: column;
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: scale(1);
		animation: .75s ease-out 1 expandY;
		border: ${props => `5px solid ${props.color}`};
  }
	transform-origin: center top;
`