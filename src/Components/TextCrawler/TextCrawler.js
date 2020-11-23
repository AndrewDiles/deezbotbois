import React from 'react';

const TextCrawler = ({ fullMessage, singleCharRevealSpeed }) => {
	const [partialMessage, setPartialMessage] = React.useState('');

	React.useEffect(()=>{
		let addLetterTimout = null;
		if (partialMessage.length !== fullMessage.length && fullMessage[partialMessage.length]) {
			addLetterTimout = setTimeout(()=>{
				setPartialMessage(partialMessage+fullMessage[partialMessage.length])
			},singleCharRevealSpeed)
		}
		return () =>{
			addLetterTimout && clearTimeout(addLetterTimout)
		}
	},[partialMessage])

	React.useEffect(()=>{
		setPartialMessage('')
	},[fullMessage])

  return (
    <p>
			{partialMessage}
		</p>
  )
}
export default TextCrawler;