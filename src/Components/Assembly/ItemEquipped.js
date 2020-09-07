import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';
import ToolTip from '../ToolTip/ToolTip';
import { accessoryStats, weaponStats } from '../../Constants/equipment';
import {unequipWeapon} from '../../Redux/actions';

const ItemEquipped = ({ slotKey, type, equipmentStaging, setEquipmentStaging, botNumberSelected  }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [name, setName] = React.useState(null);
	const [messageHovered, setMessageHovered] = React.useState(false)

	React.useEffect(()=>{
		if (!botInfo[botNumberSelected].equipment[slotKey]) setName(null);
		else if (type === 'weapon') setName(weaponStats[botInfo[botNumberSelected].equipment[slotKey]].name);
		else {setName(accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].name)};
	}, [botNumberSelected, botInfo[botNumberSelected].equipment[slotKey]])

	React.useEffect(()=>{
		const target = document.getElementById(`${name}Button`)
		console.log('target',target)
		const onMouseEnter = (ev) => {
			// if (ev.target === target) 
			setMessageHovered(true);
		}
		const onMouseLeave = (ev) => {
			// if (ev.target === target) 
			setMessageHovered(false);
		}
		if (target) {
			target.addEventListener('mouseenter',onMouseEnter);
			target.addEventListener('mouseleave',onMouseLeave);
		}
		return ()=>{
			if (!target) return;
			target.removeEventListener('mouseenter',onMouseEnter);
		}
	},[name, messageHovered])

	if (!userInfo.botBuilds || botNumberSelected === null) {
		return (<></>)
	}
	const stage = () => {
		setEquipmentStaging(
			{
				from: {
					slot: slotKey,
					type: type,
					name: name
				},
				to: equipmentStaging.to
			}
		)
	}
	const unstage = () => {
		setEquipmentStaging(
			{
				from: null,
				to: equipmentStaging.to
			}
		)
	}
	const fullUnstage = () => {
		setEquipmentStaging({from: null, to: null})
	}
	const unequip = () => {
		dispatch(unequipWeapon(botNumberSelected, slotKey))
		unstage();
	}
	const handleClickSlot = () => {
		if (equipmentStaging.from && equipmentStaging.from.slot === slotKey) {
			unstage()
		}
		else {
			stage()
		}
	}
  return (
		<ColDiv className = 'centeredFlex'>
			<RowDiv className = 'centeredFlex'>
				{name ? (
					<StyledButton
					id = {`${name}Button`}
					width = '180'
					handleClick = {handleClickSlot}
					selected = {equipmentStaging.from && equipmentStaging.from.slot === slotKey}
					>
					{name}
    		</StyledButton>
				) : (
					<StyledButton
					width = '240'
					handleClick = {handleClickSlot}
					selected = {equipmentStaging.from && equipmentStaging.from.slot === slotKey}
					>
					EMPTY SLOT
    		</StyledButton>
				)}
				{botInfo[botNumberSelected].equipment[slotKey] !== null &&
					<StyledButton
						width = '60'
						fontSize = '6'
						handleClick = {unequip}
						>
							UNEQUIP
						</StyledButton>
				}
			</RowDiv>
			{messageHovered &&
				<ToolTip
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				// fontSize = '0.6em'
				width= '240'
				>
					{weaponStats[botInfo[botNumberSelected].equipment[slotKey]] &&
						<ToolTipContents>
							<Name>
								{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].name}
							</Name>
							<SuperType>
								{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].superTypes[0]}
							</SuperType>
							<SubType1>
								{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].subTypes[0]}
							</SubType1>
							<SubType2>
								{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].subTypes[1]}
							</SubType2>
							<Damage>
								<div>
									DMG
								</div>
								{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].damage}
							</Damage>
							<Cost>
								<div>
									[kJ]
								</div>
								{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].attackCost}
							</Cost>
							{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].reloadTime &&
								<Reload>
									<div>
										RELOAD
									</div>
									{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].reloadTime}
								</Reload>
							}
							{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].projectileSpeed &&
								<Speed>
									<div>
										VELOCITY
									</div>
									{weaponStats[botInfo[botNumberSelected].equipment[slotKey]].projectileSpeed}
								</Speed>
							}
						</ToolTipContents>
					}
				</ToolTip>
			}
		</ColDiv>
  )
}
export default ItemEquipped;

const RowDiv = styled.div`
	flex-direction: row;
`
const ColDiv= styled.div`
	flex-direction: column;
`
const ToolTipContents = styled.div`
	height: 100%;
	width: 100%;
	font-size: 10px;
	display: grid;
	grid-template-columns: 18.75% 18.75% 18.75% 18.75% 25%; 
  grid-template-rows: 25% 25% 10% 40%;
	padding: 2px;
	/* align-content: center; */
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