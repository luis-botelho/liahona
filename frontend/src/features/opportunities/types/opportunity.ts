export type OpportunityType = "JOB" | "SERVICE";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  location: string | null;
  status: "ACTIVE" | "CLOSED";
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface CreateOpportunityInput {
  title: string;
  description: string;
  type: OpportunityType;
  location?: string;
}
