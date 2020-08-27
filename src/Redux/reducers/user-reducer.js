import {vanilla} from '../../Constants/colorSchemes';

const initialState = {
  email: null,
  handle : null,
	navLocationPreference: null,
	cellSizePreference : null,
	imageUrl : null,
	googleImageUrl : null,
	colorTheme: null,
	availableBots : null,
	botBuilds: null,
  battleBits: 0,
  levelProgress : null,
	tournamentHistory: null,
	lastLogInBitsReceived: null,
}

export default function userInfo(
  state = initialState, action) {
    switch(action.type) {
      case 'RECEIVE_USER_INFO': {
        return action.userInfo
			}
			case 'LOG_OUT': {
				return initialState;
			}
      case 'UPDATE_NAV_LOCATION_PREFERENCE' : {
        return {
          ...state,
          navLocationPreference : action.navLocation,
        }
			}
			case 'INCREASE_BIT_COUNT' : {
				return {
					...state,
					battleBits: state.battleBits+action.bitIncrease,
					lastLogInBitsReceived : action.currentTime,
				}
			}
			case 'REPLACE_USER_INFO' : {
				return {
					...action.newUserInfo,
				}
			}
      default:{
        return state;
      }
    }
  };

export const getThemeColors = state => state.userInfo.colorTheme ? state.userInfo.colorTheme : vanilla;