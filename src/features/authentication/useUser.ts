import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const navigate = useNavigate();
  const {
    isLoading,
    data: user,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    // onError: () => navigate("/login"),
  });

  return { isLoading, user, isFetched, isFetching };
}
