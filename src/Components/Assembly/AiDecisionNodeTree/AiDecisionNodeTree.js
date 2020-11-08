import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import ModularDepthDisplay from './ModularDepthDisplay';
import LimbStarter from './LimbStarter';
import DepthXWrapper from './DepthXWrapper';

const AiDecisionNodeTree = ({ botNumberSelected, aiAndScripts, setAiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [globalAiAndScripts, setGlobalAiAndScripts] = React.useState(aiAndScripts);

	React.useEffect(()=>{
		setGlobalAiAndScripts(aiAndScripts);
	},[JSON.stringify(aiAndScripts)])
	
	if (!userInfo.botBuilds || 
		!userInfo.botBuilds[botNumberSelected] ||
		!userInfo.botBuilds[botNumberSelected].script ||
		userInfo.botBuilds[botNumberSelected].script.length === 0) {
		return (<></>)
	}
	const depthLevel = 1;
  return (
    <Wrapper>
			<h3>
			AI DECISION-NODE TREE
			</h3>
			<ModularDepthDisplay
			botNumberSelected = {botNumberSelected}
			/>
			<DepthXWrapper
			depthLevel = {depthLevel}
			>
				<MasterDepthContainer>
					{userInfo.botBuilds[botNumberSelected].script.map((nodeLimb, index)=>{
						return (
							<LimbStarter
							key = {index}
							index = {index}
							nodeLimb = {nodeLimb}
							firstEntry = {1}
							aiAndScripts = {globalAiAndScripts.viewing}
							setAiAndScripts = {setAiAndScripts}
							depthLevel = {depthLevel}
							localAiAndScript = {[{type: 'head', index: index}]}
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
	animation: 0.4s ease-out expand;
	/* background-image: linear-gradient(to right, rgba(116,35,231,0.2), rgba(8,35,15,.2)); */
	
`
const MasterDepthContainer = styled.div`
	height: 100%;
	width: 175px;
	/* overflow-x: auto; */
	border: purple 4px dashed;
`