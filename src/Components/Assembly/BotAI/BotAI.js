import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import Depth from './Depth';
import PreviousCondition from './PreviousCondition';
import NodeSelector from './NodeSelector';
import NodeDisplay from './NodeDisplay';
import ErrorTitle from './ErrorTitle'; 

const BotAI = ({ botNumberSelected, aiAndScripts, setAiAndScripts, activeNodeArray, setActiveNodeArray, aiErrors, attributes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [deleteActive, setDeleteActive] = React.useState(false);

	if (!userInfo.botBuilds) {
		return (<></>)
	}

  return (
    <Wrapper
		className = "assemblyGridChild"
		aiErrors = {aiErrors.length>0}
		>
			{aiErrors.length > 0 ? (
				<ErrorTitle 
				aiErrors = {aiErrors}
				/>
			) : (
				<h3>
					AI
				</h3>
			)}
			
			<Depth
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			setDeleteActive = {setDeleteActive}
			/>
			<PreviousCondition
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<NodeSelector
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			activeNodeArray = {activeNodeArray}
			setDeleteActive = {setDeleteActive}
			/>
			<NodeDisplay
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
			setAiAndScripts = {setAiAndScripts}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			setDeleteActive = {setDeleteActive}
			deleteActive = {deleteActive}
			attributes = {attributes}
			/>
    </Wrapper>
  )
}
export default BotAI;
const Wrapper = styled.div`
	width: 250px;
	background: ${props => props.aiErrors ? 'rgba(255, 0, 0, 0.2)' : ''};
`