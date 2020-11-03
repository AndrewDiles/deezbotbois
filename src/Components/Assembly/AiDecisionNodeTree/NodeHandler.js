import React from 'react';
import NodeBlock from './NodeBlock';
import ConditionNode from './ConditionNode'
import styled from 'styled-components';

const NodeHandler = ({ decisionObject }) => {
	if (decisionObject.condition) {
		// continue branching
		return (
			<Row>
				<ConditionNode
				condition = {decisionObject.condition}
				/>
				{/* bars */}
				<Column>
					<NodeBlock
					block = {decisionObject.condition.met}
					type = 'met'
					/>
					<NodeBlock
					block = {decisionObject.condition.unMet}
					type = 'unMet'
					/>
				</Column>
			</Row>
		)
	} 
	// else if (decisionObject.command) {
	// 	// end of twig
	// 	return (
	// 		<div>
	// 			{decisionObject.command.name}
	// 		</div>
	// 	)
	// } 
	else {
		//return blank, no entry
		return (
			<></>
		)
	}
}
export default NodeHandler;
const Row = styled.div`
	display: flex;
`
const Column = styled.div`
	display: flex;
	flex-direction: column;
`