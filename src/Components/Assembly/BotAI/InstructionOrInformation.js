import React from 'react';
import StyledButton from '../../StyledButton/StyledButton';

const InstructionsOrInformation = ({ setDisplayInfo, displayInfo }) => {
	return (
		<div className ='aiButtonRow'>
			<StyledButton
			handleClick = {()=>setDisplayInfo(false)}
			selected = {displayInfo === false}
			fontSize = '9'
			>
				INSTRUCTIONS
			</StyledButton>
			<StyledButton
			handleClick = {()=>setDisplayInfo(true)}
			selected = {displayInfo === true}
			fontSize = '9'
			>
				INFORMATION
			</StyledButton>
		</div>
	)
}
export default InstructionsOrInformation;