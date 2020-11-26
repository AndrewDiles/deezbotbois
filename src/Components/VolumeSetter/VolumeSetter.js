import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMusic, setSfx, updateMusicPref, updateSfxPref } from '../../Redux/actions';

import {volumeMute} from 'react-icons-kit/typicons/volumeMute';
// import {volumeDown} from 'react-icons-kit/typicons/volumeDown';
import {volumeUp} from 'react-icons-kit/typicons/volumeUp';
import StyledIcon from '../StyledIcon/StyledIcon';


import {notesOutline} from 'react-icons-kit/typicons/notesOutline';
import {notes} from 'react-icons-kit/typicons/notes';
import {u1F515 as sfxoff} from 'react-icons-kit/noto_emoji_regular/u1F515';
import {u1F514 as sfxon} from 'react-icons-kit/noto_emoji_regular/u1F514';
import {androidNotificationsOff} from 'react-icons-kit/ionicons/androidNotificationsOff';
import {androidNotifications} from 'react-icons-kit/ionicons/androidNotifications';

// import { getThemeColors } from '../../Redux/reducers/user-reducer';

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
		dispatch(setSfx(!settings.sfx));
		dispatch(updateSfxPref(!userInfo.sfxPreference));
	}

  return (
		<div className = 'evenlyFlex'>
			<StyledIcon
			icon = {settings.music ? notes : volumeMute}
			padding = '5'
			handleClick = {handleClickMusic}
			/>
			<StyledIcon
			icon = {settings.sfx ? sfxon : sfxoff}
			padding = '5'
			handleClick = {handleClickSfx}
			/>
		</div>
    
  )
}
export default VolumeSetter;