import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/features/auth/pages/login.page";
import { RegisterPage } from "@/features/auth/pages/register.page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard.page";
import { NewOpportunityPage } from "@/features/opportunities/pages/new-opportunity.page";
import { OpportunityDetailPage } from "@/features/opportunities/pages/opportunity-detail.page";
import { OpportunityApplicationsPage } from "@/features/opportunities/pages/opportunity-applications.page";
import { ProfilePage } from "@/features/profiles/pages/profile.page";

import { ProtectedRoute } from "@/components/routes/protected-route";
import { RecruiterRoute } from "@/components/routes/recruiter-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/opportunities/:id",
    element: (
      <ProtectedRoute>
        <OpportunityDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/opportunities/:id/applications",
    element: (
      <ProtectedRoute>
        <RecruiterRoute>
          <OpportunityApplicationsPage />
        </RecruiterRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "/opportunities/new",
    element: (
      <ProtectedRoute>
        <RecruiterRoute>
          <NewOpportunityPage />
        </RecruiterRoute>
      </ProtectedRoute>
    ),
  },
]);
