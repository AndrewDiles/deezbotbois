import React from 'react';
import styled from 'styled-components';
import { attackShapes } from '../../Constants/equipment';
import AttackShape from './AttackShape';


import {power as cost} from 'react-icons-kit/icomoon/power';
import {loop2 as reload} from 'react-icons-kit/icomoon/loop2';
import {u1F4A5 as damage} from 'react-icons-kit/noto_emoji_regular/u1F4A5';
import StyledIcon from '../StyledIcon/StyledIcon';

const WeaponContents = ({ weaponInfo }) => {
	return (
		<ToolTipContents>
			<Name>
				{weaponInfo.name}
			</Name>
			<Types>
				{`${weaponInfo.superTypes[0]} - ${weaponInfo.subTypes[0]}, ${weaponInfo.subTypes[1]}`} 
			</Types>
			{/* <SuperType>
				{weaponInfo.superTypes[0]}
			</SuperType> */}
			{/* <SubType1>
				{weaponInfo.subTypes[0]}
			</SubType1>
			<SubType2>
				{weaponInfo.subTypes[1]}
			</SubType2> */}
			<Damage className = 'centeredFlex'>
				<StyledIcon
				padding = {2}
				size = {24}
				icon = {damage}
				selected = {true}
      	/>
				{/* <div>
					DMG
				</div> */}
				{weaponInfo.damage}
			</Damage>
			<Cost className = 'centeredFlex'>
				<StyledIcon
				padding = {4}
				size = {20}
				icon = {cost}
				selected = {true}
      	/>
				{/* <div>
					[kJ]
				</div> */}
				{weaponInfo.attackCost}
			</Cost>
			{weaponInfo.reloadTime &&
				<Reload className = 'centeredFlex'>
					<StyledIcon
					padding = {4}
					size = {20}
					icon = {reload}
					selected = {true}
					
      		/>
					{/* <div>
						RELOAD
					</div> */}
					{weaponInfo.reloadTime}
				</Reload>
			}
			{weaponInfo.attackShape &&
				<Shape>
					<AttackShape
					shape = {attackShapes[weaponInfo.attackShape]}
					cellSize = {4}
					/>
				</Shape>
			}
		</ToolTipContents>
	)
}
export default WeaponContents;

const ToolTipContents = styled.div`
	/* height: 100%; */
	height: 60px;
	width: 100%;
	font-size: 10px;
	display: grid;
	grid-template-columns: 18.75% 18.75% 25% 18.75% 18.75%; 
  grid-template-rows: 25% 25% 10% 40%;
	padding: 2px;
`
const Name = styled.div`
	font-size: 1.4em;
	font-weight: 200;
	grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 2;
	place-self: center;
	white-space: nowrap;
`
const Types = styled.div`
	font-size: 0.8em;
	font-weight: 200;
	grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: end;
	justify-self: start;
	white-space: nowrap;
	position: relative;
	top: 3px;
`
// const SuperType = styled.div`
// 	font-size: 0.8em;
// 	font-weight: 200;
// 	grid-column-start: 1;
//   grid-column-end: 1;
//   grid-row-start: 2;
//   grid-row-end: 2;
// 	align-self: start;
// 	justify-self: start;
// `
// const SubType1 = styled.div`
// 	font-size: 0.6em;
// 	grid-column-start: 2;
//   grid-column-end: 2;
//   grid-row-start: 2;
//   grid-row-end: 2;
// 	align-self: center;
// 	justify-self: start;
// `
// const SubType2 = styled.div`
// 	font-size: 0.6em;
// 	grid-column-start: 3;
//   grid-column-end: 3;
//   grid-row-start: 2;
//   grid-row-end: 2;
// 	align-self: center;
// 	justify-self: start;
// `
const Damage = styled.div`
	font-size: 1.1em;
	grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 3;
  grid-row-end: 4;
	align-self: center;
	justify-self: start; 
	justify-items: start;
	position:relative;
	left: -10px;
`
const Cost = styled.div`
	font-size: 1.1em;
	grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 4;
	align-self: center;
	justify-self: center;
	position:relative;
	left: 15px;
`
const Reload = styled.div`
	font-size: 1.1em;
	grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
	align-self: center;
	justify-self: end;
	position:relative;
	left: 30px;
`
const Shape = styled.div`
	font-size: 0.7em;
	grid-column-start: 5;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 4;
	align-self: center;
	justify-self: end;
`