import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateGuestInfo } from "../../services/apiGuests";

export const useUpdateGuest = (bookingId) => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingGuest, mutate: updateGuest } = useMutation({
    mutationFn: updateGuestInfo,
    onSuccess: () => {
      toast.success(`Guest Successfuly Updated`);
      queryClient.invalidateQueries({ queryKey: [`bookings`] });
      queryClient.invalidateQueries({
        queryKey: ["booking", `${bookingId}`],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdatingGuest, updateGuest };
};
