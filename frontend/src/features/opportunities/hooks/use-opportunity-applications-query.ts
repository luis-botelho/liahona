import { useQuery } from "@tanstack/react-query";

import { listOpportunityApplications } from "../services/opportunities.service";

export function useOpportunityApplicationsQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["opportunity", id, "applications"],
    queryFn: () => listOpportunityApplications(id as string),
    enabled: Boolean(id),
  });
}