import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {shift} from 'react-icons-kit/icomoon/shift';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import levelInfo from '../../Constants/levels/levelnfo';
import BattleButton from './BattleButton';

const LevelSelector = ({ selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	console.log(levelInfo[selectionOptions.levelNumber]);
	// userInfo.levelProgress is an array.  for each index it has, that level has been defeated

  return (
		<LevelSelectWrapper
		navLocation = {settings.navLocation}
		>
			<LevelSelect
			className = 'startFlex'
			color = {colors.secondary}
			navLocation = {settings.navLocation}
			>
				LEVEL SELECT
				<br/>
				<BattleButton
				selectionOptions = {selectionOptions}
				setSelectionOptions = {setSelectionOptions}
				/>
			</LevelSelect>
		</LevelSelectWrapper>
  )
}

export default LevelSelector;

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
	background-color: blue;
	width: 300px;
	height: 200px;
	animation: .75s ease-out 1 expandY;
	transform-origin: center top;
	flex-direction: column;
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