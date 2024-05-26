import { useState } from "react";
import GuestInfoForm from "../guests/GuestInfoForm";
import BookingInfoForm from "./BookingInfoForm";
import { useCreateBooking } from "./useCreateBooking";
import { useBookingFormInfo } from "../../Contexts/BookingFormContext";
import { useForm } from "react-hook-form";

function BookingForm({ onCloseModal }) {
  const [formStep, setFormStep] = useState(1);
  const { reset } = useForm();
  const { isCreating, createBooking } = useCreateBooking();
  const {
    setGuestInfo,
    setBookingInfo,
    guestInfo: guestInfoObj,
  } = useBookingFormInfo();
  const onSubmitBookingForm = (bookingInfoObj) => {
    createBooking({ guestInfoObj, bookingInfoObj });
    reset();
    onCloseModal();
    setGuestInfo({});
    setBookingInfo({});
  };

  const onSubmitGuestForm = (values) => {
    setGuestInfo({
      ...values,
      nationality: `${values.nationality
        .charAt(0)
        .toUpperCase()}${values.nationality.slice(1)}`,
    });
    setFormStep(2);
  };

  return (
    <>
      {formStep === 1 && (
        <GuestInfoForm
          onSubmit={onSubmitGuestForm}
          setFormStep={setFormStep}
          onCloseModal={onCloseModal}
        />
      )}
      {formStep === 2 && (
        <BookingInfoForm
          onSubmit={onSubmitBookingForm}
          isLoading={isCreating}
          onCloseModal={onCloseModal}
          setFormStep={setFormStep}
        />
      )}
    </>
  );
}

export default BookingForm;
