import { api } from "@/services/api";

import type {
  Application,
  CreateOpportunityInput,
  Opportunity,
  RecommendedOpportunity,
} from "../types/opportunity";

interface ApiResponse<T> {
  success: true;
  data: T;
}

export async function listOpportunities() {
  const response = await api.get<ApiResponse<Opportunity[]>>("/opportunities");
  return response.data.data;
}

export async function listMyOpportunities() {
  const response = await api.get<ApiResponse<Opportunity[]>>(
    "/opportunities/mine",
  );
  return response.data.data;
}

export async function getRecommendedOpportunities() {
  const response = await api.get<ApiResponse<RecommendedOpportunity[]>>(
    "/opportunities/recommended",
  );
  return response.data.data;
}

export async function getOpportunity(id: string) {
  const response = await api.get<ApiResponse<Opportunity>>(
    `/opportunities/${id}`,
  );
  return response.data.data;
}

export async function createOpportunity(input: CreateOpportunityInput) {
  const response = await api.post<ApiResponse<Opportunity>>(
    "/opportunities",
    input,
  );
  return response.data.data;
}

export async function applyToOpportunity(id: string) {
  const response = await api.post<ApiResponse<{ id: string }>>(
    `/opportunities/${id}/apply`,
  );
  return response.data.data;
}

export async function listOpportunityApplications(id: string) {
  const response = await api.get<ApiResponse<Application[]>>(
    `/opportunities/${id}/applications`,
  );
  return response.data.data;
}