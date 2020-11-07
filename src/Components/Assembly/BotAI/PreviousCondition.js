import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
import { conditionsData } from '../../../Constants/conditions';

const PreviousCondition = ({ aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const basePrevious = {name : 'NONE', type: 'HEAD'};
	const [previousCondition, setPreviousCondition] = React.useState(basePrevious);
	// console.log(conditionsData)
	React.useEffect(()=>{
		if (!userInfo.botBuilds) return
		if (aiAndScripts.viewing.length === 1) {
			setPreviousCondition(basePrevious);
		} else {
			let viewingCopy = [...aiAndScripts.viewing];
			viewingCopy.pop();
			let previousArray = getNodeArray(userInfo.botBuilds[botNumberSelected].script, viewingCopy);
			if (previousArray[aiAndScripts.viewing[aiAndScripts.viewing.length-2].index]) {
			setPreviousCondition({name:previousArray[aiAndScripts.viewing[aiAndScripts.viewing.length-2].index].condition.name, type: aiAndScripts.viewing[aiAndScripts.viewing.length-1].type});
			}
		}
	},[setPreviousCondition, botNumberSelected, userInfo.botBuilds[botNumberSelected] && userInfo.botBuilds[botNumberSelected].script, JSON.stringify(aiAndScripts.viewing)])

	if (!userInfo.botBuilds) {
		return (<></>)
	}
	// console.log({previousCondition});
	if (previousCondition.name === 'NONE') {
		return (
			<Wrapper className = 'evenlyFlex'>
				AT TOP DEPTH LEVEL
			</Wrapper>
		)
	} else {
		return (
			<Wrapper className = 'evenlyFlex'>
				<Block className = 'centeredFlex'>
					PREVIOUS CONDITION:
				</Block>
				<Block
				className = 'centeredFlex'
				type = {previousCondition.type}
				>
					{conditionsData[previousCondition.name].name.toUpperCase()}
				</Block>
			</Wrapper>
		)
	}
}
export default PreviousCondition;

const Wrapper = styled.div`
	width: 250px;
	height: 50px;
	font-size: 0.8em;
`
const Block = styled.div`
	width: 50%;
	height: 100%;
	margin: 0 5px;
	font-size: 0.6em;
	background-color: ${props => props.type && props.type === 'conditionTrue' ? 'rgba(0,255,0,0.2)' : props.type === 'conditionFalse' && 'rgba(255,0,0,0.2)'};
	border-radius: 10px;
`