import { vanilla } from '../../Constants/colorSchemes'; 
const initialState = {
  serverStatus: 'idle',
  currentUrl : null,
	navLocation: 'top',
	music: false,
	sfx: false,
	profileTab: 'inactive',
	cellSize : 75,
	colorsTesting: null,
	executionSpeed: 1,
	autoTick: false,
	borderDisabled: false,
}

export default function settings(
  state = initialState, action) {
    switch(action.type) {
      case 'URL_UPDATE': {
        return {
          ...state,
          currentUrl : action.url,
        }
      }
      case 'SET_NAV_LOCATION' : {
        return {
          ...state,
          navLocation : action.navLocation,
        }
			}
			case 'SET_MUSIC' : {
				return {
          ...state,
          music : action.music,
        }
			}
			case 'SET_SFX' : {
				return {
          ...state,
          sfx : action.sfx,
        }
			}
			case 'SET_EXECUTION_SPEED' : {
				return {
					...state,
					executionSpeed: action.speed,
				}
			}
			case 'TOGGLE_AUTO_TICK' : {
				return {
					...state,
					autoTick: !state.autoTick,
				}
			}
			case 'SET_COLORS_TESTING' : {
        return {
          ...state,
          colorsTesting : action.colors,
        }
			}
			case 'SET_COLORS_TESTING_DEFAULT' : {
        return {
          ...state,
          colorsTesting : vanilla,
        }
			}
			case 'SET_CELL_SIZE' : {
        return {
          ...state,
          cellSize : action.size,
        }
      }
      case 'BEGIN_COMMUNICATING_WITH_SERVER' : {
        return {
          ...state,
          serverStatus: 'communicating'
        }
      }
      case 'COMMUNICATIONS_WITH_SERVER_SUCCESSFUL' : {
        return {
          ...state,
          serverStatus: 'idle'
        }
      }
      case 'COMMUNICATIONS_WITH_SERVER_FAILURE' : {
        return {
          ...state,
          serverStatus: 'idle',
          error: action.error
        }
			}
			case 'ACTIVATE_PROFILE_TAB' : {
				return {
					...state,
					profileTab : 'active'
				}
			}
			case 'DEACTIVATE_PROFILE_TAB' : {
				return {
					...state,
					profileTab : 'inactive'
				}
			}
			case 'HOVER_PROFILE_TAB' : {
				return {
					...state,
					profileTab : 'hovering'
				}
			}
			case 'TOGGLE_BORDER' : {
				return {
					...state,
					borderDisabled: !state.borderDisabled
				}
			}
      default:{
        return state;
      }
    }
  }