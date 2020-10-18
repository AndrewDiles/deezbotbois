import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import InstructionsOrInformation from '../InstructionOrInformation';
import commandDetails from '../../../../Constants/commandDetails';
import { commandInfo } from '../../../../Constants/attributes';

const ChargeCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<span>
				charge instructions to come
			</span>
		</div>
	)
}
export default ChargeCommandInstructions;