import settings from './settings-reducer';
import userInfo from './user-reducer';
import battleInfo from './battle-reducer';
import sfx from './sfx-reducer';

import { combineReducers } from 'redux';

export default combineReducers({settings, userInfo, battleInfo, sfx});