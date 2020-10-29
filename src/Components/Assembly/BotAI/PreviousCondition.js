import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
import { conditionsData } from '../../../Constants/conditions';

const PreviousCondition = ({ aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [previousCondition, setPreviousCondition] = React.useState('NONE');
	// console.log(conditionsData)
	React.useEffect(()=>{
		if (!userInfo.botBuilds) return
		if (aiAndScripts.viewing.length === 1) {
			setPreviousCondition('NONE');
		} else {
			let viewingCopy = [...aiAndScripts.viewing];
			viewingCopy.pop();
			let previousArray = getNodeArray(userInfo.botBuilds[botNumberSelected].script, viewingCopy);
			setPreviousCondition(previousArray[aiAndScripts.viewing[aiAndScripts.viewing.length-2].index].condition.name);
		}
	},[setPreviousCondition, botNumberSelected, userInfo.botBuilds[botNumberSelected] && userInfo.botBuilds[botNumberSelected].script, JSON.stringify(aiAndScripts.viewing)])

	if (!userInfo.botBuilds) {
		return (<></>)
	}
	// console.log({previousCondition});
	if (previousCondition === 'NONE') {
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
				<Block className = 'centeredFlex'>
					{conditionsData[previousCondition].name.toUpperCase()}
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
	padding: 0 5px;
	font-size: 0.6em;
`