import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useGetRecentBookings() {
  const [searchParams] = useSearchParams();
  const searchParamsDays = searchParams.get(`last`);
  const numDays = !searchParamsDays ? 7 : searchParamsDays;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: [`bookings`, `last-${numDays}`],
  });
  return { isLoading, bookings, numDays };
}
