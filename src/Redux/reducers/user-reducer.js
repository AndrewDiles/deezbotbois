import {vanilla} from '../../Constants/colorSchemes';

const initialState = {
  email: null,
  handle : null,
	navLocationPreference: null,
	cellSizePreference : null,
	musicPreference: null,
	sfxPreference: null,
	imageUrl : null,
	googleImageUrl : null,
	colorTheme: null,
	availableBots : null,
	botBuilds: null,
  battleBits: 0,
	levelProgress : null,
	challengeProgress: null,
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
			case 'UPDATE_MUSIC_PREFERENCE' : {
        return {
          ...state,
          musicPreference : action.musicPreference,
        }
			}
			case 'UPDATE_SFX_PREFERENCE' : {
        return {
          ...state,
          sfxPreference : action.sfxPreference,
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
				if (action.maxArms === 1) {
					botBuilds[action.index].equipment.arm2 = null;
					botBuilds[action.index].equipment.arm3 = null;
				}
				else if (action.maxArms === 2) {
					botBuilds[action.index].equipment.arm3 = null;
				}
				if (action.maxAccs === 0) {
					botBuilds[action.index].equipment.acc1 = null;
					botBuilds[action.index].equipment.acc2 = null;
					botBuilds[action.index].equipment.acc3 = null;
					botBuilds[action.index].equipment.acc4 = null;
					botBuilds[action.index].equipment.acc5 = null;
				}
				else if (action.maxAccs === 1) {
					botBuilds[action.index].equipment.acc2 = null;
					botBuilds[action.index].equipment.acc3 = null;
					botBuilds[action.index].equipment.acc4 = null;
					botBuilds[action.index].equipment.acc5 = null;
				}
				else if (action.maxAccs === 2) {
					botBuilds[action.index].equipment.acc3 = null;
					botBuilds[action.index].equipment.acc4 = null;
					botBuilds[action.index].equipment.acc5 = null;
				}
				else if (action.maxAccs === 3) {
					botBuilds[action.index].equipment.acc4 = null;
					botBuilds[action.index].equipment.acc5 = null;
				}
				else if (action.maxAccs === 4) {
					botBuilds[action.index].equipment.acc5 = null;
				}
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
			case 'EQUIP_ITEM' : {
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].equipment[action.slotKey] = action.name;
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'UNEQUIP_ITEM' : {
				let botBuilds = [...state.botBuilds];
				if (action.slotKey) {
					botBuilds[action.index].equipment[action.slotKey] = null;
				}
				else {
					// console.log('looking for :',action.equipmentName)
					let slotKeys = Object.keys(botBuilds[action.index].equipment);
					let foundSlotName = null;
					slotKeys.forEach((slot, testIndex)=>{
						// console.log({slot})
						// console.log(botBuilds[action.index].equipment[slot])
						if (botBuilds[action.index].equipment[slot] === action.equipmentName) {
							foundSlotName = Object.keys(botBuilds[action.index].equipment)[testIndex];
						}
					})
					console.log({foundSlotName})
					if (foundSlotName) {
						botBuilds[action.index].equipment[foundSlotName] = null;
					}
					else {
						console.log('Supposedly equipped item was not found in equipment slots')
					}
				}
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
			case 'REPLACE_SCRIPT' : {
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].script = action.newScript;
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'REPLACE_ATTRIBUTES' : {
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].attributes = action.newAttributes;
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'RESET_TECH_TREE' : {
				// needs to remove excess arms / weps... ?
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].techTree = [
					null, false, false, null,
					false, false, false, false,
					false, false, false, false,
					false, false, false, false,
					false, false, false, false
				];
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'ADD_TECH' : {
				// console.log('adding tech')
				let botBuilds = [...state.botBuilds];
				botBuilds[action.index].techTree[action.techIndex] = true;
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			case 'REMOVE_TECHS' : {
				// needs to remove excess arms / weps... ?
				let botBuilds = [...state.botBuilds];
				action.techIndexArray.forEach((indexToChange)=>{
					botBuilds[action.index].techTree[indexToChange] = false;
				})
				return {
					...state,
					botBuilds : botBuilds,
				}
			}
			
      default:{
        return state;
      }
    }
  };

export const getThemeColors = state => state.userInfo.colorTheme ? state.userInfo.colorTheme : vanilla;