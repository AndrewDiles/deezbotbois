import React from "react";
import styled from "styled-components";

import { alertCircled } from "react-icons-kit/ionicons/alertCircled";
import StyledIcon from "../../StyledIcon/StyledIcon";

const WarningIcons = () => {
  return (
    <WarningIconRow>
      {[1, 2, 3, 4, 5].map((n) => {
        return (
          <IconContainer key={n}>
            <StyledIcon
              icon={alertCircled}
              padding="5"
              hovered={1}
              keepcursor={1}
            />
          </IconContainer>
        );
      })}
    </WarningIconRow>
  );
};
export default WarningIcons;
const WarningIconRow = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;
const IconContainer = styled.div`
  height: 50px;
  width: 50px;
`;