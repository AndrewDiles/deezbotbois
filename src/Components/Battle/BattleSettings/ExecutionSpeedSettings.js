import React from 'react';
import LabeledContainer from '../../LabeledContainer/LabeledContainer';
import ExecutionSpeedIcon from './ExecutionSpeedIcon';
import {u1F40C as snail} from 'react-icons-kit/noto_emoji_regular/u1F40C'
import {u1F422 as turtle} from 'react-icons-kit/noto_emoji_regular/u1F422'
import {u1F408 as cat} from 'react-icons-kit/noto_emoji_regular/u1F408'
import {u1F407 as rabbit} from 'react-icons-kit/noto_emoji_regular/u1F407'
import {u1F406 as cheetah} from 'react-icons-kit/noto_emoji_regular/u1F406'

const ExecutionSpeedSettings = () => {
  return (
    <LabeledContainer
		label = 'EXECUTION SPEED'
		>
			<ExecutionSpeedIcon
			icon = {snail}
			value = {5}
			/>
			<ExecutionSpeedIcon
			icon = {turtle}
			value = {3}
			/>
			<ExecutionSpeedIcon
			icon = {cat}
			value = {1}
			/>
			<ExecutionSpeedIcon
			icon = {rabbit}
			value = {.5}
			/>
			<ExecutionSpeedIcon
			icon = {cheetah}
			value = {.1}
			/>
		</LabeledContainer>
  )
}

export default ExecutionSpeedSettings;