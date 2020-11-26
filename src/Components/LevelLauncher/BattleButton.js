import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initializeBattle } from '../../Redux/actions';
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';

const BattleButton = ({ selectionOptions, setSelectionOptions }) => {
	const dispatch = useDispatch();
	const [error, setError] = React.useState(null);
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	React.useEffect(() => {
		let eraseErrorMsg;
		if (error) {
			eraseErrorMsg = setTimeout(()=>{
				setError(null)
			},2000)
		}
		return () => clearTimeout(eraseErrorMsg)
	},[error])

	function initializeBattle () {
		// test that a bot is selected and has valid ai
		// dispatch to battle reducer
		if (!userInfo.botBuilds[selectionOptions.botNumberSelected]) setError('NO BOT SELECTED');
		else if (userInfo.botBuilds[selectionOptions.botNumberSelected].script.length === 0) setError('INVALID BOT AI');
		else {
			// have this dispatch a game launched state
			const newSelectionOptions = {...selectionOptions};
			newSelectionOptions.viewingLevels = false;
			setSelectionOptions(newSelectionOptions);
			dispatch(initializeBattle(newSelectionOptions.challengeNumber, newSelectionOptions.levelNumber, [newSelectionOptions.botNumberSelected]))

		}
	}
  return error ? (
		<ErrorP>
			{error}
		</ErrorP>
	):(
		<StyledButton
		handleClick = {initializeBattle}
		>
			BATTLE
		</StyledButton>
  )
}

export default BattleButton;

const ErrorP = styled.p`
	color: red;
	font-size: 0.6em;
`
