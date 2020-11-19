import {group as bestFriends} from 'react-icons-kit/fa/group'
import {hammer as bushido} from 'react-icons-kit/icomoon/hammer'
import {heart as goldenStandard} from 'react-icons-kit/icomoon/heart'
import {exit as guts} from 'react-icons-kit/iconic/exit'
import {u1F52B as hotShot} from 'react-icons-kit/noto_emoji_regular/u1F52B'
import {anchor as lastStand} from 'react-icons-kit/fa/anchor'
import {u1F4A5 as overKill} from 'react-icons-kit/noto_emoji_regular/u1F4A5'
import {batteryFull as powerHog} from 'react-icons-kit/ionicons/batteryFull'
import {hourGlass as speedDemon} from 'react-icons-kit/icomoon/hourGlass'
import {question as notFound} from 'react-icons-kit/fa/question'
const achievementIconImporter = (stringToConvert) => {
	let icon
	switch (stringToConvert) {
		case 'BEST FRIENDS' : {
			icon = bestFriends;
			break;
		}
		case 'BUSHIDO' : {
			icon = bushido;
			break;
		}
		case 'GOLDEN STANDARD' : {
			icon = goldenStandard;
			break;
		}
		case 'GUTS' : {
			icon = guts;
			break;
		}
		case 'HOTSHOT' : {
			icon = hotShot;
			break;
		}
		case 'LAST STAND' : {
			icon = lastStand;
			break;
		}
		case 'OVERKILL' : {
			icon = overKill;
			break;
		}
		case 'POWER HOG' : {
			icon = powerHog;
			break;
		}
		case 'SPEED DEMON' : {
			icon = speedDemon;
			break;
		}
		default :{
			icon = notFound;
		}
	}
	return icon
}
export default achievementIconImporter;