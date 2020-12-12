import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';

import Description from './Description';

const FoundeObjectHandler = ({ cellContents }) => {
	const [viewing, setViewing] = React.useState('description');

  return (
    <Wrapper className = 'startFlex col'>
			<h2>
				{cellContents.type === 'User' ? 'YOUR BOT' : cellContents.type.toUpperCase()}
			</h2>
			<div
			className = 'centeredFlex'
			>
				<StyledButton
				fontSize = {10}
				width = {137}
				handleClick = {()=>{setViewing('description')}}
				selected = {viewing === 'description'}
				sfx = {viewing === 'description' ? 'disabled' : 'toggle'}
				>
					DESCRIPTION
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
			{viewing === 'description' &&
				<Description
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