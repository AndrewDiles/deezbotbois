import React from 'react';
import styled from 'styled-components';

import {ic_brightness_auto} from 'react-icons-kit/md/ic_brightness_auto'// Attribute
import {profile} from 'react-icons-kit/icomoon/profile'// Base
import {suitcase} from 'react-icons-kit/ikons/suitcase'// Equipment
// import {sitemap} from 'react-icons-kit/fa/sitemap'// Tech
import {tree as tech} from 'react-icons-kit/icomoon/tree'
import {ic_exposure} from 'react-icons-kit/md/ic_exposure'// Change +/-
import {ic_change_history} from 'react-icons-kit/md/ic_change_history'// Change %
import {sigma} from 'react-icons-kit/icomoon/sigma'// Total
import ToolTipIcon from '../../ToolTip/ToolTipIcon';

const AttributeHeader = () => {
	return (
		<AttributeRow>
			<ToolTipIcon
			name = 'Attribute'
			iconImport = {ic_brightness_auto}
			selfLocation = 'left'
			animated = 'attribute'
			/>
			<ToolTipIcon
			name = 'Base'
			iconImport = {profile}
			selfLocation = 'left'
			animated = 'attribute'
			/>
			<ToolTipIcon
			name = 'Equipment'
			iconImport = {suitcase}
			selfLocation = 'center'
			animated = 'attribute'
			/>
			<ToolTipIcon
			name = 'Tech'
			iconImport = {tech}
			selfLocation = 'center'
			animated = 'attribute'
			/>
			<ToolTipIcon
			name = 'Sum'
			iconImport = {sigma}
			selfLocation = 'center'
			animated = 'attribute'
			/>
			<ToolTipIcon
			name = 'PlusMinus'
			iconImport = {ic_exposure}
			selfLocation = 'right'
			animated = 'attribute'
			/>
			<ToolTipIcon
			name = 'PercentChange'
			iconImport = {ic_change_history}
			selfLocation = 'right'
			animated = 'attribute'
			/>			
		</AttributeRow>
	)
}
export default AttributeHeader;

const AttributeRow = styled.div`
	display: grid;
	grid-template-columns: repeat(7,35px);
`