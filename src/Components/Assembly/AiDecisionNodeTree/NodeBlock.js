import React from 'react';
import styled from 'styled-components';
import EmptyNode from './EmptyNode';
import LimbStarter from './LimbStarter';
import testLocalAiAndScript from './testLocalAiAndScript';

const NodeBlock = ({ block, type, id, aiAndScripts, setAiAndScripts, localAiAndScript }) => {
	const [alongPath, setAlongPath] = React.useState(false);
	React.useEffect(()=>{
		if (block.length === 0) {
			let nextActive = testLocalAiAndScript(updateLocalAiAndScript(localAiAndScript, 0),aiAndScripts);
			if (nextActive === 'offPath') setAlongPath(false);
			else setAlongPath(true);
		} else {
			let result = false;
			block.forEach((decisionObject, index)=>{
				if (!result) {
					let nextAcxtive = testLocalAiAndScript(updateLocalAiAndScript(localAiAndScript, index),aiAndScripts);
					if (nextAcxtive !== 'offPath') result = true;
				}
			})
			setAlongPath(result)
		}
	},[block, localAiAndScript, JSON.stringify(aiAndScripts)])

	function updateLocalAiAndScript (local, newIndex) {
		// !!! Spread only created a shallow copy and caused all children to have the same, largest index value
		// let newLocalAiAndScript = [...local];
		let newLocalAiAndScript = JSON.parse(JSON.stringify(local));
		newLocalAiAndScript[newLocalAiAndScript.length-1].index = newIndex;
		return newLocalAiAndScript
	}
	
  return (
			<MasterDepthContainer
			type = {type}
			id = {id && id}
			alongPath = {alongPath}
			>
				{block.length === 0 ? (
					<EmptyNode
					active = {testLocalAiAndScript(updateLocalAiAndScript(localAiAndScript, 0),aiAndScripts)}
					localAiAndScript = {updateLocalAiAndScript(localAiAndScript, 0)}
					setAiAndScripts = {setAiAndScripts}
					/>
				):(
					block.map((decisionObject, index)=>{
						return (
							<LimbStarter
							key = {index}
							index = {index}
							nodeLimb = {decisionObject}
							aiAndScripts = {aiAndScripts}
							setAiAndScripts = {setAiAndScripts}
							localAiAndScript = {updateLocalAiAndScript(localAiAndScript, index)}
							/>
						)
					})
				)}

			</MasterDepthContainer>
  )
}
export default NodeBlock;

const MasterDepthContainer = styled.div`
	/* min-height: 100px; */
	/* height: 100%; */
	width: 175px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	/* justify-content: space-between; */
	align-items: center;
	text-align: center;
	border: ${props => props.type ? (props.type === 'met' ? props.alongPath ? 'lime 4px dashed' : 'lime 2px dashed' : props.alongPath ? 'red 4px dashed' : 'red 2px dashed' ) : ('purple 2px dashed')};
`