import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from "../../../Redux/reducers/user-reducer";
import styled from "styled-components";

import { alertCircled } from "react-icons-kit/ionicons/alertCircled";
import DecisionObject from '../../../Constants/botAis/optionCreator.js';
import StyledButton from "../../StyledButton/StyledButton";
import StyledIcon from "../../StyledIcon/StyledIcon";
import { replaceScript } from "../../../Redux/actions";
import getNodeArray from "../../../Constants/scriptHelpers/getNodeArray";
import WarningIcons from "../BotAI/WarningIcons";

const ConfirmLossOfNodes = ({ botNumberSelected,aiAndScripts,setAiAndScripts,activeNodeArray,setActiveNodeArray,losingNestedNodes,setLosingNestedNodes }) => {
  const userInfo = useSelector((state) => state.userInfo);
  let colors = useSelector(getThemeColors);
  const dispatch = useDispatch();
	
	function handleSwap() {
		let newScript = [...userInfo.botBuilds[botNumberSelected].script];
		let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing );
		let newNode = new DecisionObject(losingNestedNodes, aiAndScripts.viewing.length, [], []);
		targetNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index] = newNode;
		dispatch(replaceScript(botNumberSelected, newScript));
		let newAiAndScript = {...aiAndScripts};
		newAiAndScript.insertion = false;
		setAiAndScripts(newAiAndScript);
		setLosingNestedNodes(null);
	}
  return (
    <Wrapper>
      <WarningIcons/>
      <WarningText className={"centeredFlex"} colors={colors}>
        CHANGING THE NODE OPTION TYPE FROM A CONDITION TO A COMMAND WILL DESTROY THE NODES NESTED IN THE CASES WHERE THE CONDITION IS MET AND NOT MET
      </WarningText>
      <ConfirmationText>
				PROCEED WITH NODE OPTION TYPE CHANGE?
			</ConfirmationText>
      <ConfCancelWrapper>
        <StyledButton handleClick={handleSwap}>
					CONFIRM
				</StyledButton>
        <StyledButton handleClick={() => setLosingNestedNodes(null)}>
          CANCEL
        </StyledButton>
      </ConfCancelWrapper>
      <WarningText className={"centeredFlex"} colors={colors}>
        CHANGING THE NODE OPTION TYPE FROM A CONDITION TO A COMMAND WILL DESTROY THE NODES NESTED IN THE CASES WHERE THE CONDITION IS MET AND NOT MET
      </WarningText>
      <WarningIcons/>
    </Wrapper>
  );
};
export default ConfirmLossOfNodes;
const ConfCancelWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
`;
const WarningText = styled.div`
  width: 100%;
  height: 150px;
	font-size: 0.8em;
  color: ${(props) => props.colors.hoveredText};
  white-space: pre-wrap;
`;
const ConfirmationText = styled.div`
  width: 100%;
  height: 50px;
  white-space: pre-wrap;
	font-size: 0.8em;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 557px;
  display: flex;
  flex-direction: column;
  justify-content: column;
  align-items: center;
  text-align: center;
  font-size: 0.9em;
  white-space: nowrap;
`;