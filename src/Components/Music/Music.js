import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import mainThemeSrc from './MainTheme.wav';
// import battleThemeSrc from './BattleTheme.wav';

const Music = () => {
	const settings = useSelector((state) => state.settings);
	function loopingAudio (src) {
		const newAudio = new Audio(src);
		newAudio.loop = true;
		return newAudio
	}
	const [mainTheme, setMainTheme] = useState(loopingAudio(mainThemeSrc));
	// const [battleTheme, setBattleTheme] = useState(loopingAudio(battleThemeSrc));
	
	useEffect(()=>{
		if (settings.music) {
			if (settings.currentUrl !== 'battle'){
				mainTheme.play();
			} else {
				// battleTheme.play();
			}
		} else {
			mainTheme.pause();
			// battleTheme.pause();
		}
	},[settings.music, settings.currentUrl])

	return null
}

export default Music;
// TODO: Uncomment battleTheme lines once asset is acquired