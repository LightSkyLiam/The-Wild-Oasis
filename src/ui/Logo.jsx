import styled from "styled-components";
import { IMAGE_BASE_URL } from "../utils/Constants";
import { useDarkMode } from "../Contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        src={
          isDarkMode
            ? `${IMAGE_BASE_URL}/logo-dark.png`
            : `${IMAGE_BASE_URL}/logo-light.png`
        }
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
