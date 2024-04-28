import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import {
  TBookingsAfterDateType,
  TStaysAfterDateType,
} from "../../schema/bookingSchema";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface StatsProps {
  bookings?: TBookingsAfterDateType[];
  confirmedStays?: TStaysAfterDateType[];
  numberOfDays: number;
  cabinCount: number;
}

function Stats({
  bookings,
  confirmedStays,
  numberOfDays,
  cabinCount,
}: StatsProps) {
  // 1.
  const numBookings = bookings?.length;

  // 2. Total Sales
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. Total Checkins
  const checkins = confirmedStays?.length;

  // 4. Occupancy Rate
  const occupancy = confirmedStays?.reduce(
    (acc, cur) => acc + cur.numNights,
    0,
  );

  const finalOccupancy = (occupancy as number) / (numberOfDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales as number)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(finalOccupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
