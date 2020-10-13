import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import styled from 'styled-components';

import {alertCircled} from 'react-icons-kit/ionicons/alertCircled'

import StyledButton from '../../StyledButton/StyledButton';
import StyledIcon from '../../StyledIcon/StyledIcon';
import {replaceScript} from '../../../Redux/actions';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';



const DeleteNode = ({ setDeleteActive, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	let colors = useSelector(getThemeColors);
	const dispatch = useDispatch();
	const [hasSubNodes, setHasSetNodes] = React.useState(false);

	React.useEffect(()=>{
		let nodeInQuestion = activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index];
		if (nodeInQuestion && nodeInQuestion.condition) {
			if (nodeInQuestion && nodeInQuestion.condition.conditionMet.length>0 ||
				nodeInQuestion && nodeInQuestion.condition.conditionUnMet.length>0) {
					setHasSetNodes(true)
				}
		}
	},[])
	
	function handleDelete () {
		// console.log({activeNodeArray})
		let newActiveNodeArray = activeNodeArray;
		// newActiveNodeArray = newActiveNodeArray.filter(function (element){
		// 	return element != activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]
		// });
		newActiveNodeArray.splice(aiAndScripts.viewing[aiAndScripts.viewing.length-1].index, 1);
		// console.log({newActiveNodeArray})
		let newScript = [...userInfo.botBuilds[botNumberSelected].script];
		let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing );
		console.log({targetNodeArray})
		targetNodeArray = newActiveNodeArray;
		console.log({targetNodeArray})
		console.log({newScript})
		dispatch(replaceScript(botNumberSelected, newScript));
		setDeleteActive(false)


		// let newScript = [...userInfo.botBuilds[botNumberSelected].script];
		// 	let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing );
		// 	console.log('array?', targetNodeArray)
		// 	targetNodeArray.push(newNode);
		// 	dispatch(replaceScript(botNumberSelected, newScript))
		// 	setAiAndScripts({insertion:false, viewing: aiAndScripts.viewing})


		// var array = [0, 1, null, 2, "", 3, undefined, 3,,,,,, 4,, 4,, 5,, 6,,,,];

		// var filtered = array.filter(function (el) {
		// 	return el != null;
		// });
		
		// console.log(filtered);
	}
	// console.log(aiAndScripts.viewing[aiAndScripts.viewing.length-1].index)
	// console.log(activeNodeArray)
	// console.log(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index])
	// console.log(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition)
	// console.log(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionMet)
	// console.log(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1]].index.condition);
	// console.log('met of this node:',activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1]].index.conditionMet)
	return (
		<Wrapper>
			<WarningIconRow>
				{[1,2,3,4,5].map((n)=>{
					return (
						<IconContainer key = {n}>
							<StyledIcon
							icon = {alertCircled}
							padding = '5'
							hovered = {1}
							// handleClick = {null}
							/>
						</IconContainer>
					)
				})}
			</WarningIconRow>
			<WarningText
			colors = {colors}
			>
				{hasSubNodes &&
					'DELETING THIS NODE WILL ALSO DELETE DEEPER DEPTH NODES THAT STEM FROM THIS NODE'
				}
			</WarningText>
			<ConfirmationText>
				PROCEED WITH NODE DELETION?
			</ConfirmationText>
			<ConfCancelWrapper>
				<StyledButton
				handleClick = {handleDelete}>
					CONFIRM
				</StyledButton>
				<StyledButton
				handleClick = {()=>setDeleteActive(false)}
				>
					CANCEL
				</StyledButton>
			</ConfCancelWrapper>
		</Wrapper>
	)
}
export default DeleteNode;
const ConfCancelWrapper = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-evenly;
`
const WarningIconRow = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
`
const WarningText = styled.div`
	width: 100%;
	height: 150px;
	color: ${props => props.colors.hoveredText};
	white-space: pre-wrap;
`
const ConfirmationText = styled.div`
	width: 100%;
	height: 50px;
	white-space: pre-wrap;
`
const Wrapper = styled.div`
	width: 100%;
	height: 557px;
	display: flex;
	flex-direction: column;
	justify-content: column;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`
const IconContainer = styled.div`
	height: 50px;
	width: 50px;
`


	// {/* {(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition &&
	// 			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionMet &&
	// 			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionMet.length > 0) ||
	// 			(activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition &&
	// 			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionUnMet &&
	// 			activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.conditionUnMet.length > 0) && */}
	// 			{/* {(true) || (false) && */}