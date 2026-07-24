import { api } from "@/services/api";

// ----------------------
// Tipos compartilhados
// ----------------------

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// ----------------------
// Register
// ----------------------

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
  const response = await api.post<ApiResponse<RegisterResponse>>(
    "/register",
    data,
  );

  return response.data.data;
}

// ----------------------
// Login
// ----------------------

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;

  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function login(data: LoginRequest) {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/login",
    data,
  );

  return response.data.data;
}