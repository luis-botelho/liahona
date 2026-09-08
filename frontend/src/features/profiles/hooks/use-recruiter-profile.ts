import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getRecruiterProfile,
  upsertRecruiterProfile,
} from "../services/profiles.service";
import type { RecruiterProfileInput } from "../types/recruiter-profile";

export const recruiterProfileQueryKey = ["profile", "recruiter"] as const;

export function useRecruiterProfileQuery() {
  return useQuery({
    queryKey: recruiterProfileQueryKey,
    queryFn: getRecruiterProfile,
  });
}

export function useUpsertRecruiterProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RecruiterProfileInput) =>
      upsertRecruiterProfile(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: recruiterProfileQueryKey });
    },
  });
}