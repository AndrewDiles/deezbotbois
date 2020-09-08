import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';
import ToolTip from '../../ToolTip/ToolTip';
import { accessoryStats, weaponStats } from '../../../Constants/equipment';
import {unequipItem} from '../../../Redux/actions';
import WeaponContents from '../../ToolTip/WeaponContents';
import AccessoryContents from '../../ToolTip/AccessoryContents';

const ItemEquipped = ({ slotKey, type, equipmentStaging, setEquipmentStaging, botNumberSelected  }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [name, setName] = React.useState(null);
	const [messageHovered, setMessageHovered] = React.useState(false);

	React.useEffect(()=>{
		if (!botInfo[botNumberSelected].equipment[slotKey]) setName(null);
		else if (type === 'weapon') setName(weaponStats[botInfo[botNumberSelected].equipment[slotKey]].name);
		else {setName(accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].name)};
	}, [botNumberSelected, botInfo[botNumberSelected].equipment[slotKey]])

	React.useEffect(()=>{
		const target = document.getElementById(`${name}Button`)
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
					name: botInfo[botNumberSelected].equipment[slotKey]
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
		dispatch(unequipItem(botNumberSelected, slotKey))
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
				animated = {'equipment'}
				>
					{weaponStats[botInfo[botNumberSelected].equipment[slotKey]] &&
						<WeaponContents
						weaponInfo = {weaponStats[botInfo[botNumberSelected].equipment[slotKey]]}
						/>
					}
					{accessoryStats[botInfo[botNumberSelected].equipment[slotKey]] &&
						<AccessoryContents
						accessoryInfo = {accessoryStats[botInfo[botNumberSelected].equipment[slotKey]]}
						/>
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