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
// import debounce from '../../Constants/debounce';

const LevelLauncher = () => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const initialSelectionOptions = {
		viewingLevels: true,
		levelNumber: 0,
		challengeNumber: 0,
		detailsSelected: 'layout',
		botNumberSelected: 0
	}
	const [gameLaunched, setGameLaunched] = useState(false);
	const [selectionOptions, setSelectionOptions] = useState(initialSelectionOptions);

	// const [windowWidth, setWindowWidth] = useState(document.body.clientWidth);	
	// React.useEffect(()=>{
	// 	window.addEventListener('resize', limitedResizeFunction);
	// 	return()=>{
	// 		window.removeEventListener('resize', limitedResizeFunction);
	// 	}
	// })
	// const limitedResizeFunction = useCallback(
  //   debounce(function(){
	// 			setWindowWidth(document.body.clientWidth);
	// 	},250, false), []
  // );

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
					/>
				) : (
					<Challenges
					selectionOptions = {selectionOptions}
					setSelectionOptions = {setSelectionOptions}
					/>
				)
			) : (
				<>
					GAME GRID COMPONENT
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
transition: padding 0.5s ease-in-out;
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
`