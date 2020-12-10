import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const BattleLog = ({ viewing }) => {
	const battleInfo = useSelector((state) => state.battleInfo);

  return (
    <Wrapper className = 'startFlex col'>
			<Tab
			viewing = {viewing}
			/>
			<LogContainer
			viewing = {viewing}
			>
				{battleInfo.battleLog.map((logEntry)=>{
					if (logEntry.type === 'new-tick') {
						return (
							<NewTick>
								-- NEW TICK # {logEntry.number} --
							</NewTick>
						)
					}
					if (logEntry.type === 'determining-actions') {
						return (
							<Phase>
								-- DETERMINING ACTIONS --
							</Phase>
						)
					}
					if (logEntry.type === 'testing-bot') {
						return (
							<Bot>
								-- TESTING {logEntry.name} --
							</Bot>
						)
					}
					if (logEntry.type === 'test-fail') {
						return (
							<UnMet>
								CONDITION NOT MET AT DEPTH {logEntry.depth}, NODE {logEntry.node}: {logEntry.name}
							</UnMet>
						)
					}
					return (
						<p>
							unspecified action type: 
							{logEntry}
						</p>
					)
				})}
			</LogContainer>
		</Wrapper>
  )
}

export default BattleLog;
const LogContainer = styled.div`
	height: ${props => props.viewing === 'log' ? '600px' : '0px'};
	margin-top: ${props => props.viewing === 'log' ? '0px' : '20px'};
	width: 300px;
	background-color: rgb(0,10,0);
	position: relative;
	top: -10px;
	left: 75px;
	z-index: 10;
	transition: height 0.5s ease-in-out;
	font-size: 0.5em;
	overflow-x: auto;
	border: ${props => props.viewing === 'log' && '4px double lime'};
	border-radius: 5px;
	>p{
		display: ${props => props.viewing !== 'log' && 'none'};
		animation: 0.5s ease-out expandYHalfDelay;
	}
`
const Tab = styled.div`
	height: 20px;
	width: 20px;
	background-color: lime;
	transform: rotate(45deg);
	display: ${props => props.viewing !== 'log' && 'none'};
	animation: 0.2s ease-out expandY;
`
const Bot = styled.p`
	color: deepskyblue;
`
const UnMet = styled.p`
	color: red;
`
const NewTick = styled.p`
	color: gold;
`
const Phase = styled.p`
	color: fuchsia;
`
const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: start;
	text-align: start;
	position: relative;
	top: 275px;
	left: -70px;
	width: 0px;
	height: 500px;
	overflow: visible;
`