import React from 'react';
import MovementIntentSetter from '../InstructionsComponents/MovementIntentSetter';
import TargetSelector from '../InstructionsComponents/TargetSelector';
import PathEditor from '../InstructionsComponents/PathEditor';

const MoveCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, attributes }) => {
	const [emptyPath, setEmptyPath] = React.useState(false);

	React.useEffect(()=>{
		console.log('effect triggered, directions:',activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions)

		if (activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 0) {
			setEmptyPath(true)
		} else {
			setEmptyPath(false);
		}
	},[JSON.stringify(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions)])

	return (		
		<div className = 'commandContents'>
			<MovementIntentSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			/>
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting ? (
				<TargetSelector
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				/>
			) : (
				<PathEditor
				movementDistance = {attributes.MovementDistance}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				emptyPath = {emptyPath}
				/>
			)}
		</div>
	)
}
export default MoveCommandInstructions;