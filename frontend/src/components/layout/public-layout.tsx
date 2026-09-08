import { NavLink, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";

function NavItem({
  to,
  label,
  end = false,
}: {
  to: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )
      }
    >
      {label}
    </NavLink>
  );
}

export function PublicLayout() {
  const { user, logout } = useAuth();

  const isRecruiter = user?.role === "RECRUITER";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <NavLink to="/" className="text-lg font-bold tracking-tight">
            LIA
          </NavLink>

          <nav className="flex flex-wrap items-center gap-2">
            <NavItem to="/" label="Oportunidades" end />

            {user ? (
              <>
                <NavItem to="/dashboard" label="Início" />
                <NavItem to="/profile" label="Meu perfil" />
                {isRecruiter && (
                  <NavItem to="/opportunities/new" label="Publicar" />
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <NavItem to="/login" label="Entrar" />
                <NavLink to="/register">
                  <Button size="sm">Criar perfil</Button>
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}