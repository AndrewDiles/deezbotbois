import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';
import ToolTip from '../../ToolTip/ToolTip';
import WeaponContents from '../../ToolTip/WeaponContents';
import { weaponStats } from '../../../Constants/equipment';
import { equipItem, unequipItem } from '../../../Redux/actions';

const WeaponInventoryItem = ({ weapon, equipmentStaging, setEquipmentStaging, botNumberSelected, alreadyEquipped, setMessageDisplayed, altBaseSize }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [messageHovered, setMessageHovered] = React.useState(false);

	React.useEffect(()=>{
		const target = document.getElementById(`${weapon}Button`)
		const onMouseEnter = (ev) => {
			// if (ev.target === target) 
			setMessageHovered(true);
			setMessageDisplayed(true);
			// target.focus();
			document.activeElement.blur();
		}
		const onMouseLeave = (ev) => {
			// if (ev.target === target) 
			setMessageHovered(false);
			setMessageDisplayed(true);
		}
		if (target) {
			target.addEventListener('mouseenter',onMouseEnter);
			target.addEventListener('mouseleave',onMouseLeave);
		}
		return ()=>{
			if (!target) return;
			target.removeEventListener('mouseenter',onMouseEnter);
		}
	},[weapon, messageHovered, setMessageDisplayed])

	if (!userInfo.botBuilds || botNumberSelected === null) {
		return (<></>)
	}
	const stage = () => {
		setEquipmentStaging(
			{
				from: equipmentStaging.from,
				to: {
					type: 'weapon',
					name: weapon
				}
			}
		)
	}
	const unstage = () => {
		setEquipmentStaging(
			{
				from: equipmentStaging.from,
				to: null
			}
		)
	}
	const fullUnstage = () => {
		setEquipmentStaging({from: null, to: null})
	}
	const equip = () => {
		dispatch(equipItem(botNumberSelected, equipmentStaging.from.slot, equipmentStaging.to.name))
		fullUnstage();
	}
	const unequip = () => {
		dispatch(unequipItem(botNumberSelected, null, weapon))
		fullUnstage();
	}

	if (alreadyEquipped) return (
		<ColDiv className = 'centeredFlex'>
			<RowDiv className = 'centeredFlex'>
				<StyledButton
					id = {`${weapon}Button`}
					width = '180'
					handleClick = {null}
					selected = {true}
					disabled = {true}
					>
						{weaponStats[weapon].name}
    			</StyledButton>
					<StyledButton
					handleClick = {unequip}
					width = '60'
					fontSize = '6'
					>
						UNEQUIP
					</StyledButton>
			</RowDiv>
		</ColDiv>
	)
  return (
		<ColDiv className = 'centeredFlex'>
			<RowDiv className = 'centeredFlex'>
				{(equipmentStaging.to && equipmentStaging.to.name === weapon) ? (
					<StyledButton
					id = {`${weapon}Button`}
					width = '180'
					handleClick = {unstage}
					selected = {equipmentStaging.to && equipmentStaging.to.name === weapon}
					>
						{weaponStats[weapon].name}
    			</StyledButton>
				):(
					<StyledButton
					id = {`${weapon}Button`}
					width= {altBaseSize ? altBaseSize : '240'}
					handleClick = {stage}
					selected = {equipmentStaging.to && equipmentStaging.to.name === weapon}
					>
						{weaponStats[weapon].name}
    			</StyledButton>
				)}
						
				{(botInfo[botNumberSelected].equipment.arm1 === weapon ||
					botInfo[botNumberSelected].equipment.arm2 === weapon ||
					botInfo[botNumberSelected].equipment.arm3 === weapon) ? (
						<StyledButton
						disabled = 'true'
						width = '60'
						fontSize = '8'
						>
							EQUIPPED
						</StyledButton>
					) : (
						equipmentStaging.to && equipmentStaging.to.name === weapon && equipmentStaging.from ? (
							<StyledButton
							handleClick = {equip}
							width = '60'
							fontSize = '8'
							>
								EQUIP
							</StyledButton>
						): (
							equipmentStaging.to && equipmentStaging.to.name === weapon ? (
								<StyledButton
								handleClick = {unstage}
								width = '60'
								fontSize = '6'
								>
									UNSELECT
								</StyledButton>
							) : (
								<></>
							)
						)
					)
				}
			</RowDiv>
			{messageHovered &&
				<ToolTip
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				width= {altBaseSize ? altBaseSize : '240'}
				animated = {altBaseSize ? 'equipment220' : 'equipment'}
				>
					{weaponStats[weapon] &&
						<WeaponContents
						weaponInfo = {weaponStats[weapon]}
						/>
					}
				</ToolTip>
			}
		</ColDiv>
  )
}
export default WeaponInventoryItem;

const RowDiv = styled.div`
	flex-direction: row;
	margin-bottom: 1px;
`
const ColDiv = styled.div`
	flex-direction: column;
	margin-bottom: 1px;
`