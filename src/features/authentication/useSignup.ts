import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { TSignupType } from "../../schema/authSchema";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ name, email, password, confirmPassword }: TSignupType) =>
      signupApi({ name, email, password, confirmPassword }),
    onSuccess: () =>
      toast.success(
        "Account successfully created. Please Verify the new account from the user's email address",
      ),
    onError: (err: Error) => toast.error(err.message),
  });

  return { signup, isLoading };
}
