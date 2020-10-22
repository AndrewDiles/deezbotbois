import React from 'react';
import WeaponLoadedTest from './Conditions/WeaponLoadedTest';

const MicroConditionsProvider = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {
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
				<>
					adj to
				</>
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
				<>
					prev co
				</>
			)
		}
		case 'scanResults' : {
			return (
				<>
					scan res
				</>
			)
		}
		case 'sufficientEnergy' : {
			return (
				<>
					suff en
				</>
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