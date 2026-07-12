import { api } from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function register(data: RegisterPayload) {
  const response = await api.post("/register", data);

  return response.data;
}