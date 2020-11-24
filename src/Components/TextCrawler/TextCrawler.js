import React from 'react';

const TextCrawler = ({ fullMessage, singleCharRevealSpeed }) => {
	const [partialMessage, setPartialMessage] = React.useState('');
	let addLetterTimout = null;

	function cleanup () {
		if (addLetterTimout) {
			clearTimeout(addLetterTimout)
		}
	} 

	React.useEffect(()=>{
		if (partialMessage.length !== fullMessage.length && fullMessage[partialMessage.length]) {
			addLetterTimout = setTimeout(()=>{
				setPartialMessage(partialMessage+fullMessage[partialMessage.length])
			},singleCharRevealSpeed)
		}
		return () =>{
			cleanup();
		}
	},[partialMessage])

	React.useEffect(()=>{
		cleanup();
		setPartialMessage(fullMessage[0])
	},[fullMessage])

  return (
    <p>
			{partialMessage}
		</p>
  )
}
export default TextCrawler;