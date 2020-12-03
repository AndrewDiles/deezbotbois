import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeSFX } from '../../Redux/actions';

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
	const [calledList, setCalledList] = useState([]);

	useEffect(()=>{
		if (sfx.sfx.length === 0) {
			setCalledList([]);
			return;
		}
		if (settings.sfx) {
			sfx.sfx.forEach((sfxCalled)=>{
				if (!SFX[sfxCalled]) {
					console.log('sfx call ', sfx.sfx, ' does not exist');
				} else {
					if (calledList.length === 0 || !calledList.includes(sfxCalled)) {
						// SFX[sfxCalled].pause();
						SFX[sfxCalled].currentTime = 0;
						SFX[sfxCalled].play();
						let newCallList = [calledList]
						newCallList.push(sfxCalled);
						setCalledList(newCallList);
					}
				}
				dispatch(removeSFX());
			})
		}
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