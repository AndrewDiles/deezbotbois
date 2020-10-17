import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import InstructionsOrInformation from '../InstructionOrInformation';
import commandDetails from '../../../../Constants/commandDetails';
import { commandInfo } from '../../../../Constants/attributes';

const ElevenAttackCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<span>
				11attack instructions to come
			</span>
		</div>
	)
}
export default ElevenAttackCommandInstructions;