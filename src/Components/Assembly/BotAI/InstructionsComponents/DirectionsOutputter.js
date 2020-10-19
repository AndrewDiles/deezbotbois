import React from 'react';
import styled from 'styled-components';
import SingleDirectionOutputter from './SingleDirectionOutputter';

const DirectionOutputter = ({ activeNodeArray, aiAndScripts, index }) => {
	
	return activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions[index] ? (
		<SingleDirectionOutputter
		direction = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions[index]}
		/>
	) : (
		<Blank/>
	)
}
export default DirectionOutputter;
const Blank = styled.div`
	height: 40px;
	/* width: 40px; */
`