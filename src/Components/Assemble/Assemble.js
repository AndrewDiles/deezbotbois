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
import BotStats from './BotStats';
import BotTechTree from './BotTechTree';
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
					{successMsg &&
						<MessageDisplay
						type = {'success'}
						msg = {successMsg}
						setMsg = {setSuccessMsg}
						textSize = {'1.5em'}
						/>
					}
					{errorMsg &&
						<MessageDisplay
						type = {'error'}
						msg = {errorMsg}
						setMsg = {setErrorMsg}
						textSize = {'1.5em'}
						/>
					}
					{!successMsg && !errorMsg &&
					<h2>
						BUILD-EM
					</h2>
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
				<AssemblyGrid
				navLocation = {settings.navLocation}
				>
					<BotModel
					botNumberSelected = {botNumberSelected}
					/>
					<BotEquipment
					botNumberSelected = {botNumberSelected}
					/>
					<BotStats
					botNumberSelected = {botNumberSelected}
					/>
					<BotTechTree
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
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	width: 1550px;
	margin-left: auto;
  margin-right: auto;
	overflow-y: auto;
	@media screen and 
	(max-width: ${props => props.navLocation === 'top' ? '1700px' : '1830px'}) {
		width: 1030px;
		grid-template-columns: 1fr 1fr 1fr 1fr;
  }
	@media screen and 
	(max-width: ${props => props.navLocation === 'top' ? '1150px' : '1280px'}) {
    width: 510px;
		grid-template-columns: 1fr 1fr;
  }
	@media screen and
	(max-width: ${props => props.navLocation === 'top' ? '700px' : '830px'}) {
    width: 250px;
		grid-template-columns: 1fr;
  }

`
const RowDivSpace = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	/* width: ${props => props.cellSize && `${4*props.cellSize}px`}; */
	width: 250px;
`
const ColDivCenter = styled.div`
	/* width: ${props => props.cellSize && `${4*props.cellSize}px`}; */
	width: 250px;
	flex-direction: column;
`