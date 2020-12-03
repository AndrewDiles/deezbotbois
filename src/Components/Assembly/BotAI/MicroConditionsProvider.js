import React from 'react';
import AdjacentToTest from './Conditions/AdjacentToTest';
import AimResultsTest from './Conditions/AimResultsTest';
import AttributeTest from './Conditions/AttributeTest';
import ConsecutiveAimsTest from './Conditions/ConsecutiveAimsTest';
import DamageTakenTest from './Conditions/DamageTakenTest';
import DistanceToTest from './Conditions/DistanceToTest';
import ObstructionToTest from './Conditions/ObstructionToTest';
import PreviousCommandTest from './Conditions/PreviousCommandTest';
import SufficientEnergyTest from './Conditions/SufficientEnergyTest';
import SwitchTest from './Conditions/SwitchTest';
import WeaponLoadedTest from './Conditions/WeaponLoadedTest';
import ScanResultsTest from './Conditions/ScanResultsTest';

const MicroConditionsProvider = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts, attributes }) => {
	// console.log({nodeInfo})
	if (!nodeInfo || !nodeInfo.name) {
		return (
			<>
				<br/>
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
				<AimResultsTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		case 'attribute' : {
			return (
				<AttributeTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		case 'consecutiveAims' : {
			return (
				<ConsecutiveAimsTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		case 'damageTaken' : {
			return (
				<DamageTakenTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		case 'distanceToTarget' : {
			return (
				<DistanceToTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)
		}
		case 'obstructionToTarget' : {
			return (
				<ObstructionToTest
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
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
		case 'switch' : {
			return (
				<SwitchTest
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