import styled from "styled-components";
import { IMAGE_BASE_URL } from "../utils/Constants";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={`${IMAGE_BASE_URL}/logo-light.png`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
