import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { BASE_URL } from "../../utils/Constants";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import Spinner from "../../ui/Spinner";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const [deleteModal, setDeleteModal] = useState(false);
  const { isDeletingBooking, deleteBookingbyId } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      {deleteModal && (
        <Modal onClose={() => setDeleteModal(false)}>
          <ConfirmDelete
            onClose={() => setDeleteModal(false)}
            resourceName="Booking"
            onConfirm={() => {
              deleteBookingbyId(bookingId);
            }}
            disabled={isDeletingBooking}
          />
        </Modal>
      )}
      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`${BASE_URL}bookings/${bookingId}`)}
          >
            Details
          </Menus.Button>
          {status === `unconfirmed` && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`${BASE_URL}checkin/${bookingId}`)}
            >
              Check-In
            </Menus.Button>
          )}
          {status === `checked-in` && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkOut(bookingId)}
              disabled={isCheckingOut}
            >
              Check Out
            </Menus.Button>
          )}
          <Menus.Button
            icon={<HiTrash />}
            onClick={() => setDeleteModal(true)}
            disabled={isDeletingBooking}
          >
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
