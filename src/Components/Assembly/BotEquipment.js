import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import baseBotAttributes, {attributeInfo} from '../../Constants/attributes';

const BotEquipment = ({ botNumberSelected, equipmentStaging, setEquipmentStaging}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [slots, setSlots] = useState({weapons: 0, accessories: 0})

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
			

			<h4>
				WEAPONS
			</h4>
			{slots.weapons>0 &&

			'Slot1'
			}
			{slots.weapons>1 &&

			'Slot2'
			}
			{slots.weapons>2 &&
			
			'Slot3'
			}
			<h4>
				ACCESSORIES
			</h4>
			{slots.accessories>0 &&
			
			'Slot1'
			}
			{slots.accessories>1 &&
			
			'Slot2'
			}
			{slots.accessories>2 &&
			
			'Slot3'
			}
			{slots.accessories>3 &&
			
			'Slot4'
			}
			{slots.accessories>4 &&
			
			'Slot5'
			}
			

			<h4>
				INVENTORY
			</h4>

    </div>
  )
}
export default BotEquipment;