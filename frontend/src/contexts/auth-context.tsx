import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  AuthContext,
  type AuthUser,
  type LoginData,
} from "./auth";

import {
  getSession,
  saveSession,
  clearSession,
} from "@/services/auth-storage";


import { useQueryClient } from "@tanstack/react-query";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [state, setState] = useState<{
    user: AuthUser | null;
    token: string | null;
  }>(() => {
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

  function login(data: LoginData) {
    setState({
      user: data.user,
      token: data.token,
    });

    saveSession(data);
  }

  function logout() {
  clearSession();

  setState({
    user: null,
    token: null,
  });

    queryClient.clear();
}

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

