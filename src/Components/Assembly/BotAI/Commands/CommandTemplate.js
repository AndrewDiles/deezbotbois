import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import InstructionsOrInformation from '../InstructionOrInformation';
import commandDetails from '../../../../Constants/commandDetails';
import { commandInfo } from '../../../../Constants/attributes';
import MicroCommandsProvider from '../MicroCommandsProvider';

const CommandTemplate = ({ nodeInfo, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts, children }) => {

	const [displayInfo, setDisplayInfo] = React.useState(false)

	if (!commandDetails[nodeInfo.name]) {
		return (
			<div className = 'innerNodeOptionsWrapper'>
				COMMAND DETAILS NOT FOUND
			</div>
		)
	}
	return (
		<div className = 'innerNodeOptionsWrapper'>
			<br/>
			<div className = 'centeredFlex aiTitle'>
				{commandInfo[nodeInfo.name]} COMMAND
			</div>
			<InstructionsOrInformation
			displayInfo = {displayInfo}
			setDisplayInfo = {setDisplayInfo}
			/>
			{displayInfo ? (
				<div className = 'commandContents infoContents'>
					<span>
						{commandDetails[nodeInfo.name].affect}
					</span>
					<br/>
					<span>
						{commandDetails[nodeInfo.name].generalUse}
					</span>
					<br/>
					{commandDetails[nodeInfo.name].useWhen && commandDetails[nodeInfo.name].useWhen.length > 0 &&
						<span>
							Consider executing this command if the executor:
							<ul>
								{commandDetails[nodeInfo.name].useWhen.map((circumstance, index) => {
      				  	return (
      				    	<StyledLi key = {index}>
											{circumstance}
										</StyledLi>
      				  	);
      					})}
							</ul>
						</span>
					}
					{commandDetails[nodeInfo.name].instructionOptions && commandDetails[nodeInfo.name].instructionOptions.length > 0 &&
						<span>
							This command can take in the following instructions:
							<ul>
								{commandDetails[nodeInfo.name].instructionOptions.map((instruction, index)=>{
									return (
										<StyledLi key = {index}>
											{instruction}
										</StyledLi>
									)
								})}
							</ul>
						</span>
					}
				</div>
			) : (
				<MicroCommandsProvider
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				aiAndScripts = {aiAndScripts}
				setAiAndScripts = {setAiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)}
		</div>
	)
}
export default CommandTemplate;

const StyledLi = styled.li`
	margin-top: 10px;
	list-style-type: square;
`