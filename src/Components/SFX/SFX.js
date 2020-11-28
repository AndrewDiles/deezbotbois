import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { resetSFX } from '../../Redux/actions';

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
	const [SFX, setSFX] = useState({
		confirm : new Audio(confirmSrc),
		disabled: new Audio(disabledSrc),
		destroyed: new Audio(destroyedSrc),
		selected: new Audio(selectSrc),
		toggle: new Audio(toggleSrc),
		melee: new Audio(meleeSrc),
		impact: new Audio(impactSrc),
		laser: new Audio(laserSrc),
		gun: new Audio(gunSrc),
		acid: new Audio(acidSrc),
		burn: new Audio(burnSrc),
	})
	

	useEffect(()=>{
		if (!sfx.sfx) return;
		if (!SFX[sfx.sfx]) {
			console.log('sfx call ', sfx.sfx, ' does not exist');
			dispatch(resetSFX());
			return;
		}
		if (settings.sfx) {
			SFX[sfx.sfx].pause();
			SFX[sfx.sfx].currentTime = 0;
			SFX[sfx.sfx].play();
		}
		dispatch(resetSFX());
	},[settings.sfx, sfx.sfx])

	useEffect(()=>{
		if (!settings.sfx) {
			{Object.keys(SFX).forEach((sfx)=>{
				SFX[sfx].pause();
			})}
		}
	},[settings.sfx])

	return null
}

export default SFX;

// first solution, less effective:
	// const [confirm, setConfirm] = useState(new Audio(confirmSrc));
	// const [disabled, setDisabled] = useState(new Audio(disabledSrc));
	// const [destroyed, setDestroyed] = useState(new Audio(destroyedSrc));
	// const [selected, setSelected] = useState(new Audio(selectSrc));
	// const [toggle, setToggle] = useState(new Audio(toggleSrc));
	// const [melee, setMelee] = useState(new Audio(meleeSrc));
	// const [impact, setImpact] = useState(new Audio(impactSrc));
	// const [laser, setLaser] = useState(new Audio(laserSrc));
	// const [gun, setGun] = useState(new Audio(gunSrc));
	// const [acid, setAcid] = useState(new Audio(acidSrc));
	// const [burn, setBurn] = useState(new Audio(burnSrc));
	// const SFX = {
	// 	confirm : confirm,
	// 	disabled: disabled,
	// 	destroyed: destroyed,
	// 	selected: selected,
	// 	toggle: toggle,
	// 	melee: melee,
	// 	impact: impact,
	// 	laser: laser,
	// 	gun: gun,
	// 	acid: acid,
	// 	burn: burn
	// };