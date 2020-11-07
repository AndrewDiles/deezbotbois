import React from 'react';
import DepthXWrapper from './DepthXWrapper';
import NodeBlock from './NodeBlock';
import ConditionNode from './ConditionNode'
import styled from 'styled-components';
import testLocalAiAndScript from './testLocalAiAndScript';

const NodeHandler = ({ index, decisionObject, aiAndScripts, setAiAndScripts, localAiAndScript }) => {
	const rand = Math.random();
	const [metNodeHeight, setMetNodeHeight] = React.useState(0);
	React.useEffect(()=>{
		function updateHeight () {
			let target = document.getElementById(rand);
			if (target) {
				setMetNodeHeight(target.getBoundingClientRect().height);
			}
		}
		updateHeight();
		const timedHeightUpdate = setTimeout(()=>{
			updateHeight();
		},500)
		return () => clearTimeout(timedHeightUpdate)
	})

	function addCaseToLocal (local, type) {
		if (local === undefined) {
			return local
		}
		// let newLocalAiAndScript = [...local];
		let newLocalAiAndScript = JSON.parse(JSON.stringify(local));
		newLocalAiAndScript.push({type: type, index: 0})
		return newLocalAiAndScript
	}

	let active = testLocalAiAndScript(localAiAndScript,aiAndScripts);

	if (decisionObject.condition) {
		return (
			<Row>
				<ConditionNode
				setAiAndScripts = {setAiAndScripts}
				index = {index}
				condition = {decisionObject.condition}
				active = {active}
				localAiAndScript = {localAiAndScript}
				/>
				<DepthXWrapper
				depthLevel = {decisionObject.condition.depth -1}
				width = {25}
				>
					<BarsContainer>
						<TopSpace/>
						<MetBar/>
						<MidSpace/>
						<UnMetBarTop/>
						<UnMetBar
						metNodeHeight = {metNodeHeight}
						/>
						<UnMetBarContainer>
							<BottomSpace/>
							<UnMetBarBottom/>
						</UnMetBarContainer>
					</BarsContainer>
				</DepthXWrapper>
				{/* {(decisionObject.condition.conditionMet.length > 0 || decisionObject.condition.conditionUnMet.length > 0) && */}
					<Column>
						<DepthXWrapper
						depthLevel = {decisionObject.condition.depth}
						>
							<Spacer/>
							<NodeBlock
							id = {rand}
							block = {decisionObject.condition.conditionMet}
							type = 'met'
							aiAndScripts = {aiAndScripts}
							setAiAndScripts ={setAiAndScripts}
							localAiAndScript = {addCaseToLocal(localAiAndScript, 'conditionTrue')}
							/>
							<Spacer/>
							<NodeBlock
							block = {decisionObject.condition.conditionUnMet}
							type = 'unMet'
							aiAndScripts = {aiAndScripts}
							setAiAndScripts = {setAiAndScripts}
							localAiAndScript = {addCaseToLocal(localAiAndScript, 'conditionFalse')}
							/>
						</DepthXWrapper>
					</Column>
				{/* } */}
			</Row>
		)
	} 
	else {
		return (
			<>{decisionObject}</>
		)
	}
}
export default NodeHandler;
const Row = styled.div`
	display: flex;
	/* margin-left: 200px; */
`
const Column = styled.div`
	display: flex;
	flex-direction: column;
`
const Spacer = styled.div`
	height: 60px;
`
const BarsContainer = styled.div`
	height: 100%;
	width: 25px;
`
const TopSpace = styled.div`
	height: 34px;
`
const MetBar = styled.div`
	height: 5px;
	width: 25px;
	background-color: lime;
`
const MidSpace = styled.div`
	height: 22px;
`
const UnMetBarTop = styled.div`
	height: 12px;
	width: 12px;
	border-top: red 5px solid;
	border-right: red 5px solid;
	border-radius: 0 50% 0 0;
`
const UnMetBar = styled.div`
	height: ${props => props.metNodeHeight && `${props.metNodeHeight}px`};
	transition: height 1s;
	width: 12px;
	border-right: red 5px solid;
`
const UnMetBarContainer = styled.div`
	display: flex;
`
const BottomSpace = styled.div`
	width : 7px;
`
const UnMetBarBottom = styled.div`
	height: 18px;
	width: 18px;
	border-left: red 5px solid;
	border-bottom: red 5px solid;
	border-radius: 0 0 0 50%;
`