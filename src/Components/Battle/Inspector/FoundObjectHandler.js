import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';

import Overview from './Overview';

const FoundeObjectHandler = ({ cellContents }) => {
	const [viewing, setViewing] = React.useState('overview');

  return (
    <Wrapper className = 'startFlex col'>
			<h2>
				{cellContents.type === 'User' ? 'YOUR BOT' : `A ${cellContents.type.toUpperCase()} ON ${cellContents.team === 0 ? ' YOUR TEAM' : ` TEAM ${cellContents.team}`}`}
			</h2>
			<div
			className = 'centeredFlex'
			>
				<StyledButton
				fontSize = {10}
				width = {137}
				handleClick = {()=>{setViewing('overview')}}
				selected = {viewing === 'overview'}
				sfx = {viewing === 'overview' ? 'disabled' : 'toggle'}
				>
					OVERVIEW
				</StyledButton>
				<StyledButton
				fontSize = {10}
				width = {137}
				handleClick = {()=>{setViewing('attributes')}}
				selected = {viewing === 'attributes'}
				sfx = {viewing === 'attributes' ? 'disabled' : 'toggle'}
				>
					ATTRIBUTES
				</StyledButton>
			</div>
			{viewing === 'overview' &&
				<Overview
				cellContents = {cellContents}
				/>
			}
		</Wrapper>
  )
}

export default FoundeObjectHandler;
const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`