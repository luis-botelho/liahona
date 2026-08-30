import { api } from "@/services/api";

import type {
  CreateOpportunityInput,
  Opportunity,
} from "../types/opportunity";

interface ApiResponse<T> {
  success: true;
  data: T;
}

export async function listOpportunities() {
  const response = await api.get<ApiResponse<Opportunity[]>>("/opportunities");
  return response.data.data;
}

export async function createOpportunity(input: CreateOpportunityInput) {
  const response = await api.post<ApiResponse<Opportunity>>(
    "/opportunities",
    input,
  );
  return response.data.data;
}
