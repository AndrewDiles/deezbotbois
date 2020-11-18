import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {shift} from 'react-icons-kit/icomoon/shift';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import levelInfo from '../../Constants/levels/levelnfo';
import StyledButton from '../StyledButton/StyledButton';
import StyledIcon from '../StyledIcon/StyledIcon';
import BattleButton from './BattleButton';

const LevelSelector = ({ selectionOptions, setSelectionOptions, swapBetweenChallengesAndLevels }) => {
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

	},[selectionOptions.levelNumber])

	console.log(levelInfo[selectionOptions.levelNumber]);

	function setLevelNumber (num) {
		let newSelectionOptions = {...selectionOptions};
		newSelectionOptions.levelNumber = num;
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
					{availableLevels.length > 6 &&
						<StyledButton
						disabled = {selectionOptions.levelNumber === 0}
						width = '30'
						maxHeight = '30'
						handleClick = {()=>{setLevelNumber(0)}}
						>
							0
						</StyledButton>
					}
					<LevelChoicesContainer
					colors = {colors}
					>

					</LevelChoicesContainer>
					{availableLevels.length > 6 &&
						<StyledButton
						disabled = {selectionOptions.levelNumber === availableLevels.length}
						width = '30'
						maxHeight = '30'
						handleClick = {()=>{setLevelNumber(0)}}
						>
							{availableLevels.length}
						</StyledButton>
					}
				</LevelSelectContainer>
				<BattleButton
				selectionOptions = {selectionOptions}
				setSelectionOptions = {setSelectionOptions}
				/>
				{hasAnimated && 
				// needs to also require a minimum of 5 levels having been beaten.  Correct later after testing
					<ShiftIconContainer>
						<StyledIcon
						icon = {shift}
						padding = {5}
						handleClick = {swapBetweenChallengesAndLevels}
						// disabled = {userInfo.levelProgress.length < 5}
						/>
					</ShiftIconContainer>
				}
			</LevelSelect>
		</LevelSelectWrapper>
  )
}

export default LevelSelector;
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
	border: ${props => `3px solid ${props.colors.notSelected}`};
	:hover {
		border: ${props => `3px solid ${props.colors.hovered}`};
	}
`