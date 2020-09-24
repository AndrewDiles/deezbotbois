import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { unequipItem } from'../../../Redux/actions';
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
	const dispatch = useDispatch();
	const [slots, setSlots] = useState({weapons: 0, accessories: 0});
	const [typeViewing, setTypeViewing] = useState('weapons');
	const [inventoryIndexRange, setInventoryIndexRange] = useState({min:0, max:3});
	const [messageDisplayed, setMessageDisplayed] = React.useState(false);

	React.useEffect(()=>{
		if (!botInfo[botNumberSelected]) return;
		// only array index 21 can increase wep / acc count
		let wepSlots = baseBotAttributes[botInfo[botNumberSelected].model].WeaponSlots;
		let accSlots = baseBotAttributes[botInfo[botNumberSelected].model].AccessorySlots;
		// console.log(baseBotAttributes[botInfo[botNumberSelected].model].TechTree[21].affect)
		if (baseBotAttributes[botInfo[botNumberSelected].model].TechTree[21] && baseBotAttributes[botInfo[botNumberSelected].model].TechTree[21].affect === 'accessorySlot' &&
		botInfo[botNumberSelected].techTree[21]
		) accSlots ++
		else {
			dispatch(unequipItem(botNumberSelected,`acc${accSlots+1}`));
		}
		if (baseBotAttributes[botInfo[botNumberSelected].model].TechTree[21] && baseBotAttributes[botInfo[botNumberSelected].model].TechTree[21].affect === 'weaponSlot' &&
		botInfo[botNumberSelected].techTree[21]
		) wepSlots ++
		else {
			dispatch(unequipItem(botNumberSelected,`arm${wepSlots+1}`));
		}
		setSlots({
			weapons: wepSlots,
			accessories: accSlots,
		});
	},[ botNumberSelected, botInfo[botNumberSelected],
	botInfo[botNumberSelected] && botInfo[botNumberSelected].model, botInfo[botNumberSelected] && botInfo[botNumberSelected].techTree[21] 
	])
	if (!userInfo.botBuilds || !userInfo.botBuilds[botNumberSelected]) {
		return (<></>)
	}
	const clickUp = () => {
		setInventoryIndexRange({min:inventoryIndexRange.min-1,max:inventoryIndexRange.max-1})
	}
	const clickDown = () => {
		setInventoryIndexRange({min:inventoryIndexRange.min+1,max:inventoryIndexRange.max+1})
	}
  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			<h3>
			EQUIPMENT
			</h3>
			<RowDiv className = 'centeredFlex'>
				<StyledButton
				handleClick = {e=> {setInventoryIndexRange({min:0, max:3});setTypeViewing('weapons');setEquipmentStaging({from: null, to: null})}}
				selected = {typeViewing === 'weapons'}
				disabled = {typeViewing === 'weapons'}
				width = '120'
				fontSize = '10'
				>
					WEAPONS
				</StyledButton>
				<StyledButton
				handleClick = {e=> {setInventoryIndexRange({min:0, max:3});setTypeViewing('accessories');setEquipmentStaging({from: null, to: null})}}
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
					<p>
						WEAPONS
					</p>
					<ColDiv 
					numberOfSlots = {slots.weapons}
					>
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
					<p>
						ACCESSORIES
					</p>
					<ColDiv 
					numberOfSlots = {slots.accessories}
					>
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
			<p>
				INVENTORY
			</p>
			{(typeViewing === 'weapons' && Object.keys(userInfo.availableArms).length > 4) ||
				(typeViewing === 'accessories' && Object.keys(userInfo.availableAcc).length > 4) &&
				<StyledIcon
				handleClick = {clickUp}
				disabled = {inventoryIndexRange.min === 0}
				icon = {arrowUp}
				/>
			}
			{typeViewing === 'weapons' &&
				<InventoryWrapper
				heightMultiplier = {Object.keys(userInfo.availableAcc).length}
				>
					{userInfo.availableArms.map((weapon, index)=>{
						if (index <= inventoryIndexRange.max && index >= inventoryIndexRange.min) {
							return(
								<WeaponInventoryItem
								key = {weapon}
								weapon = {weapon}
								equipmentStaging = {equipmentStaging}
								setEquipmentStaging = {setEquipmentStaging}
								botNumberSelected = {botNumberSelected}
								alreadyEquipped = {Object.values(userInfo.botBuilds[botNumberSelected].equipment).includes(weapon)}
								setMessageDisplayed = {setMessageDisplayed}
								/>
							)
						}
					})}
				</InventoryWrapper>
			}
			{typeViewing === 'accessories' &&
				<InventoryWrapper
				heightMultiplier = {Object.keys(userInfo.availableAcc).length}
				>
					{userInfo.availableAcc.map((accessory, index)=>{
						if (index <= inventoryIndexRange.max && index >= inventoryIndexRange.min) {	
							return(
								<AccessoryInventoryItem
								key = {accessory}
								accessory = {accessory}
								equipmentStaging = {equipmentStaging}
								setEquipmentStaging = {setEquipmentStaging}
								botNumberSelected = {botNumberSelected}
								alreadyEquipped = {Object.values(userInfo.botBuilds[botNumberSelected].equipment).includes(accessory)}
								setMessageDisplayed = {setMessageDisplayed}
								/>
							)
						}
					})}
				</InventoryWrapper>
			}
			{(typeViewing === 'weapons' && Object.keys(userInfo.availableArms).length > 4) ||
				(typeViewing === 'accessories' && Object.keys(userInfo.availableAcc).length > 4) && !messageDisplayed &&
				<StyledIcon
				handleClick = {clickDown}
				disabled = {inventoryIndexRange.max+1 === Object.keys(userInfo.availableAcc).length}
				icon = {arrowDown}
				/>
			}
    </Wrapper>
  )
}
export default BotEquipment;
const Wrapper = styled.div`
	width: 249px;
`
const ColDiv = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	text-align: center;
	flex-direction: column;
	height: ${props => props.numberOfSlots && `${/* 60 + */(42*props.numberOfSlots)}px`};
`
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
`
const InventoryWrapper = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	text-align: center;
	flex-direction: column;
	max-height: 300px;
	/* z-index: 5; */
	height: ${props => props.heightMultiplier > 3 ? '167px' : `${(props.heightMultiplier*41)}px`};
	/* overflow-y: scroll; */
`