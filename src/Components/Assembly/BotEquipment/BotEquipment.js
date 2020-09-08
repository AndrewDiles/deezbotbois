import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import baseBotAttributes, {attributeInfo} from '../../../Constants/attributes';
import ItemEquipped from './ItemEquipped';
import StyledButton from '../../StyledButton/StyledButton';
import WeaponInventoryItem from './WeaponInventoryItem';
import AccessoryInventoryItem from './AccessoryInventoryItem';
import StyledIcon from '../../StyledIcon/StyledIcon';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp';
import {arrowDown} from 'react-icons-kit/icomoon/arrowDown';

const BotEquipment = ({ botNumberSelected, equipmentStaging, setEquipmentStaging}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [slots, setSlots] = useState({weapons: 0, accessories: 0});
	const [typeViewing, setTypeViewing] = useState('weapons');
	const [inventoryIndexRange, setInventoryIndexRange] = useState({min:0, max:5});

	React.useEffect(()=>{
		if (botNumberSelected === null || botNumberSelected === undefined) return;
		setSlots({
			weapons: baseBotAttributes[botInfo[botNumberSelected].model].WeaponSlots, 
			accessories: baseBotAttributes[botInfo[botNumberSelected].model].AccessorySlots, 
		});
	},[botNumberSelected, botInfo[botNumberSelected].model ])
	if (!userInfo.botBuilds) {
		return (<></>)
	}
	const clickUp = () => {
		setInventoryIndexRange({min:inventoryIndexRange.min-1,max:inventoryIndexRange.max-1})
	}
	const clickDown = () => {
		setInventoryIndexRange({min:inventoryIndexRange.min+1,max:inventoryIndexRange.max+1})
	}
  return (
    <div
		className = "assemblyGridChild" 
		>
			<h3>
			EQUIPMENT
			</h3>
			<RowDiv className = 'centeredFlex'>
				<StyledButton
				handleClick = {e=> {setInventoryIndexRange({min:0, max:5});setTypeViewing('weapons');setEquipmentStaging({from: null, to: null})}}
				selected = {typeViewing === 'weapons'}
				disabled = {typeViewing === 'weapons'}
				width = '120'
				fontSize = '10'
				>
					WEAPONS
				</StyledButton>
				<StyledButton
				handleClick = {e=> {setInventoryIndexRange({min:0, max:5});setTypeViewing('accessories');setEquipmentStaging({from: null, to: null})}}
				selected = {typeViewing === 'accessories'}
				disabled = {typeViewing === 'accessories'}
				width = '120'
				fontSize = '10'
				>
					ACCESSORIES
				</StyledButton>
			</RowDiv>
			{typeViewing === 'weapons' &&
				<>
					<h4>
						WEAPONS
					</h4>
					<ColDiv className = 'centeredFlex'>
						{slots.weapons>0 &&
							<ItemEquipped
							slotKey = 'arm1'
							type = 'weapon'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
						{slots.weapons>1 &&
							<ItemEquipped
							slotKey = 'arm2'
							type = 'weapon'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
						{slots.weapons>2 &&
							<ItemEquipped
							slotKey = 'arm3'
							type = 'weapon'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
					</ColDiv>
				</>
			}
			{typeViewing === 'accessories' &&
				<>
					<h4>
						ACCESSORIES
					</h4>
					<ColDiv className = 'centeredFlex'>
						{slots.accessories>0 &&
							<ItemEquipped
							slotKey = 'acc1'
							type = 'accessory'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
						{slots.accessories>1 &&
							<ItemEquipped
							slotKey = 'acc2'
							type = 'accessory'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
						{slots.accessories>2 &&
							<ItemEquipped
							slotKey = 'acc3'
							type = 'accessory'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
						{slots.accessories>3 &&
							<ItemEquipped
							slotKey = 'acc4'
							type = 'accessory'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
						{slots.accessories>4 &&
							<ItemEquipped
							slotKey = 'acc5'
							type = 'accessory'
							equipmentStaging = {equipmentStaging}
							setEquipmentStaging = {setEquipmentStaging}
							botNumberSelected = {botNumberSelected}
							/>
						}
					</ColDiv>
				</>
			}
			<h4>
				INVENTORY
			</h4>
			{/* <StyledIcon
			handleClick = {clickUp}
			disabled = {inventoryIndexRange.min === 0}
			icon = {arrowUp}
			/> */}
			{/* UP ARROW only clickable if index.min > 0*/}
			{typeViewing === 'weapons' &&
				<InventoryWrapper className = 'centeredFlex'>
					{userInfo.availableArms.map((weapon, index)=>{
						// Only display if it is not equipped
						if (!Object.values(userInfo.botBuilds[botNumberSelected].equipment).includes(weapon)){
							// Only display if index is window the viewing range
							if (index <= inventoryIndexRange.max && index >= inventoryIndexRange.min) {
								return(
									<WeaponInventoryItem
									key = {weapon}
									weapon = {weapon}
									equipmentStaging = {equipmentStaging}
									setEquipmentStaging = {setEquipmentStaging}
									botNumberSelected = {botNumberSelected}
									/>
								)
							}
						}
					})}
				</InventoryWrapper>
			}
			{typeViewing === 'accessories' &&
				<InventoryWrapper className = 'centeredFlex'>
						{userInfo.availableAcc.map((accessory, index)=>{
						if (!Object.values(userInfo.botBuilds[botNumberSelected].equipment).includes(accessory)){
							if (index <= inventoryIndexRange.max && index >= inventoryIndexRange.min) {	
								return(
										<AccessoryInventoryItem
										key = {accessory}
										accessory = {accessory}
										equipmentStaging = {equipmentStaging}
										setEquipmentStaging = {setEquipmentStaging}
										botNumberSelected = {botNumberSelected}
										/>
								)
							}
						}
					})}
				</InventoryWrapper>
			}
			{/* <StyledIcon
			handleClick = {clickDown}
			disabled = {inventoryIndexRange.max === Object.keys(userInfo.availableAcc).length}
			icon = {arrowDown}
			/> */}
			{/* DOWN ARROW only clickable if index.max < Object.keys.length*/}
    </div>
  )
}
export default BotEquipment;
const ColDiv = styled.div`
	flex-direction: column;
`
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
`
const InventoryWrapper = styled.div`
	flex-direction: column;
	max-height: 300px;
	/* overflow-y: scroll; */
`