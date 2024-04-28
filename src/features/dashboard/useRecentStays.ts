import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get("last") ?? 7);
  const filter = "last-" + days;

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", filter],
    queryFn: () => getStaysAfterDate(days),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checkedIn" || stay.status === "checkedOut",
  );

  return { stays, isLoading, confirmedStays };
}

export { useRecentStays };
