import styled from "styled-components";
import { useGetRecentBookings } from "./useGetBookings";
import Spinner from "../../ui/Spinner";
import { useGetRecentStays } from "./useGetStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {
    isLoading: isLoadingBookings,
    bookings,
    numDays,
  } = useGetRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays } = useGetRecentStays();
  const { cabins, isLoading: isLodaingCabins } = useCabins();
  if (isLoadingBookings || isLoadingStays || isLodaingCabins)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
