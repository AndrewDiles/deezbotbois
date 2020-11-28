import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';
import { comprehensiveStatsBool, commandInfo } from '../../../../Constants/attributes';

const CommandSetter = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, attributes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const [commands, setCommands] = React.useState([]);
			// console.log('attributes', attributes);

	React.useEffect(()=>{
		let newCommads = [];
		for (let i = 1; i < comprehensiveStatsBool.length; i++) {
			if (attributes[comprehensiveStatsBool[i]]) {
				newCommads.push(comprehensiveStatsBool[i]);
			}
		}
		setCommands(newCommads);
	},[attributes, botNumberSelected, JSON.stringify(userInfo.botBuilds[botNumberSelected])])

	function setCommand(commandName) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName = commandName;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	if (commands.length === 0) {
		return (
			<CommandSetterContainer>
				NO COMMANDS FOUND
			</CommandSetterContainer>
		)
	}

	return (
		<CommandSetterContainer
		heightMultiplier = {comprehensiveStatsBool.length-1}
		>
		 	<Request className = 'evenlyFlex'>
				<p>
					SELECT COMMAND
				</p>
				<p>
					SELECT COMMAND
				</p>
				<p>
					SELECT COMMAND
				</p>
		 	</Request>
		 	<Options className = 'evenlyFlex'>
				{comprehensiveStatsBool.map((command, index)=>{
					if (index !== 0) {
						return(
							<StyledButton
							key = {command}
							handleClick = {()=>{setCommand(command)}}
							selected = {command === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.commandName}
							disabled = {attributes[command] === false}
							fontSize = {command.length < 16 ? '12' : '9'}
							maxHeight = {'40'}
							sfx = 'selected'
							>
								{commandInfo[command]} COMMAND
							</StyledButton>
						)
					}
				})}
			</Options>
		</CommandSetterContainer>
	)
}
export default CommandSetter;
const CommandSetterContainer = styled.div`
	width: 100%;
	height: ${props => props.heightMultiplier ? `${(props.heightMultiplier * 40) + ((props.heightMultiplier -1) * 5)}px` : `40px`};
	display: flex;
`
const Request = styled.div`
	height: 100%;
	width: 49%;
	font-size: 1.2em;
	flex-direction: column;
`
const Options = styled.div`
	height: 100%;
	width: 50%;
	flex-direction: column;
`