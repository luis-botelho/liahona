import { api } from "@/services/api";

import type { WorkerProfile, WorkerProfileInput } from "../types/worker-profile";
import type {
  RecruiterProfile,
  RecruiterProfileInput,
} from "../types/recruiter-profile";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function getWorkerProfile() {
  const response = await api.get<ApiResponse<WorkerProfile | null>>(
    "/profile/worker",
  );

  return response.data.data;
}

export async function upsertWorkerProfile(input: WorkerProfileInput) {
  const response = await api.put<ApiResponse<WorkerProfile>>(
    "/profile/worker",
    input,
  );

  return response.data.data;
}

export async function getRecruiterProfile() {
  const response = await api.get<ApiResponse<RecruiterProfile | null>>(
    "/profile/recruiter",
  );

  return response.data.data;
}

export async function upsertRecruiterProfile(input: RecruiterProfileInput) {
  const response = await api.put<ApiResponse<RecruiterProfile>>(
    "/profile/recruiter",
    input,
  );

  return response.data.data;
}