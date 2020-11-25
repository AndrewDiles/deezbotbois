import { vanilla } from '../../Constants/colorSchemes'; 
const initialState = {
  serverStatus: 'idle',
  currentUrl : null,
	navLocation: 'top',
	volume: 0,
	profileTab: 'inactive',
	cellSize : 75,
	colorsTesting: null,
	executionSpeed: 1,
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
			case 'SET_VOLUME' : {
				return {
          ...state,
          volume : action.volume,
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