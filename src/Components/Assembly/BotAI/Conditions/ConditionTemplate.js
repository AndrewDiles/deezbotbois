import React from 'react';
import styled from 'styled-components';
import InstructionsOrInformation from '../InstructionOrInformation';
import { conditionsData } from '../../../../Constants/conditions';
import MicroConditionsProvider from '../MicroConditionsProvider';

const ConditionTemplate = ({ attributes, nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, children }) => {
	const [displayInfo, setDisplayInfo] = React.useState(false)

	if (!conditionsData[nodeInfo.name]) {
		return (
			<div className = 'innerNodeOptionsWrapper'>
				CONDITION DETAILS NOT FOUND
			</div>
		)
	}
	return (
		<div className = 'innerNodeOptionsWrapper'>
			<br/>
			<div className = 'centeredFlex aiTitleCondition'>
				{conditionsData[nodeInfo.name].name.toUpperCase()} CONDITION
			</div>
			<InstructionsOrInformation
			displayInfo = {displayInfo}
			setDisplayInfo = {setDisplayInfo}
			type = 'TEST VALUES'
			/>
			{displayInfo ? (
				<div className = 'commandContents infoContents'>
					<span>
						{conditionsData[nodeInfo.name].affect}
					</span>
					<br/>
					<span>
						{conditionsData[nodeInfo.name].generalUse}
					</span>
					<br/>
					{conditionsData[nodeInfo.name].useWhen && conditionsData[nodeInfo.name].useWhen.length > 0 &&
						<span>
							Consider utilization of this test if the executor:
							<ul>
								{conditionsData[nodeInfo.name].useWhen.map((circumstance, index) => {
      				  	return (
      				    	<StyledLi key = {index}>
											{circumstance}
										</StyledLi>
      				  	);
      					})}
							</ul>
						</span>
					}
					{conditionsData[nodeInfo.name].testOptions && conditionsData[nodeInfo.name].testOptions.length > 0 &&
						<span>
							This condition can provide the following tests:
							<ul>
								{conditionsData[nodeInfo.name].testOptions.map((test, index)=>{
									return (
										<StyledLi key = {index}>
											{test}
										</StyledLi>
									)
								})}
							</ul>
						</span>
					}
				</div>
			) : (
				<MicroConditionsProvider
				nodeInfo = {nodeInfo}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				attributes = {attributes}
				/>
			)}
		</div>
	)
}
export default ConditionTemplate;

const StyledLi = styled.li`
	margin-top: 10px;
	list-style-type: square;
`
const IconRow = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	font-size: 2em;
`
const Gap = styled.div`
	width: 50px;
	height: 0;
`