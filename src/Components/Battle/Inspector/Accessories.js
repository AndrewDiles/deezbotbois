import React from 'react';
import styled from 'styled-components';
import AccessoryInventoryItem from '../../Assembly/BotEquipment/AccessoryInventoryItem';

const Accessories = ({ cellContents }) => {
	const [hasAnAccEquiped, setHasAnAccEquiped] = React.useState(1);

	React.useEffect(()=>{
		let foundEquipped = 0;
		for(let i = 1; i < 6; i++) {
			if(cellContents.equipment[`acc${i}`]) {
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
				{['acc1','acc2','acc3', 'acc4', 'acc5'].map((slot, index)=>{
					return cellContents.equipment[slot] ? (
						<AccessoryInventoryItem
						key = {index}
						accessory = {cellContents.equipment[slot]}
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
				'NO ACCESSORIES EQUIPPED'
			)}
		</Wrapper>
  )
}

export default Accessories;
const Wrapper = styled.div`
	width: 100%;
	overflow-y: auto;
	margin-top: 15px;
	padding-bottom: 40px;
`