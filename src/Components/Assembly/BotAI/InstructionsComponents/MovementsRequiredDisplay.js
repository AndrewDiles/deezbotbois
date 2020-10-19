import React from 'react';
import styled from 'styled-components';
import { movesAlongPath } from '../../../../Constants/helperFunctions';
import WarningBar from './WarningBar';

const MovementsRequiredDisplay = ({ movementDistance, activeNodeArray, aiAndScripts }) => {
	return (
		<>
			<Wrapper
			className = 'centeredFlex'
			error = {movesAlongPath(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions) > movementDistance}
			>
				MOVEMENT USED:
				{movesAlongPath(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions)}
				/
				{movementDistance}
			</Wrapper>
			{movesAlongPath(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions) > movementDistance &&
			<WarningBar>
				MAXIMUM MOVEMENT DISTANCE EXCEEDED
			</WarningBar>
			}
		</>
	)
}
export default MovementsRequiredDisplay;
const Wrapper = styled.div`
	width: 100%;
	min-height: 40px;
	display: flex;
	background: ${props => props.error && 'rgba(255,0,0,0.2)'};
`
// const Request = styled.div`
// 	height: 100%;
// 	width: 49%;
// `
// const Options = styled.div`
// 	height: 100%;
// 	width: 50%;
// 	flex-direction: column;
// `