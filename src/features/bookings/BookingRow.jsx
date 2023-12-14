import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
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
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import GuestInfoForm from "../guests/GuestInfoForm";
import BookingInfoForm from "./BookingInfoForm";
import { useUpdateGuest } from "../guests/useUpdateGuest";
import Spinner from "../../ui/Spinner";
import { useUpdateBooking } from "./useUpdateBooking";

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

function BookingRow({ booking }) {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins: { name: cabinName },
  } = booking;

  const { fullName, email, nationality, nationalID, id: guestID } = guests;
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateGuestModal, setUpdateGuestModal] = useState(false);
  const [updateBookingModal, setUpdateBookingModal] = useState(false);
  const { isDeletingBooking, deleteBookingbyId } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { isUpdatingGuest, updateGuest } = useUpdateGuest();
  const { isUpdatingBooking, updateBookingInfo } = useUpdateBooking();

  const onUpdateGuest = (guestObj) => {
    guestObj.guestID = guestID;
    updateGuest(guestObj);
    setUpdateGuestModal(false);
  };

  const onUpdateBooking = (bookingObj) => {
    bookingObj.guestId = guestID;
    bookingObj.bookingId = bookingId;
    updateBookingInfo(bookingObj);
    setUpdateBookingModal(false);
  };

  if (isUpdatingGuest || isUpdatingBooking) return <Spinner type="small" />;
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{fullName}</span>
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
      {updateGuestModal && (
        <Modal onClose={() => setUpdateGuestModal(false)}>
          {
            <GuestInfoForm
              defaultValues={{ fullName, nationalID, nationality, email }}
              onCloseModal={() => setUpdateGuestModal(false)}
              edit={true}
              onSubmit={onUpdateGuest}
            />
          }
        </Modal>
      )}
      {updateBookingModal && (
        <Modal
          deleteParam="cabinName"
          onClose={() => setUpdateBookingModal(false)}
        >
          <BookingInfoForm
            defaultValues={{
              isPaid: booking.isPaid,
              totalPrice,
              observations: booking.observations,
              cabinId: booking.cabins.name,
              startDate: booking.startDate.slice(0, 10),
              endDate: booking.endDate.slice(0, 10),
              numNights,
              numGuests: booking.numGuests,
              hasBreakfast: booking.hasBreakfast,
            }}
            onCloseModal={() => setUpdateBookingModal(false)}
            edit={true}
            onSubmit={onUpdateBooking}
          />
        </Modal>
      )}
      <Menus.Menu>
        <Menus.Toggle type="onLight" size="small" id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            Details
          </Menus.Button>
          {status === `unconfirmed` && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
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
            icon={<HiPencil />}
            onClick={() => setUpdateGuestModal(true)}
          >
            Edit Guest
          </Menus.Button>
          <Menus.Button
            icon={<HiPencil />}
            onClick={() => setUpdateBookingModal(true)}
          >
            Edit Booking
          </Menus.Button>

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
