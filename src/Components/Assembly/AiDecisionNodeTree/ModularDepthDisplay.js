import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const ModularDepthDisplay = ({ botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [maxDepthReached, setMaxDepthReached] = React.useState([]);

	React.useEffect(()=>{
		//recursively go through scripts to determine new maxDepthReach

		// setting bail in the event that there is no script
		// console.log('use State to update max depth Reached triggered');
		if (!userInfo.botBuilds || !userInfo.botBuilds[botNumberSelected] ||
			userInfo.botBuilds[botNumberSelected].script.length === 0) {
				setMaxDepthReached([]);
				return;
			}
		// console.log('updating depth levels')
		let currentMaxDepth = 0;
		function digForDepth(currentSciptObject) {
			if (currentSciptObject.condition) {
				if (currentSciptObject.condition.depth > currentMaxDepth) {
					// console.log('new high of ', currentSciptObject.condition.depth);
					currentMaxDepth ++;
				}
				if (currentSciptObject.condition.conditionMet.length > 0) {
					currentSciptObject.condition.conditionMet.forEach((scriptObject)=>{
						digForDepth(scriptObject);
					})
				}
				if (currentSciptObject.condition.conditionUnMet.length > 0) {
					currentSciptObject.condition.conditionUnMet.forEach((scriptObject)=>{
						digForDepth(scriptObject);
					})
				}
				let replacementMaxDepthReached = [];
				for (let i = 0; i < currentMaxDepth; i++){
					replacementMaxDepthReached.push(i+1);
				}
				setMaxDepthReached(replacementMaxDepthReached);
			}
		}
		userInfo.botBuilds[botNumberSelected].script.forEach((scriptObject)=>{
			digForDepth(scriptObject);
		})
	},
	[ botNumberSelected, userInfo.botBuilds[botNumberSelected] && JSON.stringify(userInfo.botBuilds[botNumberSelected].script) ]);
	if (maxDepthReached.length === 0) {
		return <></>
	}

  return (
		<DepthDisplayWrapper
		width = {200*(maxDepthReached.length+1)}
		>
			{maxDepthReached.map((depthLevel)=>{
				return (
					<DepthLabel
					key = {depthLevel}
					depthLevel = {depthLevel}
					className = 'centeredFlex'
					>
						DEPTH LV {depthLevel}
					</DepthLabel>
				)
			})}
			<DepthLabel
			depthLevel = {maxDepthReached[maxDepthReached.length-1]+1}
			className = 'centeredFlex'
			final = {1}
			>
				CONDITIONLESS DEPTH LV {maxDepthReached[maxDepthReached.length-1]+1}
			</DepthLabel>
		</DepthDisplayWrapper>
  )
}
export default ModularDepthDisplay;

const DepthDisplayWrapper = styled.div`
	width: ${props => props.width && `${props.width}px`};
	height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	/* align-items: center;
	text-align: center; */
`

// const LimbRowWrapper = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: start;
// 	align-items: center;
// 	text-align: center;
// 	margin-left: ${props => props.firstEntry ? '0px' : props.containsCommand ? '0px' : '200px'};
// `
const DepthLabel = styled.div`
	text-indent: -25px;
	padding: 5px 10px;
	width: ${props => props.final ? '175px' : '200px'};
	height: 100%;
	font-size: 0.7em;
	/* background-color: ${props => props.depthLevel < 12 ? `rgba(${20*props.depthLevel},0,0,0.35)` : 'rgba(240,0,0,0.35'}; */
	background-color: ${props => props.depthLevel < 10 ? `rgba(${128-12*props.depthLevel},35,${255-24*props.depthLevel},0.2)` : 'rgba(8,35,15,.2'};
`