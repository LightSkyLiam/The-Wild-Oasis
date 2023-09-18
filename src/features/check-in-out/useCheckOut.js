import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: `checked-out`,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} has successfuly checked Out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error(`There Was An Error Checking Out`),
  });
  return { isCheckingOut, checkOut };
};
