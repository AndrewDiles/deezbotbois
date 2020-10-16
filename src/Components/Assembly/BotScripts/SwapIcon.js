import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import StyledIcon from '../../StyledIcon/StyledIcon';
import {loop} from 'react-icons-kit/ionicons/loop'
import DecisionObject from '../../../Constants/botAis/optionCreator.js';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
import {replaceScript} from '../../../Redux/actions';
// import {loop as swap} from 'react-icons-kit/icomoon/loop'

const SwapIcon = ({ botNumberSelected, aiAndScripts, setAiAndScripts, decisionName, index, setHelpNeeded, activeNodeArray, setActiveNodeArray, setLosingNestedNodes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	// const newNode = new DecisionObject(decisionName, aiAndScripts.viewing.length, [], [])
	// console.log({newNode})
	// console.log(decisionName)
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
			// console.log('decision object?',targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index])
			if (targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command) {
				// console.log('swapping from a command')
				swapNode(newScript, targetNodeArray, [], [])
				// let newNode = new DecisionObject(decisionName, aiAndScripts.viewing.length, [], []);
				// targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index] = newNode;
				// dispatch(replaceScript(botNumberSelected, newScript));
				// let newAiAndScript = {...aiAndScripts};
				// newAiAndScript.insertion = false;
				// setAiAndScripts(newAiAndScript)
			} else if (!decisionName.includes('Command')) {
				// console.log('swapping to a condition')
				swapNode(newScript, targetNodeArray, targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionMet, targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionUnMet)
			} else if (targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition) {
				// console.log('swapping from a condition');
				console.log(targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition)

				if (targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionMet.length === 0 &&
				targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionUnMet.length === 0) {
					// console.log('no nested nodes');
					swapNode(newScript, targetNodeArray, [], []);
				} else {
					setLosingNestedNodes(decisionName);
				}

			} else {
				console.log('swapping error')
			}
			
			// dispatch reducer to update script object
			// reset aiAndScripts.insertion
			// console.log('newNode to be added:', newNode);
	
			// targetNodeArray.push(newNode);
			// dispatch(replaceScript(botNumberSelected, newScript))
			// setAiAndScripts({insertion:false, viewing: aiAndScripts.viewing})

			// console.log('aiAndScripts.insertion',aiAndScripts.insertion[aiAndScripts.insertion.length-1])
			// let newActiveNodeArray = activeNodeArray.splice(aiAndScripts.insertion[aiAndScripts.insertion.length-1].index, 0, newNode);
			// console.log(newActiveNodeArray);
		}
	}
	// console.log(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index])
  return (
    <StyledIcon
		icon = {loop}
		padding = '5'
		disabled = {aiAndScripts === null || 
			(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command &&
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.name === decisionName
			) ||
			(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition &&
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.name === decisionName
			)
		}
		handleClick = {handleClick}
		/>
  )
}
export default SwapIcon;