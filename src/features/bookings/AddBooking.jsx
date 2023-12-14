import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useState } from "react";
import { useBookingFormInfo } from "../../Contexts/BookingFormContext";
import BookingForm from "./BookingForm";
import { useClearSearchParams } from "../../hooks/useClearSearchParams";

function AddBooking() {
  const { clearSearchParams } = useClearSearchParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setGuestInfo, setBookingInfo } = useBookingFormInfo();
  const onCloseModal = () => {
    setGuestInfo(null);
    setBookingInfo(null);
    setIsOpenModal(false);
    clearSearchParams(["cabinName"]);
  };
  return (
    <div>
      <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
        Add New Booking
      </Button>
      {isOpenModal && (
        <Modal onClose={onCloseModal}>
          <BookingForm onCloseModal={onCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default AddBooking;
