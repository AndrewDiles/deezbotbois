import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import {moveUp} from 'react-icons-kit/icomoon/moveUp'
// import {moveDown} from 'react-icons-kit/icomoon/moveDown'
// import { findAllByTestId } from '@testing-library/react';

// import {alertTriangle} from 'react-icons-kit/feather/alertTriangle';
import {chevronUp} from 'react-icons-kit/feather/chevronUp';
import {chevronDown} from 'react-icons-kit/feather/chevronDown';
import {cornerDownLeft as insertionPointIcon} from 'react-icons-kit/feather/cornerDownLeft';
import {trash2} from 'react-icons-kit/feather/trash2';

import { sampleAi } from '../../../Constants/botAis/sampleAi';

const BotAI = ({ botNumberSelected, aiInesertionPoint, setAiInsertionPoint }) => {
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

	// command: {
	// 	name: 'chargeCommand',
	// 	direction: 'RRR',
	// 	// will use either direciton or target but not both
	// 	// target: 'autoScan1',
	// 	weapon: 'arm1'
	// },


	const script = [
		{
			conditionDepth: 1,
			condition: {
				name: 'damageTaken',
				test: {
					evaluationType: '>',
					threshold: '2',
				},
				conditionMet: [
					{
						conditionDepth: 2,
						condition: {
							name: 'adjacentTo',
							test: {
								testTargets: 'any',
								evaluationType: '=',
								testReturn: 'D'
							},
						},
						conditionMet : [
							{
								command: {
									name: 'moveCommand',
									direction: 'UU',
									target: null, // src, #
									type: null, //or onto, adjacent, or null if no target
								}
							}
						],
						conditionUnmet : [
							{
								command: {
									name: 'moveCommand',
									direction: 'DD',
									target: null,
									type: null,
								}
							}
						],
					}
				],
				conditionUnmet: [
					{
						conditionDepth: 2,
						condition: {
							name: 'durability',
							test: {
								evaluationType: '<',
								threshold: '10',
							},
							
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
			<h3>
				AI
			</h3>
    </Wrapper>
  )
}
export default BotAI;
const Wrapper = styled.div`
	width: 250px;
`