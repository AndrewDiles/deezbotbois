import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import {moveUp} from 'react-icons-kit/icomoon/moveUp'
// import {moveDown} from 'react-icons-kit/icomoon/moveDown'
// import {alertTriangle} from 'react-icons-kit/feather/alertTriangle';
// import { findAllByTestId } from '@testing-library/react';

const BotAI = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	// const botInfo = userInfo.botBuilds;

	if (!userInfo.botBuilds) {
		return (<></>)
	}

	// cells will have both a row and col number.
	// cells will have a height / width = `${cellSize}px`
	// bots will have a cell location, represented by the row / col numbers

	// helper functions needed:
	
	// determine path from CENTER CELL to center of another cell
	// determine actual distance from center of one cell to center of another
	// scan: given CENTER CELL, a distance and array of all object locations, returns an array with all objects within distance and the path to them (UDLR)
	// auto scan: given
	// script object looks like:

	// another condition: lastTurn, case: aimed at scanned target
	const script = [
		{
			command: {
				name: 'chargeCommand',
				direction: 'RRR',
				// will use either direciton or target but not both
				// target: 'autoScan1',
				weapon: 'arm1'
			},
			conditionDepth: 3,
			condition: {
				name: 'damageTaken',
				magnitude: '>2',
				conditionMet: [
					{
						command: {
							name: 'moveCommand',
							direction: 'DD',
							// will use either direciton or target but not both
							target: 'corner', // or nearestWall, farthestWall or autoScan2
							type: 'onto', //or adjacent
						}
					}
				],
				conditionUnmet: [
					{
						conditionDepth: 2,
						condition: {
							name: 'durability',
							magnitude: '<10',
							conditionMet: [
								{
									command: {
										name: 'repairCommand'
									}
								}
							],
							conditionUnmet: [
								{
									conditionDepth: 1,
									condition: {
										name: 'enemyScanned',
										source: 'scan', // could aldo be autoscan
										conditionMet: [
											{
												conditionDepth: 0,
												condition: {
													name: 'weaponLoaded',
													weapon: 'arm2',
													conditionMet: [
														{
															command: {
																name: 'rangedAttackCommand',
																// direction: 'RRR',
																// will use either direciton or target but not both
																target: 'scan2',
																weapon: 'arm2'
															},
														}
													],
													conditionUnmet: [
														{
															command: {
																name: 'waitCommand',
															}
														}
													]
												}
											}
										],
										conditionUnmet: [
											{
												command: {
													name: 'scanCommand',
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			Bot ai
    </Wrapper>
  )
}
export default BotAI;
const Wrapper = styled.div`
	width: 250px;
`