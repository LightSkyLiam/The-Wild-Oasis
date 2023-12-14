import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export const useUpdateBooking = (bookingId) => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdatingBooking, mutate: updateBookingInfo } =
    useMutation({
      mutationFn: (bookingObj) => {
        const bookingId = bookingObj.bookingId;
        delete bookingObj.bookingId;
        updateBooking(bookingId, bookingObj);
      },
      onSuccess: () => {
        toast.success(`Booking Successfuly Updated`);
        queryClient.invalidateQueries({ queryKey: "bookings" });
        queryClient.invalidateQueries({
          queryKey: ["booking", `${bookingId}`],
        });
      },
      onError: (err) => toast.error(err.message),
    });
  return { isUpdatingBooking, updateBookingInfo };
};
