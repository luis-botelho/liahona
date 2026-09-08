import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getWorkerProfile,
  upsertWorkerProfile,
} from "../services/profiles.service";
import type { WorkerProfileInput } from "../types/worker-profile";

export const workerProfileQueryKey = ["profile", "worker"] as const;

export function useWorkerProfileQuery() {
  return useQuery({
    queryKey: workerProfileQueryKey,
    queryFn: getWorkerProfile,
  });
}

export function useUpsertWorkerProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: WorkerProfileInput) => upsertWorkerProfile(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: workerProfileQueryKey });
    },
  });
}