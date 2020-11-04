import React from 'react';
import styled from 'styled-components';

const BranchLineDisplay = ({ condition, command }) => {
  return (
		<LineContainer 
		className = 'centeredFlex'
		depthLevel = {condition.depth || command.depth}
		>
			{condition && 
				<div className = 'centeredFlex'>
					<ColoredLine
					color = 'lime'
					/>
					<ColoredLine
					color = 'red'
					/>
				</div>
			}
			<div className = 'centeredFlex'>
				{command &&
					<ColoredLine
					color = 'blue'
					/>
				}
			</div>
		</LineContainer>
  )
}
export default DepthXWrapper;

const LineContainer = styled.div`
	width: 50px;
	background-color: ${props => props.depthLevel < 27 ? `rgba(${201+2*props.depthLevel},${201+2*props.depthLevel},${201+2*props.depthLevel},0.1)` : 'rgba(254,254,254,0.2'};
`
const ColoredLine = styled.div`
	height: 5px;
	width: 50px;
	background-color: ${props => props.color};
`