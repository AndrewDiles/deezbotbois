import React from 'react';
import styled from 'styled-components';
import {toggleLeft} from 'react-icons-kit/feather/toggleLeft';
import {toggleRight} from 'react-icons-kit/feather/toggleRight';
import { Icon } from 'react-icons-kit';

const SwitchIcon = ({ switchNumber, value }) => {

  return (
    <Wrapper className = 'startFlex col'>
			{switchNumber}
			<Switch
			active = {value}
			icon = {value ? toggleRight : toggleLeft}
			size = {30}
			/>
		</Wrapper>
  )
}

export default SwitchIcon;
const Wrapper = styled.div`
	height: 50px;
	width: 50px;
`
const Switch = styled(Icon)`
	color: ${props => props.active ? 'lime' : 'red'};
`