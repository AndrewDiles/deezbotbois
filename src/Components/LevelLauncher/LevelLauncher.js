import React, { useState } from 'react';
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
import debounce from '../../Constants/debounce';

const LevelLauncher = () => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [gameLaunched, setGameLaunched] = useState(false);
	const [viewingLevels, setViewingLevels] = useState(true);
	const [windowWidth, setWindowWidth] = useState(document.body.clientWidth);
	React.useEffect(()=>{
		let limitedResizeFunction = debounce(function(){
			setWindowWidth(document.body.clientWidth);
		},150)
		window.addEventListener('resize', limitedResizeFunction);
		return()=>{
			window.removeEventListener('resize', limitedResizeFunction);
		}
	})

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
      	viewingLevels ? (
					<Levels
					setViewingLevels = {setViewingLevels}
					windowWidth = {windowWidth}
					/>
				) : (
					<Challenges
					setViewingLevels = {setViewingLevels}
					windowWidth = {windowWidth}
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