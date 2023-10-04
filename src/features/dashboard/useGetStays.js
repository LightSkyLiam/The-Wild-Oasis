import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useGetRecentStays() {
  const [searchParams] = useSearchParams();
  const searchParamsDays = searchParams.get(`last`);
  const numDays = !searchParamsDays ? 7 : searchParamsDays;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: [`stays`, `last-${numDays}`],
  });
  const confirmedStays = stays?.filter(
    (stay) => stay.status === `checked-in` || stay.status === `checked-out`
  );
  return { isLoading, stays, confirmedStays };
}
