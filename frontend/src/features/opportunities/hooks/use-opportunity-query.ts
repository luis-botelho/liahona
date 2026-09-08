import { useQuery } from "@tanstack/react-query";

import { getOpportunity } from "../services/opportunities.service";

export function useOpportunityQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["opportunity", id],
    queryFn: () => getOpportunity(id as string),
    enabled: Boolean(id),
  });
}