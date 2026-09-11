import { api } from "@/services/api";

import type {
  ApplicationStatus,
  ApplicationStatusUpdate,
  WorkerApplication,
} from "../types/application";

interface ApiResponse<T> {
  success: true;
  data: T;
}

export async function getMyApplications() {
  const response = await api.get<ApiResponse<WorkerApplication[]>>(
    "/applications/mine",
  );

  return response.data.data;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
) {
  const response = await api.patch<ApiResponse<ApplicationStatusUpdate>>(
    `/applications/${id}/status`,
    { status },
  );

  return response.data.data;
}

export async function withdrawApplication(id: string) {
  const response = await api.post<ApiResponse<ApplicationStatusUpdate>>(
    `/applications/${id}/withdraw`,
  );

  return response.data.data;
}