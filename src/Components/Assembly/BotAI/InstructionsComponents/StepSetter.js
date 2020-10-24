import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledIcon from '../../../StyledIcon/StyledIcon';
import {arrowUpLeft} from 'react-icons-kit/icomoon/arrowUpLeft';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp';
import {arrowUpRight} from 'react-icons-kit/icomoon/arrowUpRight';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';
import {arrowRight} from 'react-icons-kit/icomoon/arrowRight';
import {arrowDownLeft} from 'react-icons-kit/icomoon/arrowDownLeft';
import {arrowDown} from 'react-icons-kit/icomoon/arrowDown';
import {arrowDownRight} from 'react-icons-kit/icomoon/arrowDownRight';
import WarningBar from './WarningBar';

const StepSetter = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, emptyPath, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function handleAddStep(step) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.push(step);
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<>
			<PathSetterContainer
			error = {emptyPath}
			>
				<Request 
				className = 'centeredFlex'
				disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
				>
					{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5 ? (
						'MAXIMUM STEP COUNT REACHED'
					) : (
						'SET NEXT STEP'
					)}
					
				</Request>
				<Options>
					<StyledIcon
					handleClick = {()=>handleAddStep('UL')}
					padding = {5}
					size = {25}
					icon = {arrowUpLeft}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
					<StyledIcon
					handleClick = {()=>handleAddStep('U')}
					padding = {5}
					size = {25}
					icon = {arrowUp}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
					<StyledIcon
					handleClick = {()=>handleAddStep('UR')}
					padding = {5}
					size = {25}
					icon = {arrowUpRight}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
					<StyledIcon
					handleClick = {()=>handleAddStep('L')}
					padding = {5}
					size = {25}
					icon = {arrowLeft}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
					<BlankEntry/>
					<StyledIcon
					handleClick = {()=>handleAddStep('R')}
					padding = {5}
					size = {25}
					icon = {arrowRight}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
					<StyledIcon
					handleClick = {()=>handleAddStep('DL')}
					padding = {5}
					size = {25}
					icon = {arrowDownLeft}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
					<StyledIcon
					handleClick = {()=>handleAddStep('D')}
					padding = {5}
					size = {25}
					icon = {arrowDown}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
					<StyledIcon
					handleClick = {()=>handleAddStep('DR')}
					padding = {5}
					size = {25}
					icon = {arrowDownRight}
					disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 5}
      		/>
				</Options>
			</PathSetterContainer>
			{emptyPath &&
				<WarningBar>
					PATH MUST CONTAIN AT LEAST ONE STEP
				</WarningBar>
			}
		</>
	)
}
export default StepSetter;
const PathSetterContainer = styled.div`
	width: 100%;
	height: 150px;
	display: flex;
	background: ${props => props.error && 'rgba(255,0,0,0.2)'};
`
const Request = styled.div`
	height: 100%;
	width: 44%;
	opacity: ${props => props.disabled && 0.5};
	/* font-size: 0.8em; */
`
const Options = styled.div`
	height: 100%;
	width: 55%;
	display: grid;
	/* grid-gap: 5px; */
  grid-template-columns: repeat(3, 1fr);
	
`
const BlankEntry = styled.div`
	height: 40px;
	width: 40px;
`