import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledIcon from '../../../StyledIcon/StyledIcon';
import {power as cost} from 'react-icons-kit/icomoon/power';
import {listOl as initiative} from 'react-icons-kit/fa/listOl';
import StyledButton from '../../../StyledButton/StyledButton';
import { getThemeColors } from '../../../../Redux/reducers/user-reducer';
import InstructionsOrInformation from '../InstructionOrInformation';
import commandDetails from '../../../../Constants/commandDetails';
import { commandInfo } from '../../../../Constants/attributes';
import MicroCommandsProvider from '../MicroCommandsProvider';
import WarningIcons from '../WarningIcons';

const CommandTemplate = ({ attributes, nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, children }) => {
	const colors = useSelector(getThemeColors);
	const [displayInfo, setDisplayInfo] = React.useState(false)
	const [commandNotAvailable, setCommandNotAvailable] = React.useState(false);
	React.useEffect(()=>{
		if (attributes && nodeInfo) {
			attributes[nodeInfo.name] ? setCommandNotAvailable(false) : setCommandNotAvailable(true);
		}
	},[attributes,nodeInfo])
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
			<Title 
			className = 'centeredFlex aiTitle'
			colors= {colors}
			commandNotAvailable = {commandNotAvailable}
			>
				{commandInfo[nodeInfo.name]} COMMAND
			</Title>
			{commandNotAvailable &&
				<Warning
				colors = {colors}
				>
					<WarningIcons/>
						BOT DOES NOT KNOW THIS COMMAND
					<WarningIcons/>
				</Warning>
			}
			<InstructionsOrInformation
			displayInfo = {displayInfo}
			setDisplayInfo = {setDisplayInfo}
			/>
			{displayInfo ? (
				<div className = 'commandContents infoContents'>
					{commandDetails[nodeInfo.name].cost !== undefined &&
					commandDetails[nodeInfo.name].speed !== undefined &&
						<span>
							{typeof commandDetails[nodeInfo.name].cost === 'number' ? (
								<IconRow>
									<StyledIcon
									icon={cost}
									padding="5"
									hovered={1}
									keepcursor={1}
									/>
									{commandDetails[nodeInfo.name].cost}
									<Gap/>
									<StyledIcon
									icon={initiative}
									padding="5"
									hovered={1}
									keepcursor={1}
									/>
									{commandDetails[nodeInfo.name].speed}
								</IconRow>
							) : (
								commandDetails[nodeInfo.name].cost
							)}
						</span>
					}
					<br/>
					{typeof commandDetails[nodeInfo.name].cost !== 'number' &&
					commandDetails[nodeInfo.name].speed !== undefined &&
						<span>
							{typeof commandDetails[nodeInfo.name].speed === 'number' ? (
								<span style={{fontSize: "2em"}}>
									<StyledIcon
									icon={initiative}
									padding="5"
									hovered={1}
									keepcursor={1}
									/>
									{commandDetails[nodeInfo.name].speed}
								</span>
							) : (
								commandDetails[nodeInfo.name].speed
							)}
						</span>
					}
					<br/>
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
							This command accepts following instructions:
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
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
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
const IconRow = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	font-size: 2em;
`
const Gap = styled.div`
	width: 50px;
	height: 0;
`
const Title = styled.div`
	color: ${props => props.commandNotAvailable && props.colors.hoveredText};
	background: ${props => props.commandNotAvailable && 'rgba(255,0,0,0.2)'};
`
const Warning = styled.div`
	color: ${props => props.colors.hoveredText};
	background: rgba(255,0,0,0.2);
	width: 250px;
	white-space: pre-wrap;
`