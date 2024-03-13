import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId: number) => checkoutBooking(bookingId),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // Invalidate queries that are currently active
      queryClient.invalidateQueries({
        refetchType: "active",
      });
    },

    onError: () => toast.error("There was an error while checking out."),
  });

  return { checkout, isCheckingout };
}
