import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import StyledIcon from '../../StyledIcon/StyledIcon';
import {loop} from 'react-icons-kit/ionicons/loop'
import DecisionObject from '../../../Constants/botAis/optionCreator.js';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
import {replaceScript} from '../../../Redux/actions';
// import {loop as swap} from 'react-icons-kit/icomoon/loop'

const SwapIcon = ({ botNumberSelected, aiAndScripts, setAiAndScripts, decisionName, index, setHelpNeeded, activeNodeArray, setActiveNodeArray }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	// const newNode = new DecisionObject(decisionName, aiAndScripts.viewing.length, [], [])
	// console.log({newNode})
	// console.log(decisionName)
	function handleClick() {
		if (aiAndScripts.insertion === false) {
			setHelpNeeded(true)
		}
		else {
			let newNode = new DecisionObject(decisionName, aiAndScripts.viewing.length, [], []);
			// dispatch reducer to update script object
			// reset aiAndScripts.insertion
			console.log('newNode to be added:', newNode);
			let newScript = [...userInfo.botBuilds[botNumberSelected].script];
			let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing );
			console.log('array?', targetNodeArray)
			targetNodeArray.push(newNode);
			dispatch(replaceScript(botNumberSelected, newScript))
			setAiAndScripts({insertion:false, viewing: aiAndScripts.viewing})
			// console.log('aiAndScripts.insertion',aiAndScripts.insertion[aiAndScripts.insertion.length-1])
			// let newActiveNodeArray = activeNodeArray.splice(aiAndScripts.insertion[aiAndScripts.insertion.length-1].index, 0, newNode);
			// console.log(newActiveNodeArray);
		}
	}
  return (
    <StyledIcon
		icon = {loop}
		padding = '5'
		disabled = {aiAndScripts === null } //|| aiAndScripts.insertion === null}
		handleClick = {handleClick}
		/>
  )
}
export default SwapIcon;