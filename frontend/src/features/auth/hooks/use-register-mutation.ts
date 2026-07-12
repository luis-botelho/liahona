import { useMutation } from "@tanstack/react-query";
import { register } from "../services/auth.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useRegisterMutation(reset: () => void) {
  return useMutation({
    mutationFn: register,

    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
      reset();
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error?.response?.data?.message ?? "Não foi possível criar sua conta.",
      );
    },
  });
}
