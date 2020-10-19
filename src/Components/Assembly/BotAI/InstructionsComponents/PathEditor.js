import React from 'react';
import CurrentPathDisplay from './CurrentPathDisplay';
import MovementsRequiredDisplay from './MovementsRequiredDisplay';
import StepSetter from './StepSetter';
import StepRemoval from './StepRemoval';

const PathEditor = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, emptyPath, movementDistance }) => {
	
	return (		
		<>
			<CurrentPathDisplay
			movementDistance = {movementDistance}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			emptyPath = {emptyPath}
			/>
			<StepSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			emptyPath = {emptyPath}
			/>
			<MovementsRequiredDisplay
			movementDistance = {movementDistance}
			activeNodeArray = {activeNodeArray}
			aiAndScripts = {aiAndScripts}
			/>
			<StepRemoval
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			emptyPath = {emptyPath}
			/>
		</>
	)
}
export default PathEditor;