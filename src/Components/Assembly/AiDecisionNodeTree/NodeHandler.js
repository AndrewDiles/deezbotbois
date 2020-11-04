import React from 'react';
import DepthXWrapper from './DepthXWrapper';
import NodeBlock from './NodeBlock';
import ConditionNode from './ConditionNode'
import styled from 'styled-components';

const NodeHandler = ({ decisionObject }) => {
	if (decisionObject.condition) {
		return (
			<Row>
				<ConditionNode
				condition = {decisionObject.condition}
				/>
				<DepthXWrapper
				depthLevel = {decisionObject.condition.depth}
				>
				<BarsContainer>
					<TopSpace/>
					<MetBar/>
					<MidSpace/>
					<UnMetBarTop/>
					<UnMetBar/>
					<UnMetBarContainer>
						<BottomSpace/>
						<UnMetBarBottom/>
					</UnMetBarContainer>
				</BarsContainer>
				</DepthXWrapper>
				<Column>
					<DepthXWrapper
					depthLevel = {decisionObject.condition.depth}
					>
						<Spacer/>
						<NodeBlock
						block = {decisionObject.condition.conditionMet}
						type = 'met'
						/>
						<Spacer/>
						<NodeBlock
						block = {decisionObject.condition.conditionUnMet}
						type = 'unMet'
						/>
					</DepthXWrapper>
				</Column>
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
	/* margin-left: 50px; */
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
	height: 80%;
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