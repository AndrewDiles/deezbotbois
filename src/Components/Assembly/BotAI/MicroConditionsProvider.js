import React from 'react';
import AdjacentToTest from './Conditions/AdjacentToTest';

import PreviousCommandTest from './Conditions/PreviousCommandTest';
import SufficientEnergyTest from './Conditions/SufficientEnergyTest';
import WeaponLoadedTest from './Conditions/WeaponLoadedTest';
import ScanResultsTest from './Conditions/ScanResultsTest';

const MicroConditionsProvider = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts, attributes }) => {
	console.log(nodeInfo)
	if (!nodeInfo || !nodeInfo.name) {
		return (
			<>
			MISSING NODE DATA
			</>
		)
	}
	switch(nodeInfo.name) {
		case 'adjacentTo' : {
			return (
				<AdjacentToTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		case 'aimResults' : {
			return (
				<>
					aims res
				</>
			)
		}
		case 'attribute' : {
			return (
				<>
					attr
				</>
			)
		}
		case 'consecutiveAims' : {
			return (
				<>
					cons aims
				</>
			)
		}
		case 'damageTaken' : {
			return (
				<>
					damage taken
				</>
			)
		}
		case 'distanceToTarget' : {
			return (
				<>
					dist 2 tar
				</>
			)
		}
		case 'obstructionToTarget' : {
			return (
				<>
					obstr 2 tar
				</>
			)
		}
		case 'previousCommand' : {
			return (
				<PreviousCommandTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				attributes = {attributes}
				/>
			)
		}
		case 'scanResults' : {
			return (
				<ScanResultsTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		case 'sufficientEnergy' : {
			return (
				<SufficientEnergyTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				attributes = {attributes}
				/>
			)
		}
		case 'weaponLoaded' : {
			return (
				<WeaponLoadedTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		
		default: {
		}
	}
	
		return (
			<div className = 'innerNodeOptionsWrapper'>
				?{nodeInfo.name}?
			</div>
		)
	}
export default MicroConditionsProvider;