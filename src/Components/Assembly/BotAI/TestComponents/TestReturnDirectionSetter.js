import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledIcon from '../../../StyledIcon/StyledIcon';
import StyledButton from '../../../StyledButton/StyledButton';
import {arrowUpLeft} from 'react-icons-kit/icomoon/arrowUpLeft';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp';
import {arrowUpRight} from 'react-icons-kit/icomoon/arrowUpRight';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';
import {arrowRight} from 'react-icons-kit/icomoon/arrowRight';
import {arrowDownLeft} from 'react-icons-kit/icomoon/arrowDownLeft';
import {arrowDown} from 'react-icons-kit/icomoon/arrowDown';
import {arrowDownRight} from 'react-icons-kit/icomoon/arrowDownRight';

const TestReturnDirectionSetter = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function setDirection(direction) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn = direction;
		setActiveNodeArray(newActiveNodeArray);;
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<>
			<DirectionSetterContainer>
				<Request 
				className = 'centeredFlex'
				>
					SELECT TEST DIRECTION
				</Request>
				<Options>
					<StyledIcon
					handleClick = {()=>setDirection('UL')}
					padding = {5}
					size = {25}
					icon = {arrowUpLeft}
					selected = {'UL' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>
					<StyledIcon
					handleClick = {()=>setDirection('U')}
					padding = {5}
					size = {25}
					icon = {arrowUp}
					selected = {'U' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>
					<StyledIcon
					handleClick = {()=>setDirection('UR')}
					padding = {5}
					size = {25}
					icon = {arrowUpRight}
					selected = {'UR' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>
					<StyledIcon
					handleClick = {()=>setDirection('L')}
					padding = {5}
					size = {25}
					icon = {arrowLeft}
					selected = {'L' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>

					<StyledButton
					width = '35'
					maxHeight = '35'
					minHeight = '35'
					fontSize = '8'
					handleClick = {()=>setDirection('any')}
					selected = {'any' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
					>
						ANY
					</StyledButton>

					<StyledIcon
					handleClick = {()=>setDirection('R')}
					padding = {5}
					size = {25}
					icon = {arrowRight}
					selected = {'R' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>
					<StyledIcon
					handleClick = {()=>setDirection('DL')}
					padding = {5}
					size = {25}
					icon = {arrowDownLeft}
					selected = {'DL' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>
					<StyledIcon
					handleClick = {()=>setDirection('D')}
					padding = {5}
					size = {25}
					icon = {arrowDown}
					selected = {'D' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>
					<StyledIcon
					handleClick = {()=>setDirection('DR')}
					padding = {5}
					size = {25}
					icon = {arrowDownRight}
					selected = {'DR' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testReturn}
      		/>
				</Options>
			</DirectionSetterContainer>
		</>
	)
}
export default TestReturnDirectionSetter;
const DirectionSetterContainer = styled.div`
	width: 100%;
	height: 130px;
	display: flex;
`

const Request = styled.div`
	height: 100%;
	width: 44%;
	font-size: 0.8em;
`
const Options = styled.div`
	height: 100%;
	width: 55%;
	display: grid;
	/* grid-gap: 5px; */
  grid-template-columns: repeat(3, 1fr);
	justify-items: center;
	align-items: center;
`