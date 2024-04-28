import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCabinAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("Cabin Successfully Deleted");
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { deleteCabin, isDeleting };
}
