import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import StyledButton from '../StyledButton/StyledButton';

const BattleButton = ({ selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	// userInfo.levelProgress is an array.  for each index it has, that level has been defeated

  return (
		<StyledButton>
			START
		</StyledButton>
  )
}

export default BattleButton;
