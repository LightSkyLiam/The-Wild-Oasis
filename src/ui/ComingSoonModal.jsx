import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import Modal from "./Modal";

const StyledComingSoon = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ComingSoonModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <StyledComingSoon>
        <Heading as="h3">Coming Soon</Heading>
        <p>This Feature Will Be Avaliable Soon.</p>

        <div>
          <Button onClick={onClose} variation="secondary">
            Close
          </Button>
        </div>
      </StyledComingSoon>
    </Modal>
  );
}

export default ComingSoonModal;
