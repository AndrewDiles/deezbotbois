import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import iconImporter from '../../../Constants/iconImporter';

import ToolTipIcon from '../../ToolTip/ToolTipIcon';

const Attribute = ({ attribute, value, type }) => {
	const colors = useSelector(getThemeColors);
	const [icons, setIcons] = React.useState(null);

	useEffect(()=>{
		setIcons(iconImporter(attribute))
	},[attribute]);

	if (!icons) {
		return (<></>)
	}
	
  return (
    <AttributeRow>
			{attribute}
			{value}
    </AttributeRow>
  )
}
export default Attribute;
const AttributeRow = styled.div`

`