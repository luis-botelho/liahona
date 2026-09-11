import { NavLink, Navigate, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isRecruiter = user.role === "RECRUITER";

  const navItems = isRecruiter
    ? [
        { to: "/dashboard", label: "Início", end: true },
        { to: "/opportunities/new", label: "Publicar oportunidade", end: true },
        { to: "/profile", label: "Meu perfil", end: true },
      ]
    : [
        { to: "/dashboard", label: "Início", end: true },
        { to: "/applications", label: "Minhas candidaturas", end: true },
        { to: "/profile", label: "Meu perfil", end: true },
      ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <NavLink
            to="/dashboard"
            className="text-lg font-bold tracking-tight"
          >
            LIA
          </NavLink>

          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button variant="ghost" size="sm" onClick={logout}>
              Sair
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}