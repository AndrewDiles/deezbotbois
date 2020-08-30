import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

import MessageDisplay from '../MessageDisplay/MessageDisplay';
import CreateNewBot from './CreateNewBot';
import SaveBots from './SaveBots';
import DeleteBot from './DeleteBot';
import BotSelection from './BotSelection';
import BotModel from './BotModel';
import BotEquipment from './BotEquipment';
import BotAI from './BotAI';
import BotScripts from './BotScripts';

const Assemble = () => {
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	const [botSnapshot, setBotSnapshot] = useState(JSON.parse(JSON.stringify(userInfo.botBuilds)));
	const [errorMsg, setErrorMsg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);
	const [botNumberSelected, setBotNumberSelected] = useState(0);
	// const [botLoaded, setBotLoaded] = useState(false);
	const colors = useSelector(getThemeColors);
	const botInfo = userInfo.botBuilds;

	// useEffect(() => {
	// 		setBotNumberSelected(0);
	// }, [userInfo.botBuilds.length]);
	useEffect(() => {
		let eraseSuccessMsg;
		if (successMsg) {
			eraseSuccessMsg = setTimeout(()=>{
				setSuccessMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseSuccessMsg)
	},[successMsg])
	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
	}
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<RowDivSpace>
				<ColDivCenter
				className = {'centeredFlex'}
				>
					<MessageDisplay
					type = {'success'}
					msg = {successMsg}
					setMsg = {setSuccessMsg}
					/>
					<MessageDisplay
					type = {'error'}
					msg = {errorMsg}
					setMsg = {setErrorMsg}
					/>
					{!successMsg && !errorMsg &&
					<h1>
						BUILD-EM
					</h1>
					}
				</ColDivCenter>
			</RowDivSpace>
			
			<RowDivSpace>
				<CreateNewBot
				setBotNumberSelected = {setBotNumberSelected}
				setErrorMsg = {setErrorMsg}
				setSuccessMsg = {setSuccessMsg}
				/>
				<SaveBots
				disabled = {JSON.stringify(botSnapshot) === JSON.stringify(botInfo)}
				setErrorMsg = {setErrorMsg}
				setSuccessMsg = {setSuccessMsg}
				setBotSnapshot = {setBotSnapshot}
				/>
				{/* Delete bot? */}
			</RowDivSpace>
			<br/>
			{botInfo.length > 0 &&
				<RowDivSpace>
					<BotSelection
					setBotNumberSelected = {setBotNumberSelected}
					botNumberSelected = {botNumberSelected}
					// botLoaded = {botLoaded} 
					// setBotLoaded = {setBotLoaded}
					/>
				</RowDivSpace>
			}
			{botInfo.length > 0 &&
				<DeleteBot
				setBotNumberSelected = {setBotNumberSelected}
				botNumberSelected = {botNumberSelected}
				setErrorMsg = {setErrorMsg}
				setSuccessMsg = {setSuccessMsg}
				setBotSnapshot = {setBotSnapshot}
				/>
			}
				<br/>
			{botInfo.length > 0 &&
				<AssemblyGrid>
					<BotModel
					botNumberSelected = {botNumberSelected}
					/>
					<BotEquipment
					botNumberSelected = {botNumberSelected}
					/>
					<BotAI
					botNumberSelected = {botNumberSelected}
					/>
					<BotScripts
					botNumberSelected = {botNumberSelected}
					/>
      	</AssemblyGrid>
			}
    </Wrapper>
  )
}
export default Assemble;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: center;
	color: ${props => props.colors.textColor};
	overflow: auto;
`
const AssemblyGrid = styled.div`
	display: grid;
	grid-gap: 20px;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	width: 1260px;
	margin-left: auto;
  margin-right: auto;
	overflow-y: auto;
	@media screen and (max-width: 1300px) {
    width: 620px;
		grid-template-columns: 1fr 1fr;
  }
	@media screen and (max-width: 750px) {
    width: 300px;
		grid-template-columns: 1fr;
  }

`
const RowDivSpace = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	/* width: ${props => props.cellSize && `${4*props.cellSize}px`}; */
	width: 300px;
`
const ColDivCenter = styled.div`
	/* width: ${props => props.cellSize && `${4*props.cellSize}px`}; */
	width: 300px;
	flex-direction: column;
`