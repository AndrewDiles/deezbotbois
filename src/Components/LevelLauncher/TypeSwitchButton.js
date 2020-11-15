import React from 'react';
import StyledButton from '../StyledButton/StyledButton';

const TypeSwitchButton = ({ type, selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	function handleClick () {
		let newSelectionOptions = {...selectionOptions};
		newSelectionOptions.detailsSelected = type;
		setSelectionOptions(newSelectionOptions);
	}
  return (
		<StyledButton
		selected = {selectionOptions.detailsSelected === type}
		disabled = {selectionOptions.detailsSelected === type}
		handleClick = {handleClick}
		width = {90}
		fontSize = {type === 'HISTORY' && '10'}
		>
			{type}
		</StyledButton>
  )
}

export default TypeSwitchButton;