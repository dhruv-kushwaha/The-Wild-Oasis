import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkinBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ExtraBreakfastType } from "../../schema/bookingSchema";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingin } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: ExtraBreakfastType;
    }) =>
      checkinBooking(bookingId, {
        status: "checkedIn",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // Invalidate queries that are currently active
      queryClient.invalidateQueries({
        refetchType: "active",
      });
      navigate("/dashboard");
    },

    onError: () => toast.error("There was an error while checking in."),
  });

  return { checkin, isCheckingin };
}
