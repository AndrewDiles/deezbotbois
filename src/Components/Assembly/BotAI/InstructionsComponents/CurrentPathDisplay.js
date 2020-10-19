import React from 'react';
import styled from 'styled-components';
import DirectionsOutputter from './DirectionsOutputter';

const CurrentPathDisplay = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, emptyPath }) => {
	return (		
		<PathContainer
		error = {emptyPath}
		>
			<DisplayLabel className = 'centeredFlex'>
				CURRENT PATH
			</DisplayLabel>
			<Path className = 'centeredFlex'>
				{[0,1,2,3,4].map((index)=>{
					return(
						<DirectionsOutputter
						key = {index}
						activeNodeArray = {activeNodeArray}
						aiAndScripts = {aiAndScripts}
						index = {index}
						/>
					)
				})}
			</Path>
		</PathContainer>
	)
}
export default CurrentPathDisplay;
const PathContainer = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	background: ${props => props.error && 'rgba(255,0,0,0.2)'};
`
const DisplayLabel = styled.div`
	height: 100%;
	width: 30%;
	font-size: 0.8em;
`
const Path = styled.div`
	height: 100%;
	width: 70%;
	/* display: flex; */
`
const Blank = styled.div`
	height: 40px;
	width: 40px;
`