import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/components/layout/app-layout";
import { PublicLayout } from "@/components/layout/public-layout";
import { LoginPage } from "@/features/auth/pages/login.page";
import { RegisterPage } from "@/features/auth/pages/register.page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard.page";
import { MyApplicationsPage } from "@/features/applications/pages/my-applications.page";
import { NewOpportunityPage } from "@/features/opportunities/pages/new-opportunity.page";
import { OpportunityDetailPage } from "@/features/opportunities/pages/opportunity-detail.page";
import { PublicFeedPage } from "@/features/opportunities/pages/public-feed.page";
import { OpportunityApplicationsPage } from "@/features/opportunities/pages/opportunity-applications.page";
import { ProfilePage } from "@/features/profiles/pages/profile.page";
import { CertificatePublicPage } from "@/features/learning/pages/certificate-public.page";
import { CourseDetailPage } from "@/features/learning/pages/course-detail.page";
import { LearningCatalogPage } from "@/features/learning/pages/learning-catalog.page";

import { ProtectedRoute } from "@/components/routes/protected-route";
import { RecruiterRoute } from "@/components/routes/recruiter-route";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <PublicFeedPage />,
      },
      {
        path: "/opportunities/:id",
        element: <OpportunityDetailPage />,
      },
    ],
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
    path: "/certificates/:code",
    element: <CertificatePublicPage />,
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
        path: "/applications",
        element: <MyApplicationsPage />,
      },
      {
        path: "/learning",
        element: <LearningCatalogPage />,
      },
      {
        path: "/learning/:id",
        element: <CourseDetailPage />,
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