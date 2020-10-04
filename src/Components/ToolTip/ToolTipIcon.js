import React, { useState } from 'react';

import StyledIcon from '../StyledIcon/StyledIcon';
import ToolTip from './ToolTip';
import {attributeInfo} from '../../Constants/attributes';

const ToolTipIcon = ({ name, iconImport, selfLocation, animated }) => {
	const [messageHovered, setMessageHovered] = useState(false);
	const handleClick = () => {
		setMessageHovered(!messageHovered);
	}
	return (
			messageHovered ? (
				<ToolTip
				messageHovered = {messageHovered}
				setMessageHovered = {setMessageHovered}
				// fontSize = '0.35em'
				fontSize = '8px'
				selfLocation = {selfLocation}
				animated = {animated}
				height = '37'
				>
					{attributeInfo[name].indexOf(":") > 0 ? (
						<>
							<b>{attributeInfo[name].slice(0,attributeInfo[name].indexOf(":"))}</b>
							{attributeInfo[name].slice(2+attributeInfo[name].indexOf(":"),attributeInfo[name].length)}
						</>

					) : (
						attributeInfo[name]
					)}
					
				</ToolTip>
			):(
				iconImport && (
					<StyledIcon
					id = {`${name}Icon`}
					icon = {iconImport}
					size = {15}
					padding = 'mini'
					handleClick = {handleClick}
					/>
				)
			)
	)
}
export default ToolTipIcon