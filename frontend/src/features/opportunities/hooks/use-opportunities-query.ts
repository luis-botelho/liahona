import { useQuery } from "@tanstack/react-query";

import { listOpportunities } from "../services/opportunities.service";

export const opportunitiesQueryKey = ["opportunities"] as const;

export function useOpportunitiesQuery() {
  return useQuery({
    queryKey: opportunitiesQueryKey,
    queryFn: listOpportunities,
  });
}
