import React from 'react';
import { useSelector } from "react-redux";
import SwitchSetter from '../InstructionsComponents/SwitchSetter';

const SwitchCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	if (!userInfo.botBuilds[botNumberSelected]) {
		return <></>
	}
	return (		
		<div className = 'commandContents'>
			
			{[1,2,3,4,5].map((switchNumber)=>{
				return (
					<SwitchSetter
					key = {switchNumber}
					nodeInfo = {nodeInfo}
					activeNodeArray = {activeNodeArray}
					setActiveNodeArray = {setActiveNodeArray}
					botNumberSelected = {botNumberSelected}
					aiAndScripts = {aiAndScripts}
					switchNumber = {switchNumber}
					/>
				)
				})}
			<p>
				NOTE: SWITCH 5 FLIPS TO OFF AFTER IT HAS BEEN ON FOR A ONE TICK CYCLE
			</p>
			<br/>
		</div>
	)
}
export default SwitchCommandInstructions;