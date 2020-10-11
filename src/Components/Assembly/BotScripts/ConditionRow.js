import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import conditionsList, { conditionsData } from '../../../Constants/conditions';
import AddIcon from './AddIcon';
import styled from 'styled-components';
import NodeInsersionIndicator from './NodeInsersionIndicator';

const ConditionRow = ({ botNumberSelected, aiAndScripts, conditionOption, activeNodeArray, setActiveNodeArray }) => {
	const [helpNeeded, setHelpNeeded] = React.useState(false);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);

  return helpNeeded ? 
		<NodeInsersionIndicator
		setHelpNeeded = {setHelpNeeded}
		/>
		:
		<Wrapper
		key = {conditionOption}
		>
			<ConditionName
			className = 'centeredFlex'
			// colors = {colors}
			>
				{conditionsData[conditionOption].name}
			</ConditionName>
			<AddIcon
			aiAndScripts = {aiAndScripts}
			decisionName = {conditionOption}
			setHelpNeeded = {setHelpNeeded}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			botNumberSelected = {botNumberSelected}
			/>
		</Wrapper>
}
export default ConditionRow;

const ConditionName = styled.p`
	height: 40px;
	width: 200px;
	margin: 0;
`
const Wrapper = styled.div`
	height: 50px;
	width: 250px;
	display: flex;
	align-items: center;
	text-align: center;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 10px;
	border-bottom: 1px solid rgba(0,0,0,0.24);
	margin: 5px, 0;
`