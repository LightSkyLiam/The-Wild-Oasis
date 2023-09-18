import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get(`status`);
  const filter =
    !filterValue || filterValue === `all`
      ? null
      : { field: `status`, value: filterValue };
  const sortBy = searchParams.get(`sortby`) || `startDate-desc`;
  const [field, direction] = sortBy.split(`-`);
  const sortByObj = { field, direction };
  const page = +searchParams.get(`page`) || 1;
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: [`bookings`, filter, sortByObj, page],
    queryFn: () => getBookings(filter, sortByObj, `eq`, page),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [`bookings`, filter, sortByObj, page + 1],
      queryFn: () => getBookings(filter, sortByObj, `eq`, page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [`bookings`, filter, sortByObj, page - 1],
      queryFn: () => getBookings(filter, sortByObj, `eq`, page - 1),
    });
  return { isLoading, bookings, count, error };
};
