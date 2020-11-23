import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import tips from '../../Constants/levels/extensionTips';
import TextCrawler from '../TextCrawler/TextCrawler'

const LevelSelectorExtension = ({ selectionOptions }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const crawlRate = 100;
	function randomizeIndex() {
		return Math.floor(Math.random()*tips.length)
	}
	const [currentTipIndex, setCurrentTipIndex] = React.useState(randomizeIndex());

	React.useEffect(()=>{
		const setNewTip = setInterval(()=>{
			let newIndex = randomizeIndex();
			while (newIndex === currentTipIndex) {
				newIndex = randomizeIndex();
			}
			setCurrentTipIndex(newIndex);
			// console.log('new index set to: ',newIndex, 'msg is: ',tips[currentTipIndex])
		}, 12000)
		return ()=>{
			clearInterval(setNewTip);
		}
	},[])

  return (
		<LevelSelectExtensionWrapper
		navLocation = {settings.navLocation}
		>
			<LevelSelectExtension
			navLocation = {settings.navLocation}
			color = {colors.secondary}
			className = 'centeredFlex'
			>
				<TextCrawler
				fullMessage = {tips[currentTipIndex]}
				singleCharRevealSpeed = {crawlRate}
				/>
			</LevelSelectExtension>
		</LevelSelectExtensionWrapper>
  )
}

export default LevelSelectorExtension;

const LevelSelectExtensionWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: translate(-150px, 200px);
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'650px': '785px'}
	) {
		transform: translate(-325px, 200px);
  }
	transition: transform .75s ease-in-out;
`
const LevelSelectExtension = styled.div`
	position: relative;
	width: 300px;
	height: 200px;
	transform: scaleY(0);
	animation: '';
	transform-origin: center top;
	padding: 5px;
	border: ${props => `5px solid ${props.color}`};
	border-radius: 0 0 10px 10px;
	border-top: none;
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: scaleY(1);
		animation: .75s ease-out 1 expandYAndSlideDown;
  }
	transition: transform .75s ease-in-out;
	transform-origin: center top;
`