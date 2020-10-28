import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

// import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
// import {chevronUp} from 'react-icons-kit/feather/chevronUp';
import StyledIcon from '../../StyledIcon/StyledIcon';
import InsertionIcon from './InsertionIcon';
import Node from './Node';

const NodeDisplay = ({ botNumberSelected, aiAndScripts, setAiAndScripts, activeNodeArray, setActiveNodeArray, setDeleteActive, deleteActive, attributes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	let colors = useSelector(getThemeColors);
	// const [activeNodeArray, setActiveNodeArray] = React.useState([]);
	
	// React.useEffect(()=>{
	// 	if (!userInfo.botBuilds) return
	// 	setActiveNodeArray(getNodeArray(userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing ))
	// },[setActiveNodeArray, botNumberSelected, userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing])
	// console.log(activeNodeArray)
	
	if (!userInfo.botBuilds) {
		return (<></>)
	}
// console.log(activeNodeArray)
// console.log(aiAndScripts)
// console.log(aiAndScripts.viewing[aiAndScripts.viewing.length-1])
// console.log(aiAndScripts.viewing[aiAndScripts.viewing.length-1].index)
  return (
    <Wrapper>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index] === undefined ? (
				<EmptyNodeWrapper>
					<br/>
					NODE EMPTY
					<br/>
					<br/>
					{aiAndScripts.insertion ? (
						<SetInsertionP
						set = {true}
						colors = {colors}
						>
							NEW NODE WILL 
							<br/>
							BE PLACED HERE
						</SetInsertionP>
					) : (
						<SetInsertionP
						colors = {colors}
						>
							SET INSERTION POINT
						</SetInsertionP>
					)}
					<InsertionIcon
					aiAndScripts = {aiAndScripts}
					setAiAndScripts = {setAiAndScripts}
					/>
				</EmptyNodeWrapper>
			) : (
				<Node
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				nodeInfo = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index]}
				aiAndScripts = {aiAndScripts}
				setAiAndScripts = {setAiAndScripts}
				botNumberSelected = {botNumberSelected}
				setDeleteActive = {setDeleteActive}
				deleteActive = {deleteActive}
				attributes = {attributes}
				/>
			)}
    </Wrapper>
  )
}
export default NodeDisplay;
const Wrapper = styled.div`
	width: 250px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`
const EmptyNodeWrapper = styled.div`
	width: 100%;
	height: 557px;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	text-align: center;
`
const SetInsertionP = styled.p`
	height: 35px;
	font-size: 0.8em;
	margin-bottom: 0px;
	padding-top: ${props => !props.set && '20px'};
	color: ${props => props.set && props.colors.hoveredText};
	vertical-align: bottom;
`