import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOpportunity } from "../services/opportunities.service";
import { opportunitiesQueryKey } from "./use-opportunities-query";

export function useCreateOpportunityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOpportunity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: opportunitiesQueryKey });
    },
  });
}
