const initialState = {
  email: null,
  handle : null,
  navLocationPreference: null,
  botBuilds: null,
  aiScripts: null,
  lastLogInBitsReceived: null,
  battleBits: 0,
  techTree: null,
  levelProgress : null,
  history: null,
}

export default function userInfo(
  state = initialState, action) {
    switch(action.type) {
      case 'RECEIVE_USER_INFO': {
        return action.userInfo
      }
      case 'UPDATE_NAV_LOCATION_PREFERENCE' : {
        return {
          ...state,
          navLocationPreference : action.navLocation,
        }
      }
      default:{
        return state;
      }
    }
  }