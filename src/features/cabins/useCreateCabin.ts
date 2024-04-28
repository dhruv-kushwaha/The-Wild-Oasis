import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { TCreateCabinType } from "../../schema/cabinSchema";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin: TCreateCabinType) => createCabinAPI(newCabin),

    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}
