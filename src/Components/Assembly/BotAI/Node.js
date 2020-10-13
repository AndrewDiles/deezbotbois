import React from 'react';
// import { useSelector } from "react-redux";
import styled from 'styled-components';
import MacroNodeOptions from './MacroNodeOptions';

const Node = ({ activeNodeArray, nodeInfo, botNumberSelected, aiAndScripts, setAiAndScripts, setDeleteActive, deleteActive }) => {
	// console.log({nodeInfo})
	// console.log(nodeInfo.condition.name)
  return (
    <Wrapper>
			<MacroNodeOptions
			activeNodeArray = {activeNodeArray}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			botNumberSelected = {botNumberSelected}
			setDeleteActive = {setDeleteActive}
			deleteActive = {deleteActive}
			/>
			{!deleteActive &&
				<>
				<br/>
				{nodeInfo.condition.name}
				</>
			}
			
    </Wrapper>
  )
}
export default Node;
const Wrapper = styled.div`
	width: 100%;
	height: 557px;
	display: flex;
	flex-direction: column;
	justify-content: column;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`