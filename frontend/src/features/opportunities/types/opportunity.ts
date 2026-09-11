import type { ApplicationStatus } from "@/features/applications/types/application";

export type OpportunityType = "JOB" | "SERVICE";
export type OpportunityStatus = "ACTIVE" | "CLOSED";
export type OpportunitySource = "LIA" | "EXTERNAL";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  location: string | null;
  status: OpportunityStatus;
  category: string | null;
  tags: string[];
  source: OpportunitySource;
  externalUrl: string | null;
  sourceName: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  authorWhatsapp?: string | null;
  _count?: {
    applications: number;
  };
  hasApplied?: boolean;
}

export interface RecommendedOpportunity {
  opportunity: Opportunity;
  matchScore: number;
  matchReasons: string[];
}

export interface Application {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  worker: {
    id: string;
    name: string;
    email: string;
    workerProfile: {
      whatsapp: string | null;
      city: string | null;
      neighborhood: string | null;
      skills: string[];
      bio: string | null;
    } | null;
  };
}

export interface CreateOpportunityInput {
  title: string;
  description: string;
  type: OpportunityType;
  location?: string;
  category?: string;
  tags?: string[];
}