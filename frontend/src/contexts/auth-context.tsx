import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  AuthContext,
  type AuthUser,
  type LoginData,
} from "./auth";

import {
  clearSession,
  getSession,
  saveSession,
} from "@/services/auth-storage";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [state, setState] = useState<AuthState>(() => {
    const session = getSession() as LoginData | null;

    if (session) {
      return {
        user: session.user,
        token: session.token,
      };
    }

    return {
      user: null,
      token: null,
    };
  });

  const { user, token } = state;

  const login = useCallback((data: LoginData) => {
    setState({
      user: data.user,
      token: data.token,
    });

    saveSession(data);
  }, []);

  const logout = useCallback(() => {
    clearSession();

    setState({
      user: null,
      token: null,
    });

    queryClient.clear();
  }, [queryClient]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}