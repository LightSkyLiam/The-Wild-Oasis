import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";
import { useCheckOut } from "./useCheckOut";
import Spinner from "../../ui/Spinner";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ booking }) {
  const { id, status, numNights } = booking;
  const { fullName, countryFlag, nationality } = booking.guests;
  const { isCheckingOut, checkOut } = useCheckOut();
  if (isCheckingOut) return <Spinner />;
  return (
    <StyledTodayItem>
      {" "}
      {status === `unconfirmed` ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="blue">Departing</Tag>
      )}
      <Flag src={countryFlag} alt={`img of ${nationality}`} />
      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>
      {status === `unconfirmed` && (
        <Button
          to={`/checkin/${id}`}
          as={Link}
          size="small"
          variation="primary"
        >
          Check-In
        </Button>
      )}
      {status === `checked-in` && (
        <Button
          size="small"
          variation="primary"
          onClick={() => checkOut(id)}
          disabled={isCheckingOut}
        >
          Check-Out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
