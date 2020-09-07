import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { accessoryStats } from '../../Constants/equipment';

const AccessoryContents = ({ slotKey, botNumberSelected  }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;

	return (
		<ToolTipContents>
			<Name>
				{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].name}
			</Name>
			<SuperType>
				{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].superTypes[0]}
			</SuperType>
			<SubType1>
				{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].subTypes[0]}
			</SubType1>
			<SubType2>
				{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].subTypes[1]}
			</SubType2>
			<Damage>
				<div>
					DMG
				</div>
				{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].damage}
			</Damage>
			<Cost>
				<div>
					[kJ]
				</div>
				{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].attackCost}
			</Cost>
			{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].reloadTime &&
				<Reload>
					<div>
						RELOAD
					</div>
					{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].reloadTime}
				</Reload>
			}
			{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].projectileSpeed &&
				<Speed>
					<div>
						VELOCITY
					</div>
					{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].projectileSpeed}
				</Speed>
			}
		</ToolTipContents>
	)
}
export default AccessoryContents;

const ToolTipContents = styled.div`
	height: 100%;
	width: 100%;
	font-size: 10px;
	display: grid;
	grid-template-columns: 18.75% 18.75% 18.75% 18.75% 25%; 
  grid-template-rows: 25% 25% 10% 40%;
	padding: 2px;
`
const Name = styled.div`
	font-size: 1.2em;
	font-weight: 200;
	grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
	align-self: start;
`
const SuperType = styled.div`
	font-size: 0.8em;
	font-weight: 200;
	grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
	align-self: center;
`
const SubType1 = styled.div`
	font-size: 0.6em;
	grid-column-start: 5;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 1;
	align-self: center;
	justify-self: end;
`
const SubType2 = styled.div`
	font-size: 0.6em;
	grid-column-start: 5;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 2;
	align-self: center;
	justify-self: end;
`
const Damage = styled.div`
	font-size: 0.7em;
	grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: center;
	justify-self: center;
`
const Cost = styled.div`
	font-size: 0.7em;
	grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: center;
	justify-self: center;
`
const Reload = styled.div`
	font-size: 0.5em;
	grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: center;
	justify-self: center;
`
const Speed = styled.div`
	font-size: 0.5em;
	grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: center;
	justify-self: center;
`
const Shape = styled.div`
	font-size: 0.7em;
	grid-column-start: 5;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: center;
	justify-self: end;
`