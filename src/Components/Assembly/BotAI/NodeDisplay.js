import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';
// import {chevronUp} from 'react-icons-kit/feather/chevronUp';
import StyledIcon from '../../StyledIcon/StyledIcon';
import InsertionIcon from './InsertionIcon';

const NodeDisplay = ({ botNumberSelected, aiAndScripts, setAiAndScripts, activeNodeArray }) => {
	const userInfo = useSelector((state) => state.userInfo);
	// const [activeNodeArray, setActiveNodeArray] = React.useState([]);
	
	// React.useEffect(()=>{
	// 	if (!userInfo.botBuilds) return
	// 	setActiveNodeArray(getNodeArray(userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing ))
	// },[setActiveNodeArray, botNumberSelected, userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing])
	// console.log(activeNodeArray)
	if (!userInfo.botBuilds) {
		return (<></>)
	}
console.log(activeNodeArray)
console.log(aiAndScripts)
console.log(aiAndScripts.viewing)
console.log(activeNodeArray[aiAndScripts.viewing.index])
  return (
    <Wrapper>
			{activeNodeArray[aiAndScripts.viewing.index] === undefined ? (
				<>
				NODE EMPTY
				<InsertionIcon
				aiAndScripts = {aiAndScripts}
				setAiAndScripts = {setAiAndScripts}
				/>
				</>
			) : (
				<>
					NODE not empty, fill in its info
				</>
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