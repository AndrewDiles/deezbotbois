import React from 'react';
import { useSelector } from "react-redux";
// import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
// import BotSelector from './BotSelector';

const Challenges = ({ selectionOptions, setSelectionOptions, setGameLaunched, swapBetweenChallengesAndLevels }) => {
	//TODO: return to this component and its upcoming children once levels can be played
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	// const settings = useSelector((state) => state.settings);
	// const colors = useSelector(getThemeColors);

  return (
    <Wrapper>
			{/* LAUNCH LEVEL */}
      CHALLENGE SELECT
			<br/>
			CHALLENGE DETAILS
			<br/>
			BOT SELECTION
    </Wrapper>
  )
}

export default Challenges;

const Wrapper = styled.div`
width: 250px;
display : flex;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: flex-start;
`