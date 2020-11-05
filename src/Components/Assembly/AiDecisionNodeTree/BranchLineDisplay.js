// To be removed
// import React from 'react';
// import styled from 'styled-components';

// const BranchLineDisplay = ({ condition, command }) => {
//   return (
// 		<LineContainer 
// 		className = 'centeredFlex'
// 		depthLevel = {condition.depth || command.depth}
// 		>
// 			{condition && 
// 				<div className = 'centeredFlex'>
// 					<ColoredLine
// 					color = 'lime'
// 					/>
// 					<ColoredLine
// 					color = 'red'
// 					/>
// 				</div>
// 			}
// 			<div className = 'centeredFlex'>
// 				{command &&
// 					<ColoredLine
// 					color = 'blue'
// 					/>
// 				}
// 			</div>
// 		</LineContainer>
//   )
// }
// export default BranchLineDisplay;

// const LineContainer = styled.div`
// 	width: 50px;
// 	background-color: ${props => props.depthLevel < 20 ? `rgba(${100-5*props.depthLevel},${100-5*props.depthLevel},${100-5*props.depthLevel},0.2)` : 'rgba(0,0,0,0.2'};
// `
// const ColoredLine = styled.div`
// 	height: 5px;
// 	width: 50px;
// 	background-color: ${props => props.color};
// `