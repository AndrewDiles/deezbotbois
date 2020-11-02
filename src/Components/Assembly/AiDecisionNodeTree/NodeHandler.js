import React from 'react';
// import styled from 'styled-components';

const NodeHandler = ({ decisionObject }) => {
	if (decisionObject.condition) {
		// continue branching
		return (
			<div>
				{decisionObject.condition.name}
			</div>
		)
	} else if (decisionObject.command) {
		// end of twig
		return (
			<div>
				{decisionObject.command.name}
			</div>
		)
	} else {
		//return blank, no entry
		return (
			<></>
		)
	}
}
export default NodeHandler;