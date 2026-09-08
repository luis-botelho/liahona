import { Navigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/use-auth";

interface RecruiterRouteProps {
  children: React.ReactNode;
}

export function RecruiterRoute({ children }: RecruiterRouteProps) {
  const { user } = useAuth();

  if (user?.role !== "RECRUITER") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
