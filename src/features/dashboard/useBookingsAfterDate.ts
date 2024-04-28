import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookingsAfterDate() {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get("last") ?? 7);
  // const filter =
  //   !days || days === 7
  //     ? null
  //     : {
  //         field: "last",
  //         value: days,
  //       };
  const filter = "last" + days;

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookingsAfterDate", filter],
    queryFn: () => getBookingsAfterDate(days),
  });

  return { bookings, isLoading, numDays: days };
}

export { useBookingsAfterDate };
