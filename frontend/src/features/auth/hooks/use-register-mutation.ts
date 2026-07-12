import { useMutation } from "@tanstack/react-query";
import {
  register,
} from "../services/auth.service";

export function useRegisterMutation(reset: () => void) {
    return useMutation({
        mutationFn: register,

        onSuccess: () => {
            reset();
        },

        onError: (error) => {
            console.error(error);
        },
    });
}