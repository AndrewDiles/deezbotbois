import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

import { setExecutionSpeed } from '../../Redux/actions';
import StyledIcon from '../StyledIcon/StyledIcon';

import {u1F40C as snail} from 'react-icons-kit/noto_emoji_regular/u1F40C'
import {u1F422 as turtle} from 'react-icons-kit/noto_emoji_regular/u1F422'
import {u1F408 as cat} from 'react-icons-kit/noto_emoji_regular/u1F408'
import {u1F407 as rabbit} from 'react-icons-kit/noto_emoji_regular/u1F407'
import {u1F406 as cheetah} from 'react-icons-kit/noto_emoji_regular/u1F406'

const ExecutionSpeedSettings = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	
  return (
		// icon buttons to be disabled if in a turn or if on auto
    <Wrapper>
			<StyledIcon
			handleClick = {()=>{dispatch(setExecutionSpeed(5))}}
			padding = {5}
			icon = {snail}
			selected = {5 === settings.executionSpeed}
			disabled = {false}
			sfx = 'selected'
			/>
			<StyledIcon
			handleClick = {()=>{dispatch(setExecutionSpeed(3))}}
			padding = {5}
			icon = {turtle}
			selected = {3 === settings.executionSpeed}
			disabled = {false}
			sfx = 'selected'
			/>
			<StyledIcon
			handleClick = {()=>{dispatch(setExecutionSpeed(1))}}
			padding = {5}
			icon = {cat}
			selected = {1 === settings.executionSpeed}
			disabled = {false}
			sfx = 'selected'
			/>
			<StyledIcon
			handleClick = {()=>{dispatch(setExecutionSpeed(.5))}}
			padding = {5}
			icon = {rabbit}
			selected = {.5 === settings.executionSpeed}
			disabled = {false}
			sfx = 'selected'
			/>
			<StyledIcon
			handleClick = {()=>{dispatch(setExecutionSpeed(0.1))}}
			padding = {5}
			icon = {cheetah}
			selected = {0.1 === settings.executionSpeed}
			disabled = {false}
			sfx = 'selected'
			/>
		</Wrapper>
  )
}

export default ExecutionSpeedSettings;

const Wrapper = styled.div`
	display : flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	align-items: start;
	margin: 10px;
	/* border: 2px solid blue; */
`
