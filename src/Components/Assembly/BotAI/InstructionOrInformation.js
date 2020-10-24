import React from 'react';
import StyledButton from '../../StyledButton/StyledButton';

const InstructionsOrInformation = ({ setDisplayInfo, displayInfo, type }) => {
	return (
		<div className ='aiButtonRow centeredFlex'>
			<StyledButton
			handleClick = {()=>setDisplayInfo(false)}
			selected = {displayInfo === false}
			width = {120}
			fontSize = '9'
			>
				{type}
			</StyledButton>
			<StyledButton
			handleClick = {()=>setDisplayInfo(true)}
			selected = {displayInfo === true}
			width = {120}
			fontSize = '9'
			>
				INFORMATION
			</StyledButton>
		</div>
	)
}
export default InstructionsOrInformation;