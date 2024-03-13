import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBookingAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success("Booking Successfully Deleted");
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { deleteBooking, isDeleting };
}
