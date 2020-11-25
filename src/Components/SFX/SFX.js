import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { playSFX,resetSFX } from '../../Redux/actions';

import confirmSrc from './assets/GameSFX SFX1_confirm.wav';
import disabledSrc from './assets/GameSFX SFX2_notAllowed.wav';
import destroyedSrc from './assets/GameSFX SFX3_robotDestroyed.wav';
import selectSrc from './assets/GameSFX SFX4_selected.wav';
import toggleSrc from './assets/GameSFX SFX5_changeSelection.wav';
import meleeSrc from './assets/GameSFX SFX6_meleeSwing.wav';
import impactSrc from './assets/GameSFX SFX7_hitTake.wav';
import laserSrc from './assets/GameSFX SFX8_lazerShortFired.wav';
import gunSrc from './assets/GameSFX SFX9_shotGeneral.wav';
import acidSrc from './assets/GameSFX SFX10_acidSpray.wav';
import burnSrc from './assets/GameSFX SFX11_flameThrow.wav';

const SFX = () => {
	const dispatch = useDispatch();
	const sfx = useSelector((state) => state.sfx);
	const settings = useSelector((state) => state.settings);
	const [confirm, setConfirm] = useState(new Audio());
	const [disabled, setDisabled] = useState(new Audio());
	const [destroyed, setDestroyed] = useState(new Audio());
	const [selected, setSelected] = useState(new Audio());
	const [toggle, setConfirm] = useState(new Audio());
	const [melee, setConfirm] = useState(new Audio());
	const [impact, setConfirm] = useState(new Audio());
	const [laser, setConfirm] = useState(new Audio());
	const [gun, setConfirm] = useState(new Audio());
	const [acid, setConfirm] = useState(new Audio());
	const [burn, setConfirm] = useState(new Audio());

	// function setSoundOptions (state, setState, src) {
	// 	// let newState = state;
	// 	state.src = src;
	// 	state.loop = true;
	// 	setState(state);
	// }

	// // const mainTheme = new Audio();
	// useEffect(()=>{
	// 	setSoundOptions(mainTheme,setMainTheme,mainThemeSrc);
	// },[])
	// // mainTheme.src = mainThemeSrc;
	// // mainTheme.loop = true;
	
	// useEffect(()=>{
	// 	// TODO: Add second theme and change to it when on battle screen
	// 	if (settings.volume) {
	// 		console.log('playing mainTheme....');
	// 		mainTheme.play();
	// 	} else {
	// 		mainTheme.pause();
	// 	}
	// },[settings.volume])

	return (
		null
	)
}

export default SFX;