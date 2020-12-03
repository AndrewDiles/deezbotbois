const initialState = {
  sfx: []
}

export default function settings(
  state = initialState, action) {
    switch(action.type) {
      // case 'RESET_SFX': {
      //   return initialState
			// }
			case 'REMOVE_SFX': {
				let newSfx = [...state.sfx];
				newSfx.shift();
        return {
          sfx : newSfx
        }
      }
      case 'PLAY_SFX' : {
				let newSfx = [...state.sfx];
				newSfx.push(action.sfxName);
        return {
          sfx : newSfx
        }
			}
      default:{
        return state;
      }
    }
  }