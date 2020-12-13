import React from 'react';
import styled from 'styled-components';
import WeaponInventoryItem from '../../Assembly/BotEquipment/WeaponInventoryItem';

const Weapons = ({ cellContents }) => {
	const [hasAnAccEquiped, setHasAnAccEquiped] = React.useState(1);

	React.useEffect(()=>{
		let foundEquipped = 0;
		for(let i = 1; i < 4; i++) {
			if(cellContents.equipment[`arm${i}`]) {
				foundEquipped = 1;
				break;
			}
		}
		setHasAnAccEquiped(foundEquipped);
	},[cellContents])

  return (
    <Wrapper className = 'startFlex col'>
			{hasAnAccEquiped ? (
				<>
					{['arm1','arm2','arm3'].map((slot, index)=>{
						return cellContents.equipment[slot] ? (
							<WeaponInventoryItem
							key = {index}
							weapon = {cellContents.equipment[slot]}
							equipmentStaging = {{}}
							setEquipmentStaging = {()=>{}}
							botNumberSelected = {0}
							alreadyEquipped = {0}
							setMessageDisplayed = {()=>{}}
							altBaseSize = {220}
							notEquipable = {1}
							/>
						) : (
							null
						)
					})}
				</>
			) : (
				'NO WEAPONS EQUIPPED'
			)}
		</Wrapper>
  )
}

export default Weapons;
const Wrapper = styled.div`
	width: 100%;
	overflow-y: auto;
	margin-top: 15px;
`