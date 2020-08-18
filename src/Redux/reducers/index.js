import settings from './settings-reducer';
import userInfo from './user-reducer';

import { combineReducers } from 'redux';

export default combineReducers({settings, userInfo});