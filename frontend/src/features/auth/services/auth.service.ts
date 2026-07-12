import { api } from "@/services/api";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

export async function register(data: RegisterRequest) {
  const response = await api.post<RegisterResponse>(
    "/register",
    data,
  );

  return response.data;
}