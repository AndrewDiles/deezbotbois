import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import conditionsList, { conditionsData } from '../../../Constants/conditions';
import AddIcon from './AddIcon';
import styled from 'styled-components';

const Conditions = ({ aiInesertionPoint }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <Wrapper>
      <h3>
				CONDITIONS
			</h3>
			<Options>
				{conditionsList.map((conditionOption)=>{
					return (
					<RowDiv
					key = {conditionOption}
					>
						{conditionsData[conditionOption].name}
						<AddIcon
						aiInesertionPoint = {aiInesertionPoint}
						/>
					</RowDiv>
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
const Options = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	flex-direction: column;
	overflow-y: auto;
	width: 250px;
	height: 500px;
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
`