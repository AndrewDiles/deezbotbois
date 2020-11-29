import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {shift} from 'react-icons-kit/icomoon/shift';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';
import StyledIcon from '../StyledIcon/StyledIcon';
import BattleButton from './BattleButton';

const LevelSelector = ({ selectionOptions, setSelectionOptions, swapBetweenChallengesAndLevels }) => {
	// TODO: Return to this component to ensure proper displays and functionality once 5+ levels are beaten
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [availableLevels, setAvailableLevels] = React.useState([]);
	const [hasAnimated, setHasAnimated] = React.useState(false);
	React.useEffect(()=>{
		let	animatedTimer = setTimeout(()=>{
			setHasAnimated(true)
		},750);
		setLevelNumber(userInfo.levelProgress.length);
		return () => clearTimeout(animatedTimer)
	},[])

	React.useEffect(()=>{
		let levelArray = [];
		for (let i = 0; i <= userInfo.levelProgress.length; i ++) {
			levelArray.push(i);
		}
		setAvailableLevels(levelArray);
	},[])

	React.useEffect(()=>{
		// set focus to new levelNumber
		let target = document.getElementById(`levelBox${userInfo.levelProgress.length}`);
		if (target) {
			target.focus();
		}
	},[selectionOptions.levelNumber])
	// console.log(levelInfo[selectionOptions.levelNumber]);
	
	function setLevelNumber (num) {
		let newSelectionOptions = {...selectionOptions};
		newSelectionOptions.levelNumber = num;
		setSelectionOptions(newSelectionOptions);
	}
	function modifyLevelNumber (change) {
		let newSelectionOptions = {...selectionOptions};
		newSelectionOptions.levelNumber += change;
		setSelectionOptions(newSelectionOptions);
	}

  return (
		<LevelSelectWrapper
		navLocation = {settings.navLocation}
		>
			<LevelSelect
			className = 'startFlex col'
			color = {colors.secondary}
			navLocation = {settings.navLocation}
			>
				<Title>
					LEVEL SELECT
				</Title>
				<LevelSelectContainer className = 'centeredFlex'>
					<LevelMovementContainer className = 'centeredFlex col'>
						{availableLevels.length > 6 &&
							<StyledButton
							disabled = {selectionOptions.levelNumber === 0}
							width = '40'
							maxHeight = '20'
							handleClick = {()=>{setLevelNumber(0)}}
							sfx = 'selected'
							>
								0
							</StyledButton>
						}
						{availableLevels.length > 10 &&
							<StyledButton
							disabled = {selectionOptions.levelNumber < 10}
							width = '40'
							maxHeight = '20'
							handleClick = {()=>{modifyLevelNumber(-10)}}
							sfx = 'selected'
							>
								-10
							</StyledButton>
						}
					</LevelMovementContainer>
					<LevelChoicesContainer
					colors = {colors}
					className = 'startFlex'
					numberSelected = {selectionOptions.levelNumber}
					>
						{availableLevels.map((levelNumber)=>{
							return (
								<LevelBox
								id = {`levelBox${levelNumber}`}
								key = {levelNumber}
								onClick ={()=>{setLevelNumber(levelNumber)}}
								className = 'centeredFlex'
								colors = {colors}
								selected = {levelNumber === selectionOptions.levelNumber}
								>
									<LevelContents
									className = 'centeredFlex'
									colors = {colors}
									selected = {levelNumber === selectionOptions.levelNumber}
									>
										{levelNumber}
									</LevelContents>
								</LevelBox>
							)
						})}
					</LevelChoicesContainer>
					<LevelMovementContainer className = 'centeredFlex col'>
						{availableLevels.length > 6 &&
							<StyledButton
							disabled = {selectionOptions.levelNumber === availableLevels.length}
							width = '40'
							maxHeight = '20'
							handleClick = {()=>{setLevelNumber(0)}}
							sfx = 'selected'
							>
								{availableLevels.length}
							</StyledButton>
						}
						{availableLevels.length > 10 &&
							<StyledButton
							disabled = {selectionOptions.levelNumber + 10 > availableLevels.length}
							width = '40'
							maxHeight = '20'
							handleClick = {()=>{modifyLevelNumber(+10)}}
							sfx = 'selected'
							>
								+10
							</StyledButton>
						}
					</LevelMovementContainer>
				</LevelSelectContainer>
				<br style = {{lineHeight: '10px'}}/>
				<BattleButton
				selectionOptions = {selectionOptions}
				setSelectionOptions = {setSelectionOptions}
				/>
				{hasAnimated && userInfo.levelProgress.length > 4 &&
					<ShiftIconContainer>
						<StyledIcon
						icon = {shift}
						padding = {3}
						size = {25}
						handleClick = {swapBetweenChallengesAndLevels}
						sfx = 'toggle'
						// disabled = {userInfo.levelProgress.length < 5}
						/>
					</ShiftIconContainer>
				}
			</LevelSelect>
		</LevelSelectWrapper>
  )
}

export default LevelSelector;
const LevelMovementContainer = styled.div`
	height: 40px;
	width: 40px;
`
const LevelContents = styled.div`
	height: 30px;
	width: 30px;
	transform: ${props => props.selected && 'scale(1.2)'};
	font-size: 0.8em;
	color: ${props => props.selected && props.colors.hoveredText};
`
const LevelBox = styled.div`
	height: 40px;
	width: 40px;
	border: ${props => props.selected && `5px double ${props.colors.selected}`};
	:hover {
		border: ${props => props.selected ? `5px double ${props.colors.hovered}` : `3px double ${props.colors.hovered}`};
		cursor: pointer;
		/* >div {
			color: ${props => props.selected && props.colors.hoveredText};
		} */
	}
`
const ShiftIconContainer = styled.div`
	position: absolute;
	top: 0;
	right: -300px;
`
const LevelSelectWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: translateX(-150px);
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'650px': '785px'}
	) {
		transform: translateX(-325px);
  }
	transition: transform .75s ease-in-out;
`
const LevelSelect = styled.div`
	width: 300px;
	height: 200px;
	animation: .75s ease-out 1 expandY;
	transform-origin: center top;
	padding: 5px;
	border: ${props => `5px solid ${props.color}`};
	border-radius: 10px;
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		border-radius: 10px 10px 0 0;
		border-bottom: none;
  }
`
const Title = styled.div`
	margin: 10px 0;
	font-size: 18px;
`
const LevelSelectContainer = styled.div`
	width: 100%;
	height: 60px;
`
const LevelChoicesContainer = styled.div`
	width: 200px;
	height: 50px;
	border-radius: 5px;
	overflow-x: auto;
	overflow: hidden;
	padding-left: ${props => `${80-(40*props.numberSelected)}px`};
	transition: padding-left .5s cubic-bezier(1,0,.6,1.75);
	border: ${props => `3px solid ${props.colors.notSelected}`};
	:hover {
		border: ${props => `3px solid ${props.colors.hovered}`};
	}
`