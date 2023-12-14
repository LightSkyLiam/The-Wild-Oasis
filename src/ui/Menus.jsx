import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useCloseOnOutsideClick from "../hooks/useCloseOnOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.type === "onLight"
        ? "var(--color-grey-100)"
        : "var(--color-brand-600)"};
  }
  &:focus {
    outline: 2px solid
      ${(props) =>
        props.type === "onLight"
          ? "var(--color-brand-600)"
          : "var(--color-brand-600)"};
  }
  & svg {
    width: ${(props) =>
      props.size === "small" ? "2.4rem !important" : "3rem !important"};
    height: ${(props) =>
      props.size === "small" ? "2.4rem !important" : "3rem !important"};
    color: ${(props) =>
      props.type === "onLight"
        ? "var(--color-grey-700)"
        : "var(--color-grey-100)"};
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  width: max-content;
  right: 32px;
  top: 0;
  & span {
    font-size: 1.4rem !important;
    font-family: Poppins, sans-serif !important;
    margin: 0 !important;
    color: var(--color-grey-700);
    font-weight: 400;
  }
`;
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem !important;
    height: 1.6rem !important;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
function Menus({ children, className }) {
  const [openId, setOpenId] = useState(``);
  const close = () => setOpenId(``);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      className={className && className}
      value={{ openId, close, open }}
    >
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ id, disabled, size, type, className }) {
  const { openId, close, open } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();

    openId === `` || openId !== id ? open(id) : close();
  };
  return (
    <StyledToggle
      className={className && className}
      size={size}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, close } = useContext(MenusContext);
  const ref = useCloseOnOutsideClick(close, false);
  if (openId !== id) return null;
  return <StyledList ref={ref}>{children}</StyledList>;
}
function Button({ children, icon, disabled = false, onClick }) {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Toggle.defaultProps = {
  type: "onLight",
  size: "small",
};
Menus.List = List;
Menus.Button = Button;
export default Menus;
