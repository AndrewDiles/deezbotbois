import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import ModularDepthDisplay from './ModularDepthDisplay';
import LimbStarter from './LimbStarter';
import DepthXWrapper from './DepthXWrapper';

const AiDecisionNodeTree = ({ botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	
	const depthLevel = 1;
	if (!userInfo.botBuilds || 
		!userInfo.botBuilds[botNumberSelected] ||
		!userInfo.botBuilds[botNumberSelected].script ||
		userInfo.botBuilds[botNumberSelected].script.length === 0) {
		return (<></>)
	}
	console.log({botNumberSelected})
	
  return (
    <Wrapper>
			<h3>
			AI DECISION-NODE TREE
			</h3>
			<ModularDepthDisplay
			botNumberSelected = {botNumberSelected}
			/>
			<DepthXWrapper
			depthLevel = {1}
			>
				<MasterDepthContainer>
					{userInfo.botBuilds[botNumberSelected].script.map((nodeLimb, index)=>{
						return (
							<LimbStarter
							key = {index}
							index = {index}
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
	/* background-image: linear-gradient(to right, rgba(116,35,231,0.2), rgba(8,35,15,.2)); */
	
`
const MasterDepthContainer = styled.div`
	height: 100%;
	width: 175px;
	/* overflow-x: auto; */
	border: purple 2px dashed;
`