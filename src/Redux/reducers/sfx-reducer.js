const initialState = {
  sfx: null
}

export default function settings(
  state = initialState, action) {
    switch(action.type) {
      case 'RESET_SFX': {
        return initialState
      }
      case 'PLAY_SFX' : {
        return {
          sfx : action.sfxName,
        }
			}
      default:{
        return state;
      }
    }
  }