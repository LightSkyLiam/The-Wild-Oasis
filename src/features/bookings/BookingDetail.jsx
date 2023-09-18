import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { BASE_URL } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useState } from "react";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { status, id: bookingId } = booking || {};
  const { checkOut, isCheckingOut } = useCheckOut();
  const [deleteModal, setDeleteModal] = useState(false);
  const { isDeletingBooking, deleteBookingbyId } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="danger" onClick={() => setDeleteModal(true)}>
          Delete Booking
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {deleteModal && (
          <Modal onClose={() => setDeleteModal(false)}>
            <ConfirmDelete
              onClose={() => setDeleteModal(false)}
              resourceName="Booking"
              onConfirm={() => {
                deleteBookingbyId(bookingId, { onSettled: () => navigate(-1) });
              }}
              disabled={isDeletingBooking}
            />
          </Modal>
        )}
        {status === `unconfirmed` && (
          <Button
            variation="primary"
            onClick={() => navigate(`${BASE_URL}checkin/${bookingId}`)}
          >
            Check-In
          </Button>
        )}
        {status === `checked-in` && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkOut(bookingId)}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
