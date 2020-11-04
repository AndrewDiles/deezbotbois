import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import ModularDepthDisplay from './ModularDepthDisplay';
import LimbStarter from './LimbStarter';
import DepthXWrapper from './DepthXWrapper';

const AiDecisionNodeTree = ({ botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [maxDepthReached, setMaxDepthReached] = React.useState([1,2,3]);

	React.useState(()=>{
		//recursively go through scripts to determine new maxDepthReach
	},[ userInfo.botBuilds[botNumberSelected] && JSON.stringify(userInfo.botBuilds[botNumberSelected].script) ])
	
	const depthLevel = 1;
	if (!userInfo.botBuilds || 
		!userInfo.botBuilds[botNumberSelected] ||
		!userInfo.botBuilds[botNumberSelected].script ||
		userInfo.botBuilds[botNumberSelected].script.length === 0) {
		return (<></>)
	}
	console.log('AiDecisionNodeTree proper render')
  return (
    <Wrapper>
			<h3>
			AI DECISION-NODE TREE
			</h3>
			<ModularDepthDisplay
			maxDepthReached = {maxDepthReached}
			/>
			<DepthXWrapper
			depthLevel = {1}
			>
				<MasterDepthContainer>
					{userInfo.botBuilds[botNumberSelected].script.map((nodeLimb, index)=>{
						return (
							<LimbStarter
							key = {index}
							nodeLimb = {nodeLimb}
							firstEntry = {1}
							/>
						)
					})}
				</MasterDepthContainer>
			</DepthXWrapper>
    </Wrapper>
  )
}
export default AiDecisionNodeTree;
const Wrapper = styled.div`
	width: 100%;
	padding-left: 20px;
	/* overflow-x: auto; */
	/* display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center; */

	/* min-height: 600px; */
	/* border: 1px solid rgba(0,0,0,0.1); */
`
const MasterDepthContainer = styled.div`
	height: 100%;
	width: 175px;
	/* overflow-x: auto; */
	/* display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	text-align: center; */
	border: purple 2px dashed;
`