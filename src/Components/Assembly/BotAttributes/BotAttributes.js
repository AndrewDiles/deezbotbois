import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import { displayedAttributes } from '../../../Constants/attributes';

import AttributeHeader from './AttributeHeader';
import Attribute from './Attribute';

const BotAttributes = ({ botNumberSelected, equipmentStaging, setEquipmentStaging }) => {
	const userInfo = useSelector((state) => state.userInfo);
	if (!userInfo.botBuilds) {
		return (<></>)
	}
  return (
    <Wrapper
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
    </Wrapper>
  )
}
export default BotAttributes;
const Wrapper = styled.div`
	width: 249px;
`
const AttributeWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	flex-direction: column;
`