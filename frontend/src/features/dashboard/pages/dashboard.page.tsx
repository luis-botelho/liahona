import { useAuth } from "@/features/auth/hooks/use-auth";

import { RecruiterDashboard } from "../components/recruiter-dashboard";
import { WorkerDashboard } from "../components/worker-dashboard";

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === "RECRUITER") {
    return <RecruiterDashboard />;
  }

  return <WorkerDashboard />;
}