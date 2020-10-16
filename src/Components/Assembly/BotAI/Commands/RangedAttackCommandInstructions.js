import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import InstructionsOrInformation from '../InstructionOrInformation';
import commandDetails from '../../../../Constants/commandDetails';
import { commandInfo } from '../../../../Constants/attributes';

const RangedAttackCommandInstructions = ({ nodeInfo, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<span>
				ranged attack instructions to come
			</span>
		</div>
	)
}
export default RangedAttackCommandInstructions;