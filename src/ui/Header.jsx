import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useDarkMode } from "../Contexts/DarkModeContext";
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;
function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <StyledHeaderMenu>
        <li>
          <ButtonIcon onClick={() => navigate(`account`)}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </ButtonIcon>
        </li>
      </StyledHeaderMenu>
    </StyledHeader>
  );
}

export default Header;
