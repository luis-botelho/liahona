import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p>
          Bem-vindo, <strong>{user?.name}</strong>
        </p>

        <Button onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </main>
  );
}