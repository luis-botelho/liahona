import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { OpportunityCard } from "@/features/opportunities/components/opportunity-card";
import { useOpportunitiesQuery } from "@/features/opportunities/hooks/use-opportunities-query";

import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const opportunitiesQuery = useOpportunitiesQuery();

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <main className="min-h-screen px-5 py-8 text-left sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">LIAHONA</p>
            <h1 className="my-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Olá, {user?.name}
            </h1>
            <p className="text-muted-foreground">Encontre e compartilhe oportunidades.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleLogout}>Sair</Button>
            <Button onClick={() => navigate("/opportunities/new")}>Publicar oportunidade</Button>
          </div>
        </header>

        <section className="py-8">
          <h2 className="mb-5 text-2xl font-semibold">Oportunidades recentes</h2>

          {opportunitiesQuery.isPending && (
            <p className="rounded-2xl border p-8 text-center text-muted-foreground">
              Carregando oportunidades...
            </p>
          )}

          {opportunitiesQuery.isError && (
            <div className="rounded-2xl border border-destructive/30 p-8 text-center">
              <p className="text-destructive">Não foi possível carregar as oportunidades.</p>
              <Button className="mt-4" variant="outline" onClick={() => opportunitiesQuery.refetch()}>
                Tentar novamente
              </Button>
            </div>
          )}

          {opportunitiesQuery.isSuccess && opportunitiesQuery.data.length === 0 && (
            <div className="rounded-2xl border p-8 text-center">
              <p className="text-muted-foreground">Nenhuma oportunidade publicada ainda.</p>
              <Button className="mt-4" onClick={() => navigate("/opportunities/new")}>Publicar a primeira</Button>
            </div>
          )}

          {opportunitiesQuery.isSuccess && opportunitiesQuery.data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {opportunitiesQuery.data.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
