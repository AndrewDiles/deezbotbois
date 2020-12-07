import React, { useState, useCallback } from 'react';
import { 
	useSelector, 
	// useDispatch 
} from "react-redux";
import { 
	// NavLink, 
	Redirect 
} from "react-router-dom";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import Levels from './Levels';
import Challenges from './Challenges';
import Battle from '../Battle/Battle';
import BattleSettings from '../Battle/BattleSettings/BattleSettings';

const LevelLauncher = () => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const initialSelectionOptions = {
		viewingLevels: true,
		levelNumber: 0,
		challengeNumber: 0,
		detailsSelected: 'LAYOUT',
		botNumberSelected: 0,
		// botNumbersSelected: [0]
	}
	const [gameLaunched, setGameLaunched] = useState(false);
	//TODO: if multiple bots are to be sent, then this needs to be changed to an array : botNumbersSelected
	const [selectionOptions, setSelectionOptions] = useState(initialSelectionOptions);

	function swapBetweenChallengesAndLevels () {
		let newSelectionOptions = {...selectionOptions};
		newSelectionOptions.viewingLevels = !newSelectionOptions.viewingLevels;
		setSelectionOptions(newSelectionOptions);
	}

	if (!userInfo.email) {
    return (
      <Redirect to="/home" />
    )
	}

  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<h2>
				FIGHT-EM
			</h2>
			{!gameLaunched ? (
      	selectionOptions.viewingLevels ? (
					<Levels
					selectionOptions = {selectionOptions}
					setSelectionOptions = {setSelectionOptions}
					setGameLaunched = {setGameLaunched}
					swapBetweenChallengesAndLevels = {swapBetweenChallengesAndLevels}
					/>
				) : (
					<Challenges
					selectionOptions = {selectionOptions}
					setSelectionOptions = {setSelectionOptions}
					setGameLaunched = {setGameLaunched}
					swapBetweenChallengesAndLevels = {swapBetweenChallengesAndLevels}
					/>
				)
			) : (
				<>
					<BattleSettings setGameLaunched = {setGameLaunched}/>
					<Battle/>
				</>
			)}
    </Wrapper>
  )
}

export default LevelLauncher;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' ? "20px 140px 0 0" : "20px 0 0 0"
			: props.profileTab === 'active' ? "20px 140px 0 140px" : "20px 140px 0 0"
			};
	transition: padding 0.75s ease-in-out;
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	/* padding-top: 250px; */
	display : flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
	justify-content: flex-start;
	overflow-y: auto;
	margin: 10px;
`