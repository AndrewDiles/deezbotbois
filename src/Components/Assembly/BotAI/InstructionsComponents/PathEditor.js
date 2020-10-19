import React from 'react';
import CurrentPathDisplay from './CurrentPathDisplay';
// import MovementsRequiredDisplay from './MovementsRequiredDisplay';
import StepSetter from './StepSetter';
import StepRemoval from './StepRemoval';

const PathEditor = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, emptyPath }) => {
	
	return (		
		<>
			<CurrentPathDisplay
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			emptyPath = {emptyPath}
			/>
			{/* <MovementsRequiredDisplay
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			/> */}
			<StepSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			emptyPath = {emptyPath}
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