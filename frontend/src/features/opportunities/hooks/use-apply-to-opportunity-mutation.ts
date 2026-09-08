import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applyToOpportunity } from "../services/opportunities.service";

export function useApplyToOpportunityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applyToOpportunity(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ["opportunity", id] });
    },
  });
}