import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const { bookingId } = useParams();
  const {
    isFetching,
    isLoading,
    data: booking,
    refetch,
  } = useQuery({
    queryKey: [`booking`, bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
    enabled: !!bookingId,
  });
  return { isLoading, booking, refetch, isFetching };
};
