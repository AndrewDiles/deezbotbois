import React from 'react';

const MicroConditionsProvider = ({ nodeInfo, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {
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
				<>
					wep loaded
				</>
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