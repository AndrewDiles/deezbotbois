import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import StyledIcon from '../../StyledIcon/StyledIcon';
import {plus} from 'react-icons-kit/icomoon/plus';
import DecisionObject from '../../../Constants/botAis/optionCreator.js';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
import {replaceScript} from '../../../Redux/actions';
// import {loop as swap} from 'react-icons-kit/icomoon/loop'

const AddIcon = ({ botNumberSelected, aiAndScripts, decisionName, index, setHelpNeeded, activeNodeArray, setActiveNodeArray }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	// const newNode = new DecisionObject(decisionName, aiAndScripts.viewing.length, [], [])
	// console.log({newNode})
	// console.log(decisionName)
	function handleClick() {
		if (aiAndScripts.insertion === null) {
			setHelpNeeded(true)
		}
		else {
			let newNode = new DecisionObject(decisionName, aiAndScripts.viewing.length, [], []);
			// dispatch reducer to update script object
			// reset aiAndScripts.insertion
			console.log({newNode});


			let newScript = [...userInfo.botBuilds[botNumberSelected].script];
			let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing );
			console.log('array?', targetNodeArray)
			targetNodeArray.push(newNode);
			dispatch(replaceScript(botNumberSelected, newScript))

			// console.log('aiAndScripts.insertion',aiAndScripts.insertion[aiAndScripts.insertion.length-1])
			// let newActiveNodeArray = activeNodeArray.splice(aiAndScripts.insertion[aiAndScripts.insertion.length-1].index, 0, newNode);
			// console.log(newActiveNodeArray);
		}
	}
  return (
    <StyledIcon
		icon = {plus}
		padding = '5'
		disabled = {aiAndScripts === null } //|| aiAndScripts.insertion === null}
		handleClick = {handleClick}
		/>
  )
}
export default AddIcon;