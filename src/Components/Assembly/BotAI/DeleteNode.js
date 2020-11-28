import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from "../../../Redux/reducers/user-reducer";
import styled from "styled-components";
import StyledButton from "../../StyledButton/StyledButton";
import { replaceScript } from "../../../Redux/actions";
import getNodeArray from "../../../Constants/scriptHelpers/getNodeArray";
import WarningIcons from "./WarningIcons";

const DeleteNode = ({
  setDeleteActive,
  activeNodeArray,
  botNumberSelected,
  aiAndScripts,
}) => {
  const userInfo = useSelector((state) => state.userInfo);
  let colors = useSelector(getThemeColors);
  const dispatch = useDispatch();
  const [hasSubNodes, setHasSetNodes] = React.useState(false);

  React.useEffect(() => {
    let nodeInQuestion =
      activeNodeArray[
        aiAndScripts.viewing[aiAndScripts.viewing.length - 1].index
      ];
    if (nodeInQuestion && nodeInQuestion.condition) {
      if (
        (nodeInQuestion && nodeInQuestion.condition.conditionMet.length > 0) ||
        (nodeInQuestion && nodeInQuestion.condition.conditionUnMet.length > 0)
      ) {
        setHasSetNodes(true);
      }
    }
  }, []);

  function handleDelete() {
    let newActiveNodeArray = activeNodeArray;
    newActiveNodeArray.splice(
      aiAndScripts.viewing[aiAndScripts.viewing.length - 1].index,
      1
    );
    let newScript = [...userInfo.botBuilds[botNumberSelected].script];
    let targetNodeArray = getNodeArray(newScript, aiAndScripts.viewing);
    targetNodeArray = newActiveNodeArray;
    dispatch(replaceScript(botNumberSelected, newScript));
    setDeleteActive(false);
  }
  return (
    <Wrapper>
      <WarningIcons/>
      <WarningText className={"centeredFlex"} colors={colors}>
        {hasSubNodes &&
          "DELETING THIS NODE WILL ALSO DELETE DEEPER DEPTH NODES THAT STEM FROM THIS NODE"}
      </WarningText>
      <ConfirmationText>
				PROCEED WITH NODE DELETION?
			</ConfirmationText>
      <ConfCancelWrapper>
        <StyledButton
				handleClick={handleDelete}
				sfx = 'confirm'
				>
					CONFIRM
				</StyledButton>
        <StyledButton
				handleClick={() => setDeleteActive(false)}
				sfx = 'disabled'
				>
          CANCEL
        </StyledButton>
      </ConfCancelWrapper>
      <WarningText className={"centeredFlex"} colors={colors}>
        {hasSubNodes &&
          "DELETING THIS NODE WILL ALSO DELETE DEEPER DEPTH NODES THAT STEM FROM THIS NODE"}
      </WarningText>
      <WarningIcons/>
    </Wrapper>
  );
};
export default DeleteNode;
const ConfCancelWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
`;
const WarningText = styled.div`
  width: 100%;
  height: 150px;
  color: ${(props) => props.colors.hoveredText};
  white-space: pre-wrap;
`;
const ConfirmationText = styled.div`
  width: 100%;
  height: 50px;
  white-space: pre-wrap;
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