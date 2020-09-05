import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import AttributeHeader from './AttributeHeader';
import Attribute from './Attribute';


const BotAttributes = ({ botNumberSelected, equipmentStaging, setEquipmentStaging }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const displayedAttributes = [
		'BAR',
		'Durability',
		'Armor',
		'Shield',
		'Accuracy',
		'Power',
		'Capacitor',
		'Reactor',
		'AutoRepair',
		'ScanDistance',
		'ScanCost',
		'MovementDistance',
		'MovementCost',
		'Initiative'
	];

	if (!userInfo.botBuilds) {
		return (<></>)
	}
  return (
    <div
		className = "assemblyGridChild" 
		>
			<h3>
			ATTRIBUTES
			</h3>
			<AttributeHeader/>
			<AttributeWrapper>
				{displayedAttributes.map((attribute)=>{
					return(
						<Attribute
						key = {attribute}
						attribute = {attribute}
						botNumberSelected = {botNumberSelected}
						equipmentStaging = {equipmentStaging}
						>
						</Attribute>
					)
				})}
			</AttributeWrapper>
    </div>
  )
}
export default BotAttributes;
const AttributeWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	flex-direction: column;
`