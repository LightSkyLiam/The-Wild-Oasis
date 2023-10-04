import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      const data = updateBooking(bookingId, {
        status: `checked-in`,
        isPaid: true,
        ...breakfast,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} has successfuly checked In`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/dashboard`);
    },
    onError: () => toast.error(`There Was An Error Checking In`),
  });
  return { isCheckingIn, checkIn };
};
