import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const ToolTip = ({ children, messageOpen, setMessageOpen, messageHovered, setMessageHovered}) => {
	const colors = useSelector(getThemeColors);
	React.useEffect(()=>{
		const target = document.getElementById(`MessageWindow${children}`);
		let onMouseLeave = () => {setMessageHovered(false);setMessageOpen(false)}
		if (target) {
			target.addEventListener('mouseleave',onMouseLeave);
		}
		return ()=>{
			if (!target) return;
			target.removeEventListener('mouseleave',onMouseLeave);
		}
	})
	
  return (
    <Message
		id = {`MessageWindow${children}`}
		onClick = {()=>{setMessageOpen(false);setMessageHovered(false)}}
		messageOpen = {messageOpen}
		colors = {colors}
		messageHovered = {messageHovered}
		// location = {location}
		>
			{children}
		</Message>
  )
}
export default ToolTip;
const Message = styled.div`
	width: 200px;
	height: auto;
	min-height: 50px;
	font-size: 1em;
	position: absolute;
	

	display: ${props=> props.messageHovered ? 'flex' : props.messageOpen ? 'flex' : 'none'};
	
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.colors.secondary};
	color: ${props => props.colors.textColor};
	cursor: pointer;
	border: 1px solid rgba(0,0,0,0.1);
	z-index: 15;
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