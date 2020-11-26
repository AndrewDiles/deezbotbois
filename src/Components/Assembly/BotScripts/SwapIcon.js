import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import StyledIcon from '../../StyledIcon/StyledIcon';
import {loop} from 'react-icons-kit/ionicons/loop'
import DecisionObject from '../../../Constants/botAis/optionCreator.js';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
import {replaceScript} from '../../../Redux/actions';

const SwapIcon = ({ botNumberSelected, aiAndScripts, setAiAndScripts, decisionName, index, setHelpNeeded, activeNodeArray, setActiveNodeArray, setLosingNestedNodes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	function swapNode(newScript, targetNodeArray, conditionMetArray, conditionUnMetArray) {
		let newNode = new DecisionObject(decisionName, aiAndScripts.viewing.length, conditionMetArray, conditionUnMetArray);
		targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index] = newNode;
		dispatch(replaceScript(botNumberSelected, newScript));
		let newAiAndScript = {...aiAndScripts};
		newAiAndScript.insertion = false;
		setAiAndScripts(newAiAndScript)
	}
	function handleClick() {
		if (aiAndScripts.insertion === false) {
			setHelpNeeded(true)
		}
		else {
			let newScript = [...userInfo.botBuilds[botNumberSelected].script];
			let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing );
			if (targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command) {
				swapNode(newScript, targetNodeArray, [], [])
			} else if (!decisionName.includes('Command')) {
				swapNode(newScript, targetNodeArray, targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionMet, targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionUnMet)
			} else if (targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition) {
				console.log(targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition)

				if (targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionMet.length === 0 &&
				targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionUnMet.length === 0) {
					swapNode(newScript, targetNodeArray, [], []);
				} else {
					setLosingNestedNodes(decisionName);
				}
			} else {
				console.log('swapping error')
			}
		}
	}
  return (
    <StyledIcon
		icon = {loop}
		padding = '5'
		disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index] && (aiAndScripts === null || 
			(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command &&
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.name === decisionName
			) ||
			(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition &&
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.name === decisionName
			))
		}
		handleClick = {handleClick}
		/>
  )
}
export default SwapIcon;