import { api } from "@/services/api";

// Register

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

// Login 


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
  const response = await api.post<LoginResponse>(
    "/login",
    data,
  );

  return response.data;
}