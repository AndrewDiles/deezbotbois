import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMusic, setSfx, updateMusicPref, updateSfxPref } from '../../Redux/actions';
import StyledIcon from '../StyledIcon/StyledIcon';
import {notesOutline as musicOff} from 'react-icons-kit/typicons/notesOutline';
import {notes as musicOn} from 'react-icons-kit/typicons/notes';
import {iosBellOutline as sfxOff} from 'react-icons-kit/ionicons/iosBellOutline';
import {iosBell as sfxOn} from 'react-icons-kit/ionicons/iosBell';
// import {volumeMute as musicOff} from 'react-icons-kit/typicons/volumeMute';
// import {u1F515 as sfxOff} from 'react-icons-kit/noto_emoji_regular/u1F515';
// import {u1F514 as sfxOn} from 'react-icons-kit/noto_emoji_regular/u1F514';

const VolumeSetter = () => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	// let colors = useSelector(getThemeColors);
	// if (settings.currentUrl === 'settings') colors = settings.colorsTesting;

  function handleClickMusic () {
		dispatch(setMusic(!settings.music));
		dispatch(updateMusicPref(!userInfo.musicPreference));
	}
	function handleClickSfx () {
		dispatch(updateSfxPref(!userInfo.sfxPreference));
		dispatch(setSfx(!settings.sfx));
	}

  return (
		<div className = 'evenlyFlex'>
			<StyledIcon
			icon = {settings.music ? musicOn : musicOff}
			padding = '5'
			handleClick = {handleClickMusic}
			sfx = 'toggle'
			/>
			<StyledIcon
			icon = {settings.sfx ? sfxOn : sfxOff}
			padding = '5'
			handleClick = {handleClickSfx}
			sfx = 'toggle'
			/>
		</div>
    
  )
}
export default VolumeSetter;