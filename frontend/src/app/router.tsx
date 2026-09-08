import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/components/layout/app-layout";
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
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/opportunities/:id",
        element: <OpportunityDetailPage />,
      },
      {
        path: "/opportunities/:id/applications",
        element: (
          <RecruiterRoute>
            <OpportunityApplicationsPage />
          </RecruiterRoute>
        ),
      },
      {
        path: "/opportunities/new",
        element: (
          <RecruiterRoute>
            <NewOpportunityPage />
          </RecruiterRoute>
        ),
      },
    ],
  },
]);