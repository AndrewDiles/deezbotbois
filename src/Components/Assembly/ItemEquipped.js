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
	const [name, setName] = React.useState(null)

	React.useEffect(()=>{
		if (!botInfo[botNumberSelected].equipment[slotKey]) setName(null);
		else if (type === 'weapon') setName(weaponStats[botInfo[botNumberSelected].equipment[slotKey]].name);
		else {setName(accessoryStats[botInfo[botNumberSelected].equipment[slotKey]].name)};
	}, [botNumberSelected, botInfo[botNumberSelected].equipment[slotKey]])

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
	// const handleClickRightButton = () => {
	// 	if (equipmentStaging.from && equipmentStaging.from.slot === slotKey) {
	// 		setEquipmentStaging(
	// 			{
	// 				from: null,
	// 				to: equipmentStaging.to
	// 			}
	// 		)
	// 	}
	// 	else {
	// 		setEquipmentStaging(
	// 			{
	// 				from: {
	// 					slot: slotKey,
	// 					type: type,
	// 					name: name
	// 				},
	// 				to: equipmentStaging.to
	// 			}
	// 		)
	// 	}
	// }
  return (
		<RowDiv className = 'centeredFlex'>
			{name ? (
				<StyledButton
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
			{botInfo[botNumberSelected].equipment[slotKey] === null ?
				equipmentStaging.from && equipmentStaging.from.slot === slotKey ? (
					<></>
					// <StyledButton
					// width = '60'
					// fontSize = '6'
					// handleClick = {unstage}
					// >
					// 	UNSELECT
					// </StyledButton>
				) : (
					<></>
					// <StyledButton
					// width = '60'
					// fontSize = '8'
					// handleClick = {stage}
					// >
					// 	SELECT
					// </StyledButton>
				)
			: (
				<StyledButton
					width = '60'
					fontSize = '6'
					handleClick = {unequip}
					>
						UNEQUIP
					</StyledButton>
			)}
		</RowDiv>
  )
}
export default ItemEquipped;

const RowDiv = styled.div`
	flex-direction: row;
`
{/* Right button should render conditionally based on click
				if no item is equipped then it should swap between selecting and unselecting slot
				if item is equipped it should only say unequip
			*/}
{/* <StyledButton
			// width = '60'
			// fontSize = '8'
			// // handleClick = {handleClickRightButton}
			// >
			// 	{botInfo[botNumberSelected].equipment[slotKey] === null ?
			// 		equipmentStaging.from && equipmentStaging.from.slot === slotKey ?
			// 		'UNSELECT'
			// 			:
			// 		'SELECT'
			// 	:
			// 		'REMOVE'
			// 	}
			// </StyledButton> */}