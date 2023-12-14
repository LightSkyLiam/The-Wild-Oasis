import { useQuery } from "@tanstack/react-query";
import { getCabinInfoByName } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export const useGetCabinInfo = () => {
  const [searchParams] = useSearchParams();
  const cabinName = searchParams.get("cabinName");
  const {
    isFetching: isGettingCabinInfo,
    data: cabinInfo,
    refetch,
    error: cabinInfoError,
  } = useQuery({
    queryFn: () => getCabinInfoByName(cabinName),
    enabled: cabinName !== "null",
    queryKey: cabinName !== "null" && [`cabin`, cabinName],
    retry: false,
    staleTime: 60 * 1000,
  });
  return { isGettingCabinInfo, cabinInfo, refetch, cabinInfoError };
};
