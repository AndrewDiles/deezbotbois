import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../../Redux/reducers/user-reducer';
import WarningIcons from '../WarningIcons';

const WarningBar = ({ children }) => {
	const colors = useSelector(getThemeColors);

	return (		
		<Warning
		colors = {colors}
		>
			<WarningIcons/>
				{children}
			<WarningIcons/>
		</Warning>
	)
}
export default WarningBar;
const Warning = styled.div`
	color: ${props => props.colors.hoveredText};
	background: rgba(255,0,0,0.2);
`