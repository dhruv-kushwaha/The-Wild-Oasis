import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUpdateUserType } from "../../schema/authSchema";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedUser: TUpdateUserType) => updateUserApi(updatedUser),
    onSuccess: (data) => {
      toast.success("User updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
