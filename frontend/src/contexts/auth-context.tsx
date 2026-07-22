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

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "liahona.auth";

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [state, setState] = useState<{
    user: AuthUser | null;
    token: string | null;
  }>(() => {
    const storage = localStorage.getItem(STORAGE_KEY);

    if (storage) {
      const session = JSON.parse(storage) as LoginData;
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

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data),
    );
  }

  function logout() {
    setState({
      user: null,
      token: null,
    });

    localStorage.removeItem(STORAGE_KEY);
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

