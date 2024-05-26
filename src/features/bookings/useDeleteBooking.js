import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingBooking, mutate: deleteBookingbyId } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: () => {
        toast.success(`Booking Successfuly Deleted`);
        queryClient.invalidateQueries({ queryKey: `bookings` });
      },
      onError: () => toast.error(`Couldn't Delete Booking`),
    });
  return { isDeletingBooking, deleteBookingbyId };
};
