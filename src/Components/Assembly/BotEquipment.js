import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import baseBotAttributes, {attributeInfo} from '../../Constants/attributes';
import ItemEquipped from './ItemEquipped';
import StyledButton from '../StyledButton/StyledButton';
import WeaponInventoryItem from './WeaponInventoryItem';

const BotEquipment = ({ botNumberSelected, equipmentStaging, setEquipmentStaging}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [slots, setSlots] = useState({weapons: 0, accessories: 0});
	const [typeViewing, setTypeViewing] = useState('weapons');

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
  return (
    <div
		className = "assemblyGridChild" 
		>
			<h3>
			EQUIPMENT
			</h3>
			<RowDiv>
				<StyledButton
				handleClick = {e=> {setTypeViewing('weapons');setEquipmentStaging({from: null, to: null})}}
				selected = {typeViewing === 'weapons'}
				disabled = {typeViewing === 'weapons'}
				width = '125'
				fontSize = '10'
				>
					WEAPONS
				</StyledButton>
				<StyledButton
				handleClick = {e=> {setTypeViewing('accessories');setEquipmentStaging({from: null, to: null})}}
				selected = {typeViewing === 'accessories'}
				disabled = {typeViewing === 'accessories'}
				width = '125'
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
			{typeViewing === 'weapons' &&
				<ColDiv className = 'centeredFlex'>
					{userInfo.availableArms.map((weapon)=>{
						//only display if it is not equipped
						if (!Object.values(userInfo.botBuilds[botNumberSelected].equipment).includes(weapon)){
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
					})
					
					}
				</ColDiv>
			}
			{typeViewing === 'accessories' &&
				<ColDiv className = 'centeredFlex'>

				</ColDiv>
			}

			{/* Inventory needs to verify if they item is already equiped to deny its equippability (sp?) */}
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