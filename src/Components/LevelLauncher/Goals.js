import React from 'react';
import styled from 'styled-components';
import Goal from './Goal';

const Goals = ({ goalInfo, metInfo }) => {
  return (
		<GoalsWrapper>
			{goalInfo.map((goal, index)=>{
				return(
					<Goal
					key = {index}
					goalInfo = {goal}
					met = {metInfo && metInfo[`ach${index+1}`]}
					/>
				)
			})}
		</GoalsWrapper>
  )
}

export default Goals;
const GoalsWrapper = styled.div`
	width: 100%;
	height: 195px;
`