import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useUpdateBooking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { isLoading: isUpdatingBooking, mutate: updateBookingInfo } =
    useMutation({
      mutationFn: async (bookingObj) => {
        const bookingId = bookingObj.bookingId;
        delete bookingObj.bookingId;
        await updateBooking(bookingId, bookingObj);
      },
      onSuccess: () => {
        searchParams.delete("cabinName");
        setSearchParams(searchParams);
        toast.success(`Booking Successfuly Updated`);
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
  return { isUpdatingBooking, updateBookingInfo };
};
