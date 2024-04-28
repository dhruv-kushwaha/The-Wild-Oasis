import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabinAPI } from "../../services/apiCabins";
import { UpdateCabinType } from "../../schema/cabinSchema";
import toast from "react-hot-toast";

function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationKey: ["cabin"],
    mutationFn: (updatedCabin: UpdateCabinType) => updateCabinAPI(updatedCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin updated successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { updateCabin, isUpdating };
}

export default useUpdateCabin;
