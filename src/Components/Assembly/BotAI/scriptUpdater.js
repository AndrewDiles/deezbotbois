import {replaceScript} from '../../../Redux/actions';
import getNodeArray from "../../../Constants/scriptHelpers/getNodeArray";

function scriptUpdater ( botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo ) {
	console.log("script updater's botNum", botNumberSelected);
	console.log("script updater's userInfo", userInfo);
	
	let newScript = [...userInfo.botBuilds[botNumberSelected].script];
  let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing);
  targetNodeArray = newActiveNodeArray;
	dispatch(replaceScript(botNumberSelected, newScript));
}
export default scriptUpdater;