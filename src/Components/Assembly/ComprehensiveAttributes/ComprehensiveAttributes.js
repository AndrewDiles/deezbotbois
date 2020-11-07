import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import { comprehensiveStatsAdditive, comprehensiveStatsMultiplicative, comprehensiveStatsBool } from '../../../Constants/attributes';

import Attribute from './Attribute';
import Command from './Command';

const ComprehensiveAttributes = ({ attributes }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	if (!userInfo.botBuilds || !attributes) {
		return (<></>)
	}
  return (
    <Wrapper>
			<h3>
			COMPREHENSIVE ATTRIBUTES
			</h3>
			<AttributeWrapper
			navLocation = {settings.navLocation}
			>
				{Object.keys(attributes).map((attribute)=>{
					return (
						attributes[attribute] === true || attributes[attribute] === false ? (
							<Command
							key = {attribute}
							attribute = {attribute}
							value = {attributes[attribute]}
							/>
						) : (
							<Attribute
							key = {attribute}
							attribute = {attribute}
							value = {attributes[attribute]}
							/>
						)
					)})}
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
	animation: 0.4s ease-out expand;
	/* border: 1px solid rgba(0,0,0,0.1); */
`
const AttributeWrapper = styled.div`
	width: 100%;
	display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props => props.navLocation === 'top' ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)'};
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1700px) {
    grid-template-columns: ${props => props.navLocation === 'top' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)'};
  }
	@media screen and (max-width: 1400px) {
    grid-template-columns: ${props => props.navLocation === 'top' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  }
	@media screen and (max-width: 1200px) {
    grid-template-columns: ${props => props.navLocation === 'top' ? 'repeat(2, 1fr)' : '1fr'};
  }
	@media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`