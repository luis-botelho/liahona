import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyApplications,
  updateApplicationStatus,
  withdrawApplication,
} from "../services/applications.service";
import type { ApplicationStatus } from "../types/application";

export const myApplicationsQueryKey = ["applications", "mine"] as const;

export function useMyApplicationsQuery() {
  return useQuery({
    queryKey: myApplicationsQueryKey,
    queryFn: getMyApplications,
  });
}

export function useUpdateApplicationStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: myApplicationsQueryKey });
      void queryClient.invalidateQueries({
        queryKey: ["opportunity"],
      });
    },
  });
}

export function useWithdrawApplicationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => withdrawApplication(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: myApplicationsQueryKey });
    },
  });
}