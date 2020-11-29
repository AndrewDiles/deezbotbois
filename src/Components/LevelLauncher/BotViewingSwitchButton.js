import React from 'react';
import StyledButton from '../StyledButton/StyledButton';

const BotViewingSwitchButton = ({ type, typeViewing, setTypeViewing }) => {
	// const dispatch = useDispatch();
  return (
		<StyledButton
		selected = {typeViewing === type}
		disabled = {typeViewing === type}
		handleClick = {()=>{setTypeViewing(type)}}
		width = {125}
		sfx = 'toggle'
		>
			{type}
		</StyledButton>
  )
}

export default BotViewingSwitchButton;