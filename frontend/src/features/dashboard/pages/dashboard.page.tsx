import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/use-auth";

import { RecruiterDashboard } from "../components/recruiter-dashboard";
import { WorkerDashboard } from "../components/worker-dashboard";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (!user) return null;

  if (user.role === "RECRUITER") {
    return <RecruiterDashboard name={user.name} onLogout={handleLogout} />;
  }

  return <WorkerDashboard name={user.name} onLogout={handleLogout} />;
}
