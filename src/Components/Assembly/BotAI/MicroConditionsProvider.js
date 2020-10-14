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
			break;
		}
		case 'aimResults' : {
			return (
				<>
					aims res
				</>
			)
			break;
		}
		case 'attribute' : {
			return (
				<>
					attr
				</>
			)
			break;
		}
		case 'consecutiveAims' : {
			return (
				<>
					cons aims
				</>
			)
			break;
		}
		case 'damageTaken' : {
			return (
				<>
					damage taken
				</>
			)
			break;
		}
		case 'distanceToTarget' : {
			return (
				<>
					dist 2 tar
				</>
			)
			break;
		}
		case 'obstructionToTarget' : {
			return (
				<>
					obstr 2 tar
				</>
			)
			break;
		}
		case 'previousCommand' : {
			return (
				<>
					prev co
				</>
			)
			break;
		}
		case 'scanResults' : {
			return (
				<>
					scan res
				</>
			)
			break;
		}
		case 'sufficientEnergy' : {
			return (
				<>
					suff en
				</>
			)
			break;
		}
		case 'weaponLoaded' : {
			return (
				<>
					wep loaded
				</>
			)
			break;
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