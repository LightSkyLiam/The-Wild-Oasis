import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  ${(props) =>
    props.type === "regular" &&
    css`
      width: 6.4rem;
    `};
  ${(props) =>
    props.type === "small" &&
    css`
      width: 3.6rem;
    `}
  margin: 4.8rem auto;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

Spinner.defaultProps = {
  type: "regular",
};

export default Spinner;
