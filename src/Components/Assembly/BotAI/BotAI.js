import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';

import Depth from './Depth';
import Node from './Node';
import NodeDisplay from './NodeDisplay';
// import {moveUp} from 'react-icons-kit/icomoon/moveUp'
// import {moveDown} from 'react-icons-kit/icomoon/moveDown'
// import { findAllByTestId } from '@testing-library/react';

// import {alertTriangle} from 'react-icons-kit/feather/alertTriangle';
import {chevronUp} from 'react-icons-kit/feather/chevronUp';
import {chevronDown} from 'react-icons-kit/feather/chevronDown';
import {cornerDownLeft as insertionPointIcon} from 'react-icons-kit/feather/cornerDownLeft';
import {trash2} from 'react-icons-kit/feather/trash2';

import { sampleAi } from '../../../Constants/botAis/sampleAi';

const BotAI = ({ botNumberSelected, aiAndScripts, setAiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	// const botInfo = userInfo.botBuilds;

	const [activeNodeArray, setActiveNodeArray] = React.useState([]);
	React.useEffect(()=>{
		if (!userInfo.botBuilds) return
		setActiveNodeArray(getNodeArray(userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing ))
	},[setActiveNodeArray, botNumberSelected, userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing])

// Need to reset insertion upon navigation and changing of nodes

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

	console.log(`${activeNodeArray} from bot AI`)

  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			<h3>
				AI
			</h3>
			<Depth
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			/>
			<Node
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			activeNodeArray = {activeNodeArray}
			/>
			{/* <h5>
				NODE NUMBER: {aiAndScripts.viewing[aiAndScripts.viewing.length-1].index}
			</h5> */}
			{/* Previous Decision Made Display */}
			<NodeDisplay
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			activeNodeArray = {activeNodeArray}
			/>
    </Wrapper>
  )
}
export default BotAI;
const Wrapper = styled.div`
	width: 250px;
`