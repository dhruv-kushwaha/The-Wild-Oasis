import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { TLoginType } from "../../schema/authSchema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: TLoginType) =>
      loginApi({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Invalid Credentials");
    },
  });

  return { login, isLoading };
}
