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
			case 'RECEIVE_BOT_INFO' : {
				return {
					...state,
					botBuilds : action.botInfo,
				}
			}
			case 'CHANGE_BOT_COLORS' : {
				let botBuilds = {...state.botBuilds};
				botBuilds[action.index].colors = action.botColors;
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'CHANGE_BOT_NAME' : {
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].name = action.botName;
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'CHANGE_BOT_MODEL' : {
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].model = action.botModel;
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'CHANGE_BOT_COLOR_X' : {
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].colors[action.colorPosition] = action.color;
				return {
					...state,
					botBuilds : botBuilds,
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