const initialState = {
  serverStatus: 'idle',
  currentUrl : null,
	navLocation: 'top',
	profileTab: 'inactive',
  cellSize : 50,
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
      }case 'SET_CELL_SIZE' : {
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
					viewingProfileTab : 'active'
				}
			}
			case 'DEACTIVATE_PROFILE_TAB' : {
				return {
					...state,
					viewingProfileTab : 'inactive'
				}
			}
			case 'HOVER_PROFILE_TAB' : {
				return {
					...state,
					viewingProfileTab : 'hovering'
				}
			}
      default:{
        return state;
      }
    }
  }