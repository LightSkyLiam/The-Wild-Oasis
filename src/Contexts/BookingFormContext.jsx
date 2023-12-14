import { createContext, useContext, useState } from "react";

const BookingFormContext = createContext();

function BookingFormProvider({ children }) {
  const [guestInfo, setGuestInfo] = useState({});
  const [bookingInfo, setBookingInfo] = useState({});
  return (
    <BookingFormContext.Provider
      value={{ setGuestInfo, setBookingInfo, guestInfo, bookingInfo }}
    >
      {children}
    </BookingFormContext.Provider>
  );
}

function useBookingFormInfo() {
  const context = useContext(BookingFormContext);
  if (context === undefined)
    throw new Error(`Context was used outside of provider`);
  return context;
}

export { useBookingFormInfo, BookingFormProvider };
