import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import { generateAttributes } from '../../Constants/attributeObjectGenerator';
import getNodeArray from '../../Constants/scriptHelpers/getNodeArray';
import styled from 'styled-components';

import MessageDisplay from '../MessageDisplay/MessageDisplay';
import CreateNewBot from './CreateNewBot';
import SaveBots from './SaveBots';
import DeleteBot from './DeleteBot';
import BotSelection from './BotSelection';
import AssemblyTabControl from './AssemblyTabControl';
import ComprehensiveTabControl from './ComprehensiveTabControl';
import BotModel from './BotModel/BotModel';
import BotEquipment from './BotEquipment/BotEquipment';
import BotAttributes from './BotAttributes/BotAttributes';
import BotTechTree from './BotTechTree/BotTechTree';
import BotAI from './BotAI/BotAI';
import BotScripts from './BotScripts/BotScripts';
import ComprehensiveAttributes from './ComprehensiveAttributes/ComprehensiveAttributes';

const Assembly = () => {
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	const [botSnapshot, setBotSnapshot] = useState(JSON.parse(JSON.stringify(userInfo.botBuilds)));
	const [errorMsg, setErrorMsg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);
	const [botNumberSelected, setBotNumberSelected] = useState(0);
	const [equipmentStaging, setEquipmentStaging] = useState({from: null, to: null})
	const [tabsDisplayed, setTabsDisplayed] = useState({model: true, equipment: false, attributes: false, techTree: false, ai: false, scripts: false, comprehensive: false});
	const [comprehensiveTabDisplayed, setComprehensiveTabDisplayed] = useState(false);
	const [tabsOpened, setTabsOpened] = useState(1);
	const [attributes, setAttributes] = useState({});
	const initialAiAndScriptsElements = [ { type:'head', index: 0 } ];
	const [aiAndScripts, setAiAndScripts] = useState({insertion: [], viewing: []});
	const colors = useSelector(getThemeColors);
	const botInfo = userInfo.botBuilds;
	const [activeNodeArray, setActiveNodeArray] = React.useState([]); // move this up a level because scripts needs it in the plus button?

	

	useEffect(() => {
		if (userInfo.botBuilds.length > 0) setTabsDisplayed({model: true, equipment: true, attributes: true, techTree: true, ai: true, scripts: true, comprehensive: false});
	}, []);
	useEffect(() => {
		let newTabCount = 0;
		Object.keys(tabsDisplayed).forEach((tab)=>{
			if (tabsDisplayed[tab]) newTabCount ++
		})
		setTabsOpened(newTabCount)
	}, [tabsDisplayed]);

	useEffect(() => {
		let eraseSuccessMsg;
		if (successMsg) {
			eraseSuccessMsg = setTimeout(()=>{
				setSuccessMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseSuccessMsg)
	},[successMsg])

	useEffect(()=>{
		setEquipmentStaging({from: null, to: null})
		setAiAndScripts({ insertion : null, viewing : initialAiAndScriptsElements });
	},[botNumberSelected])
	// Need to reset insertion upon navigation and changing of nodes

	// useEffect(()=>{
	// 	setEquipmentStaging({from: null, to: null})
	// },[botNumberSelected, botInfo[botNumberSelected] && botInfo[botNumberSelected].model])

	React.useEffect(()=>{
		if (!userInfo.botBuilds) return
		setActiveNodeArray(getNodeArray(userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing ))
	},[setActiveNodeArray, botNumberSelected, userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing])

// Need to reset insertion upon navigation and changing of nodes
	useEffect(()=>{
		if (userInfo.botBuilds.length > 0 && userInfo.botBuilds[botNumberSelected]) {
			// console.log('updating attributes')
			setAttributes(generateAttributes(userInfo.botBuilds[botNumberSelected]))
		}
	},[botNumberSelected, JSON.stringify(botInfo[botNumberSelected])
	// , botInfo[botNumberSelected].model, botInfo[botNumberSelected].techTree, botInfo[botNumberSelected].equipment  
])
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
			<RowDivSpace
			className = 'centeredFlex'
			>
				<h2>
					BUILD-EM
				</h2>
			</RowDivSpace>

			<RowDivSpace
			className = 'centeredFlex'
			>
				{successMsg &&
					<MessageDisplay
					type = {'success'}
					msg = {successMsg}
					setMsg = {setSuccessMsg}
					textSize = {'1.7em'}
					margin = '1'
					/>
				}
				{errorMsg &&
					<MessageDisplay
					type = {'error'}
					msg = {errorMsg}
					setMsg = {setErrorMsg}
					textSize = {'1.7em'}
					margin = '1'
					/>
				}
				{!errorMsg && !successMsg &&
					<>
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
					</>
				}
			</RowDivSpace>
			<br/>
			{botInfo.length > 1 &&
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
			{userInfo.botBuilds.length > 0 &&
				<>
					<AssemblyTabControl
					tabsDisplayed = {tabsDisplayed}
					setTabsDisplayed = {setTabsDisplayed}
					/>
					<ComprehensiveTabControl
					attributes = {attributes}
					comprehensiveTabDisplayed = {comprehensiveTabDisplayed}
					setComprehensiveTabDisplayed = {setComprehensiveTabDisplayed}
					/>
					<br/>
				</>
			}
			{botInfo.length > 0 &&
				<AssemblyGrid
				navLocation = {settings.navLocation}
				profileTab = {settings.profileTab}
				tabsOpened = {tabsOpened}
				>
					{tabsDisplayed.model &&
						<BotModel
						botNumberSelected = {botNumberSelected}
						/>
					}
					{tabsDisplayed.equipment &&
						<BotEquipment
						botNumberSelected = {botNumberSelected}
						equipmentStaging = {equipmentStaging} 
						setEquipmentStaging = {setEquipmentStaging}
						/>
					}
					{tabsDisplayed.attributes &&
						<BotAttributes
						botNumberSelected = {botNumberSelected}
						equipmentStaging = {equipmentStaging}
						setEquipmentStaging = {setEquipmentStaging}
						/>
					}
					{tabsDisplayed.techTree &&
						<BotTechTree
						botNumberSelected = {botNumberSelected}
						/>
					}
					{tabsDisplayed.ai &&
						<BotAI
						botNumberSelected = {botNumberSelected}
						aiAndScripts = {aiAndScripts}
						setAiAndScripts = {setAiAndScripts}
						activeNodeArray = {activeNodeArray}
						setActiveNodeArray = {setActiveNodeArray}
						/>
					}
					{tabsDisplayed.scripts &&
						<BotScripts
						attributes = {attributes}
						aiAndScripts = {aiAndScripts}
						setAiAndScripts= {setAiAndScripts}
						activeNodeArray = {activeNodeArray}
						setActiveNodeArray = {setActiveNodeArray}
						botNumberSelected = {botNumberSelected}
						/>
					}
      	</AssemblyGrid>
			}
			{comprehensiveTabDisplayed && 
				<ComprehensiveAttributes
				attributes = {attributes}
				/>
			}
    </Wrapper>
  )
}
export default Assembly;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	padding-bottom: 250px;
	display : flex;
	flex-direction: column;
	/* justify-content: center; */
	align-content: center;
	align-items: center;
	color: ${props => props.colors.textColor};
	overflow-y: auto;
`
const AssemblyGrid = styled.div`
	display: grid;
	grid-gap: 60px 10px;
	/* grid-template-columns: repeat(6, 1fr); */
	grid-template-columns: ${props => `repeat(${props.tabsOpened ? Math.min(props.tabsOpened,6) : 6}, 252px)`};
	/* width: 1550px; */
	width: 100%;
	margin-left: auto;
  margin-right: auto;
	/* grid-auto-flow: dense; */
	justify-content: center;
	justify-items: center;
	/* overflow-y: auto; */
	@media screen and (max-width: ${props => props.navLocation === 'top' ? 
		props.profileTab === 'active' ? '1735px' : '1600px' :
		props.profileTab === 'active' ? '1865px' : '1730px'}
	) {
		grid-template-columns: ${props => `repeat(${props.tabsOpened ? Math.min(props.tabsOpened,4) : 4}, 252px)`};
  }
	@media screen and (max-width: ${props => props.navLocation === 'top' ? 
		props.profileTab === 'active' ? '1285px' : '1150px' :
		props.profileTab === 'active' ? '1415px' : '1280px'}
	) {
		grid-template-columns: ${props => `repeat(${props.tabsOpened ? Math.min(props.tabsOpened,2) : 2}, 252px)`};
  }
	@media screen and (max-width: ${props => props.navLocation === 'top' ? 
		props.profileTab === 'active' ? '835px' : '700px' :
		props.profileTab === 'active' ? '965px' : '830px'}
	) {
		grid-template-columns: 252px;
  }

`
const RowDivSpace = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	width: 250px;
`
const ColDivCenter = styled.div`
	width: 250px;
	flex-direction: column;
`