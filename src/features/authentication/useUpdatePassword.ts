import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";
import { TUpdatePasswordType } from "../../schema/authSchema";

function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
    mutationFn: (data: TUpdatePasswordType) => updatePasswordApi(data),
    onSuccess: () => {
      toast.success("Password updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { updatePassword, isUpdating };
}

export default useUpdatePassword;
