import { useContext } from "react";

import { AuthContext, type AuthContextData } from "@/contexts/auth";

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser utilizado dentro do AuthProvider."
    );
  }

  return context;
}