import React from 'react';
import styled from 'styled-components';
import Attribute from '../../Assembly/ComprehensiveAttributes/Attribute';

const Attributes = ({ cellContents }) => {
	// const colors = useSelector(getThemeColors);
	console.log('cellContents from inside Attributes', cellContents)
  return (
    <Wrapper className = 'startFlex col'>
			{cellContents.attributes.CurrentBurn &&
				<Attribute
				attribute = 'Burn'
				value = {cellContents.attributes.CurrentBurn}
				singleLeftDisplay = {1}
				/>
			}
			<Attribute
			attribute = 'Durability'
			value = {cellContents.attributes.Durability}
			currentValue = {cellContents.attributes.CurrentDurability}
			singleLeftDisplay = {1}
			/>
			<Attribute
			attribute = 'Capacitor'
			value = {cellContents.attributes.Capacitor}
			currentValue = {cellContents.attributes.CurrentCapacitor}
			singleLeftDisplay = {1}
			/>
			
		</Wrapper>
  )
}

export default Attributes;
const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	margin-top: 15px;
	overflow-y: auto;
	font-size: 1.5em;
`