import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import mainThemeSrc from './MainTheme.wav';

const Music = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const [mainTheme, setMainTheme] = useState(new Audio());

	function setSoundOptions (state, setState, src) {
		// let newState = state;
		state.src = src;
		state.loop = true;
		setState(state);
	}

	// const mainTheme = new Audio();
	useEffect(()=>{
		setSoundOptions(mainTheme,setMainTheme,mainThemeSrc);
	},[])
	// mainTheme.src = mainThemeSrc;
	// mainTheme.loop = true;
	
	useEffect(()=>{
		if (settings.volume) {
			console.log('playing mainTheme....');
			mainTheme.play();
		} else {
			mainTheme.pause();
		}
	},[settings.volume])

	return (
		null
	)
}

export default Music;