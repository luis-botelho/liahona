import { useQuery } from "@tanstack/react-query";

import { getRecommendedOpportunities } from "../services/opportunities.service";

export const recommendedOpportunitiesQueryKey = ["opportunities", "recommended"] as const;

export function useRecommendedOpportunitiesQuery() {
  return useQuery({
    queryKey: recommendedOpportunitiesQueryKey,
    queryFn: getRecommendedOpportunities,
  });
}