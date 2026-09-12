import { useMutation } from "@tanstack/react-query";

import { deleteMyAccount, exportMyData } from "../services/account.service";

export function useExportMyDataMutation() {
  return useMutation({
    mutationFn: exportMyData,
  });
}

export function useDeleteMyAccountMutation() {
  return useMutation({
    mutationFn: deleteMyAccount,
  });
}