import React from 'react';
import { useSelector } from "react-redux";
import MovementIntentSetter from '../InstructionsComponents/MovementIntentSetter';
import TargetSelector from '../InstructionsComponents/TargetSelector';
import PathEditor from '../InstructionsComponents/PathEditor';
import TargetTypeSelector from '../InstructionsComponents/TargetTypeSelector';
import WarningBar from '../InstructionsComponents/WarningBar';

const MoveCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, attributes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [emptyPath, setEmptyPath] = React.useState(false);

	React.useEffect(()=>{
		console.log('effect triggered, directions:',activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions)

		if (activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 0) {
			setEmptyPath(true)
		} else {
			setEmptyPath(false);
		}
	},[JSON.stringify(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions)])
	if (!userInfo.botBuilds[botNumberSelected]) {
		return <></>
	}
	return (		
		<div className = 'commandContents'>
			<MovementIntentSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.intent === 'collision' &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === true &&
			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetType !== 'hostile' &&
				<>
					<WarningBar>
						INTENTIONAL COLLISION WITH A {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetType.toUpperCase()} IS NOT ADVISED
					</WarningBar>
					<br/>
				</>
			}
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting ? (
				<>
					<TargetTypeSelector
					activeNodeArray = {activeNodeArray}
					setActiveNodeArray = {setActiveNodeArray}
					aiAndScripts = {aiAndScripts}
					botNumberSelected = {botNumberSelected}
					/>
					<br/>
					<TargetSelector
					activeNodeArray = {activeNodeArray}
					setActiveNodeArray = {setActiveNodeArray}
					aiAndScripts = {aiAndScripts}
					botNumberSelected = {botNumberSelected}
					/>
				</>
			) : (
				<PathEditor
				movementDistance = {attributes.MovementDistance}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				emptyPath = {emptyPath}
				botNumberSelected = {botNumberSelected}
				/>
			)}
		</div>
	)
}
export default MoveCommandInstructions;