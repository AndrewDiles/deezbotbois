import React from 'react';
import DepthXWrapper from './DepthXWrapper';
import NodeBlock from './NodeBlock';
import ConditionNode from './ConditionNode'
import styled from 'styled-components';
import testLocalAiAndScript from './testLocalAiAndScript';
import testNextLocalAiAndScript from './testNextLocalAiAndScrip';

const NodeHandler = ({ index, decisionObject, aiAndScripts, setAiAndScripts, localAiAndScript }) => {
	const [metNodeHeight, setMetNodeHeight] = React.useState(0);
	React.useEffect(()=>{
		function updateHeight () {
			let target = document.getElementById(JSON.stringify(localAiAndScript));
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
	let metActive = testNextLocalAiAndScript(localAiAndScript,aiAndScripts, 'conditionTrue', active);
	let unMetActive = testNextLocalAiAndScript(localAiAndScript,aiAndScripts, 'conditionFalse', active);

	if (decisionObject.condition) {
		return (
			<Row>
				<ConditionNode
				aiAndScripts = {aiAndScripts}
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
						<MetBar active = {metActive}/>
						<MidSpace/>
						<UnMetBarTop active = {unMetActive}/>
						<UnMetBar
						metNodeHeight = {metNodeHeight}
						active = {unMetActive}
						/>
						<UnMetBarContainer>
							<BottomSpace/>
							<UnMetBarBottom active = {unMetActive}/>
						</UnMetBarContainer>
					</BarsContainer>
				</DepthXWrapper>
				<Column>
					<DepthXWrapper
					depthLevel = {decisionObject.condition.depth}
					>
						<NodeBlock
						id = {JSON.stringify(localAiAndScript)}
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
						<Spacer/>
					</DepthXWrapper>
				</Column>
			</Row>
		)
	} 
	else {
		return (
			<>
				{decisionObject}
			</>
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
	height: 10px;
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
	opacity: ${props => props.active && props.active === 'onPath' ? '1' : '0.3'};
	transition: opacity .5s;
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
	opacity: ${props => props.active && props.active === 'onPath' ? '1' : '0.3'};
	transition: opacity .5s;
`
const UnMetBar = styled.div`
	height: ${props => props.metNodeHeight && `${props.metNodeHeight-50}px`};
	transition: height 1s, opacity .5s;
	width: 12px;
	border-right: red 5px solid;
	opacity: ${props => props.active && props.active === 'onPath' ? '1' : '0.3'};
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
	opacity: ${props => props.active && props.active === 'onPath' ? '1' : '0.3'};
	transition: opacity .5s;
`