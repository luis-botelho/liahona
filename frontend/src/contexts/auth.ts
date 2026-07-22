import { createContext } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginData {
  token: string;
  user: AuthUser;
}

export interface AuthContextData {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (data: LoginData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData | null>(null);
