import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import InstructionsOrInformation from '../InstructionOrInformation';
import commandDetails from '../../../../Constants/commandDetails';
import { commandInfo } from '../../../../Constants/attributes';

const WaitCommandInstructions = ({ nodeInfo, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<span>
				THIS COMMAND DOES NOT REQUIRE ANY INSTRUCTIONS
			</span>
		</div>
	)
}
export default WaitCommandInstructions;