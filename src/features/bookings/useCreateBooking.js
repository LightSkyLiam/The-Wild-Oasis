import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addBooking } from "../../services/apiBookings";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const {
    status: createStatus,
    isLoading: isCreating,
    mutate: createBooking,
  } = useMutation({
    mutationFn: addBooking,
    onSuccess: () => {
      toast.success(`Booking Successfuly Added`);
      queryClient.invalidateQueries({ queryKey: [`bookings`] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createBooking, createStatus };
};
