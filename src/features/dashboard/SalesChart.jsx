import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import { eachDayOfInterval, format, parseISO, subDays } from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const datesInTimePeriod = eachDayOfInterval({
    start: subDays(new Date(), numDays),
    end: new Date(),
  });
  const salesDataByDates = datesInTimePeriod.map((date) => {
    const formatedDate = format(date, `MMM dd`);
    const filteredBookings = bookings.filter(
      (booking) =>
        format(parseISO(booking.created_at), `MMM dd`) === formatedDate
    );
    const totalSales = filteredBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );
    const extrasSales = filteredBookings.reduce(
      (sum, booking) => sum + booking.extrasPrice,
      0
    );
    return {
      label: formatedDate,
      totalSales: totalSales,
      extrasSales: extrasSales,
    };
  });

  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart width="400px" height="400px" data={salesDataByDates}>
      <Heading as="h2">
        Sales from {format(datesInTimePeriod.at(0), `MMM dd yyyy`)} to{" "}
        {format(datesInTimePeriod.at(-1), `MMM dd yyyy`)}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={salesDataByDates}>
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <XAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            padding={{ top: 20 }}
            dataKey="label"
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit="$"
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
