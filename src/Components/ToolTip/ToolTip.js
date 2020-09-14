import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const ToolTip = ({ children, messageOpen, setMessageOpen, messageHovered, setMessageHovered, fontSize, selfLocation, width, height, animated}) => {
	const colors = useSelector(getThemeColors);
	React.useEffect(()=>{
		const target = document.getElementById(`MessageWindow${children}`);
		let onMouseLeave = () => {
			if (setMessageHovered)setMessageHovered(false);
			if (setMessageOpen) setMessageOpen(false)}
		if (target) {
			target.addEventListener('mouseleave',onMouseLeave);
		}
		return ()=>{
			if (!target) return;
			target.removeEventListener('mouseleave',onMouseLeave);
		}
	})
	const handleClose = () => {
		if (setMessageOpen) setMessageOpen(false);
		if (setMessageHovered) setMessageHovered(false);
	}
	
  return (
    <Message
		id = {`MessageWindow${children}`}
		onClick = {()=>handleClose()}
		messageOpen = {messageOpen}
		colors = {colors}
		messageHovered = {messageHovered}
		fontSize = {fontSize}
		selfLocation = {selfLocation}
		width = {width}
		height = {height}
		animated = {animated}
		// location = {location}
		>
			{children}
		</Message>
  )
}
export default ToolTip;

const Message = styled.div`
	width: ${props => props.width ? `${props.width}px` : '240px'};
	height: ${props => props.height ? `${props.height}px` : 'auto'};
	/* min-height: 50px; */
	font-size: 1em;
	position: relative;
	font-size: ${props => props.fontSize ? props.fontSize : null};
	display: ${props=> props.messageHovered ? 'flex' : props.messageOpen ? 'flex' : 'none'};
	flex-wrap: wrap;
	justify-content: center;
	justify-self: ${props => props.selfLocation && props.selfLocation};
	align-items: center;
	background-color: ${props => props.colors.secondary};
	color: ${props => props.colors.textColor};
	cursor: pointer;
	border: 1px solid rgba(0,0,0,0.1);
	z-index: 15;
	animation: ${props => props.animated === 'equipment' ? '.5s ease-out 1 openFromTopToBottom' 
	: props.animated === 'attribute' ? '.5s ease-out 1 attributeExpandxAxis'
	:''};
	overflow: hidden;
`

// Attempt to force window location modification bsaed on spawn point
	// let top, left, bottom, right = null;
	// React.useEffect(()=>{
	// 	const targetMessage = document.getElementById('MessageWindow');
	// 	// console.log('parent', targetMessage.parentElement.getBoundingClientRect());
	// 	// console.log(document.getElementById('root').getBoundingClientRect()); contains width, height
	// 	if (document.getElementById('root').getBoundingClientRect().width > targetMessage.parentElement.getBoundingClientRect().x + 200) {
	// 		right = `${document.getElementById('root').getBoundingClientRect().width}px`;
	// 	}
	// 	else {
	// 		left = `${targetMessage.parentElement.getBoundingClientRect().x + targetMessage.parentElement.getBoundingClientRect().width+20}px`;
	// 	}
	// 	if ((document.getElementById('root').getBoundingClientRect().height > targetMessage.parentElement.getBoundingClientRect().y + 100)) {
	// 		bottom = `${document.getElementById('root').getBoundingClientRect().height}px`;
	// 	}
	// 	else {
	// 		top = `${targetMessage.parentElement.getBoundingClientRect().y - 50}px`;
	// 	}
	// })

	// let target = null;
	// React.useEffect(()=>{
	// 	let target = document.getElementById('MessageWindow');
	// 	// console.log(target.parentElement.getBoundingClientRect().x);
	// 	setLocation(`${Math.floor(target.parentElement.getBoundingClientRect().x)}px`)
	// 	console.log(location);
	// })

// 	React.useEffect(()=>{
// 	const target = document.getElementById('MessageWindow');
// 	const targetMessage = document.getElementById('MessageWindow');
// 	// console.log(target.parentElement.getBoundingClientRect().x);
// 	if (document.getElementById('root').getBoundingClientRect().width > targetMessage.parentElement.getBoundingClientRect().x + 200) {
// 		setLocation({
// 			left: null, top: location.top, bottom: location.bottom, 
// 			right: `${document.getElementById('root').getBoundingClientRect().width}px`
// 		});
// 	}
// 	else {
// 		setLocation({
// 			right: null, top: location.top, bottom: location.bottom,
// 			left: `${targetMessage.parentElement.getBoundingClientRect().x + targetMessage.parentElement.getBoundingClientRect().width+20}px`
// 		})
		
// 	}
// 	if ((document.getElementById('root').getBoundingClientRect().height > targetMessage.parentElement.getBoundingClientRect().y + 100)) {
// 		setLocation({
// 			top: null, left: location.left, right: location.right,
// 			bottom: `${document.getElementById('root').getBoundingClientRect().height}px`
// 		})
// 	}
// 	else {
// 		setLocation({
// 			bottom: null, left: location.left, right: location.right,
// 			top: `${targetMessage.parentElement.getBoundingClientRect().y - 50}px`
// 		})
// 	}
// 	// setLocation(`${Math.floor(target.parentElement.getBoundingClientRect().x)}px`)
// 	// console.log(location);
// },[window.innerWidth, window.innerHeight])
// left: ${props => props.location.left && props.location.left};
// right: ${props => props.location.right && props.location.right};
// top: ${props => props.location.top && props.location.top};
// bottom: ${props => props.location.bottom && props.location.bottom};