import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import conditionsList, { conditionsData } from '../../../Constants/conditions';
import AddIcon from './AddIcon';
import styled from 'styled-components';
import ConditionRow from './ConditionRow';

const Conditions = ({ botNumberSelected, aiAndScripts, setAiAndScripts, activeNodeArray, setActiveNodeArray }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <Wrapper>
      <p>
				CONDITIONS
			</p>
			<Options>
				{conditionsList.map((conditionOption)=>{
					return (
						<ConditionRow
						key = {conditionOption}
						conditionOption = {conditionOption}
						aiAndScripts = {aiAndScripts}
						setAiAndScripts = {setAiAndScripts}
						activeNodeArray = {activeNodeArray}
						setActiveNodeArray = {setActiveNodeArray}
						botNumberSelected = {botNumberSelected}
						/>
					// <RowDiv
					// key = {conditionOption}
					// >
					// 	<ConditionName
					// 	className = 'centeredFlex'
					// 	// colors = {colors}
					// 	>
					// 		{conditionsData[conditionOption].name}
					// 	</ConditionName>
					// 	<AddIcon
					// 	aiAndScripts = {aiAndScripts}
					// 	decisionName = {conditionOption}
					// 	/>
					// </RowDiv>
					)
				})}
			</Options>
    </Wrapper>
  )
}
export default Conditions;

const Wrapper = styled.div`
	height: 600px;
`
const ConditionName = styled.p`
	height: 40px;
	width: 200px;
	margin: 0;
`
const Options = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	flex-direction: column;
	overflow-y: auto;
	width: 250px;
	height: 555px;
	border-top: 1px solid rgba(0,0,0,0.24);
`
const RowDiv = styled.div`
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