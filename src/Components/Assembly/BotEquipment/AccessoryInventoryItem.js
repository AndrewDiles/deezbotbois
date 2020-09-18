import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';
import ToolTip from '../../ToolTip/ToolTip';
import AccessoryContents from '../../ToolTip/AccessoryContents';
import { accessoryStats } from '../../../Constants/equipment';
import { equipItem } from '../../../Redux/actions';

const AccessoryInventoryItem = ({ accessory, equipmentStaging, setEquipmentStaging, botNumberSelected  }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [messageHovered, setMessageHovered] = React.useState(false);

	React.useEffect(()=>{
		const target = document.getElementById(`${accessory}Button`)
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
	},[accessory, messageHovered])

	if (!userInfo.botBuilds || botNumberSelected === null) {
		return (<></>)
	}

	const stage = () => {
		setEquipmentStaging(
			{
				from: equipmentStaging.from,
				to: {
					type: 'accessory',
					name: accessory
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
	
  return (
		<ColDiv className = 'centeredFlex'>
			<RowDiv className = 'centeredFlex'>
				{(equipmentStaging.to && equipmentStaging.to.name === accessory) ? (
					<StyledButton
					id = {`${accessory}Button`}
					width = '180'
					handleClick = {unstage}
					selected = {equipmentStaging.to && equipmentStaging.to.name === accessory}
					>
						{accessoryStats[accessory].name}
    			</StyledButton>
				):(
					<StyledButton
					id = {`${accessory}Button`}
					width = '240'
					handleClick = {stage}
					selected = {equipmentStaging.to && equipmentStaging.to.name === accessory}
					>
						{accessoryStats[accessory].name}
    			</StyledButton>
				)}
						
				{(botInfo[botNumberSelected].equipment.acc1 === accessory ||
					botInfo[botNumberSelected].equipment.acc2 === accessory ||
					botInfo[botNumberSelected].equipment.acc3 === accessory ||
					botInfo[botNumberSelected].equipment.acc4 === accessory ||
					botInfo[botNumberSelected].equipment.acc5 === accessory
					) ? (
						<StyledButton
						disabled = 'true'
						width = '60'
						fontSize = '8'
						>
							EQUIPPED
						</StyledButton>
					) : (
						equipmentStaging.to && equipmentStaging.to.name === accessory && equipmentStaging.from ? (
							<StyledButton
							handleClick = {equip}
							width = '60'
							fontSize = '8'
							>
								EQUIP
							</StyledButton>
						): (
							equipmentStaging.to && equipmentStaging.to.name === accessory ? (
								<StyledButton
								handleClick = {unstage}
								width = '60'
								fontSize = '6'
								>
									UNSELECT
								</StyledButton>
							) : (
								<></>
								// <StyledButton
								// handleClick = {stage}
								// width = '60'
								// fontSize = '8'
								// >
								// 	SELECT
								// </StyledButton>
							)
						)
					)
				}
			</RowDiv>
			{messageHovered &&
				<ToolTip
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				width= '240'
				animated = {'equipment'}
				>
					{accessoryStats[accessory] &&
						<AccessoryContents
						accessoryInfo = {accessoryStats[accessory]}
						/>
					}
				</ToolTip>
			}
		</ColDiv>
  )
}
export default AccessoryInventoryItem;

const RowDiv = styled.div`
	flex-direction: row;
	margin-bottom: 1px;
`
const ColDiv = styled.div`
	flex-direction: column;
	margin-bottom: 1px;
`