import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import ModularDepthDisplay from './ModularDepthDisplay';
import LimbStarter from './LimbStarter';

import DepthXWrapper from './DepthXWrapper';

// import { comprehensiveStatsAdditive, comprehensiveStatsMultiplicative, comprehensiveStatsBool } from '../../../Constants/attributes';

const AiDecisionNodeTree = ({ botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const [maxDepthReached, setMaxDepthReached] = React.useState([1]);
	React.useState(()=>{
		//recursively go through scripts to determine new maxDepthReach
	})
	const depthLevel = 1;
	if (!userInfo.botBuilds || 
		!userInfo.botBuilds[botNumberSelected] ||
		!userInfo.botBuilds[botNumberSelected].scripts ||
		userInfo.botBuilds[botNumberSelected].scripts.length === 0) {
		return (<></>)
	}
	
  return (
    <Wrapper>
			<h3>
			AI DECISION-NODE TREE
			</h3>
			<ModularDepthDisplay
			maxDepthReached = {maxDepthReached}
			/>
			<MasterDepthContainer>

			{userInfo.botBuilds[botNumberSelected].scripts.map((nodeLimb)=>{
				return (
					<LimbStarter
					nodeLimb = {nodeLimb}
					/>
				)
			})}
				{/* <DepthXWrapper depthLevel = {depthLevel}>
					<StyledUl>
						<StyledLi>
							Info1
						</StyledLi>
						<StyledLi>
							Info2
						</StyledLi>
						<StyledLi>
							Info3
						</StyledLi>
					</StyledUl>
				</DepthXWrapper> */}
			</MasterDepthContainer>
			
			{/* <DepthXWrapper depthLevel = {depthLevel}>
				{userInfo.botBuilds[botNumberSelected].script.length > 0 ? (
					userInfo.botBuilds[botNumberSelected].script.map((node, index)=>{
						return (
							<div key = {index}>
								NODE HERE
							</div>
						)
					})
				):(
					<div>
						AI EMPTY
					</div>
				)}
			</DepthXWrapper> */}
    </Wrapper>
  )
}
export default AiDecisionNodeTree;
const StyledUl = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100px;
	padding: 0px;
	margin: 0px;
`
const StyledLi = styled.li`
	width: 100%;
	height: 40px;
	white-space: pre-wrap;
	list-style: none;
`
const Wrapper = styled.div`
	width: 100%;
	/* padding: 20px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center; */

	/* min-height: 600px; */
	/* border: 1px solid rgba(0,0,0,0.1); */
`
const MasterDepthContainer = styled.div`
	height: 100%;
	width: 100%;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center;
`
// const Depth1Wrapper = styled.div`
// 	width: 120px;
// 	height: 100%;
// 	padding: 20px;

// `