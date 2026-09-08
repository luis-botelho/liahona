import { useQuery } from "@tanstack/react-query";

import { listMyOpportunities } from "../services/opportunities.service";

export const myOpportunitiesQueryKey = ["opportunities", "mine"] as const;

export function useMyOpportunitiesQuery() {
  return useQuery({
    queryKey: myOpportunitiesQueryKey,
    queryFn: listMyOpportunities,
  });
}
