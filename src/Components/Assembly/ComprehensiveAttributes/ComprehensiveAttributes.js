import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import { comprehensiveStatsAdditive, comprehensiveStatsMultiplicative, comprehensiveStatsBool } from '../../../Constants/attributes';

import Attribute from './Attribute';

const ComprehensiveAttributes = ({ attributes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	if (!userInfo.botBuilds || !attributes) {
		return (<></>)
	}
  return (
    <Wrapper>
			<h3>
			COMPREHENSIVE ATTRIBUTES
			</h3>
			<AttributeWrapper>
				{Object.keys(attributes).map((attribute)=>{
					return(
						<Attribute
						key = {attribute}
						attribute = {attribute}
						value = {attributes[attribute]}
						type = 'bool'
						>
						</Attribute>
					)
				})}
				{/* {comprehensiveStatsAdditive.map((attribute)=>{
					return(
						<Attribute
						key = {attribute}
						attribute = {attribute}
						value = {attributes[attribute]}
						type = 'additive'
						>
						</Attribute>
					)
				})}
				{comprehensiveStatsMultiplicative.map((attribute)=>{
					return(
						<Attribute
						key = {attribute}
						attribute = {attribute}
						value = {attributes[attribute]}
						type = 'multiplicative'
						>
						</Attribute>
					)
				})}
				{comprehensiveStatsBool.map((attribute)=>{
					return(
						<Attribute
						key = {attribute}
						attribute = {attribute}
						value = {attributes[attribute]}
						type = 'bool'
						>
						</Attribute>
					)
				})} */}
			</AttributeWrapper>
    </Wrapper>
  )
}
export default ComprehensiveAttributes;
const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	min-height: 600px;
	border: 1px solid rgba(0,0,0,0.1);
`
const AttributeWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	flex-direction: column;
`