import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const WaitCommand = ({ nodeInfo, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {

	const [displayInfo, setDisplayInfo] = React.useState(false)

	return (
		<div className = 'innerNodeOptionsWrapper'>
			<br/>
			<div className = 'centeredFlex aiTitle'>
				WAIT COMMAND
			</div>
			<div className ='aiButtonRow'>
				<StyledButton
				handleClick = {()=>setDisplayInfo(false)}
				selected = {displayInfo === false}
				fontSize = '9'
				>
					INSTRUCTIONS
				</StyledButton>
				<StyledButton
				handleClick = {()=>setDisplayInfo(true)}
				selected = {displayInfo === true}
				fontSize = '9'
				>
					INFORMATION
				</StyledButton>
			</div>
			{displayInfo ? (
				<div className = 'commandContents infoContents'>
					<span>
					The execution of this command will cause the executor to perform no action.
					</span>
					<br/>
					<span>
					This can be useful as a means of regathering energy.
					</span>
					<br/>
					<span>
						Consider executing it if the executor:
						<ul>
							<li>
								has not detected the presence of any enemies
							</li>
							<br/>
							<li>
								has not taken damage in the previous turn
							</li>
							<br/>
							<li>
								does not have a full capacitor
							</li>
						</ul>
					</span>
				</div>
			) : (
				<div className = 'commandContents'>
					<span>
					THIS COMMAND DOES NOT REQUIRE ANY INSTRUCTIONS
					</span>
				</div>
			)}
		</div>
	)
}
export default WaitCommand;

// const Title = styled.div`
// 	height: 52px;
// 	width: 100%;
// 	font-size: 1.3em;
// 	white-space: normal;
// 	border-top: 1px solid rgba(0,0,0,0.24);
// `