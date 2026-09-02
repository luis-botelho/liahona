import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { OpportunityCard } from "@/features/opportunities/components/opportunity-card";
import { useMyOpportunitiesQuery } from "@/features/opportunities/hooks/use-my-opportunities-query";

interface RecruiterDashboardProps {
  name: string;
  onLogout: () => void;
}

export function RecruiterDashboard({
  name,
  onLogout,
}: RecruiterDashboardProps) {
  const navigate = useNavigate();
  const query = useMyOpportunitiesQuery();

  return (
    <main className="min-h-screen px-5 py-8 text-left sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">LIAHONA</p>
            <h1 className="my-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Olá, {name} 👋
            </h1>
            <p className="text-muted-foreground">
              Encontre pessoas para sua próxima oportunidade.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onLogout}>
              Sair
            </Button>
            <Button onClick={() => navigate("/opportunities/new")}>
              + Publicar oportunidade
            </Button>
          </div>
        </header>
        <section className="py-8">
          <h2 className="mb-5 text-2xl font-semibold">Suas oportunidades</h2>
          {query.isPending && (
            <p className="rounded-2xl border p-8 text-center text-muted-foreground">
              Carregando suas oportunidades...
            </p>
          )}
          {query.isError && (
            <div className="rounded-2xl border border-destructive/30 p-8 text-center">
              <p className="text-destructive">
                Não foi possível carregar suas oportunidades.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => query.refetch()}
              >
                Tentar novamente
              </Button>
            </div>
          )}
          {query.isSuccess && query.data.length === 0 && (
            <div className="rounded-2xl border p-8 text-center">
              <p className="text-muted-foreground">
                Você ainda não publicou nenhuma oportunidade.
              </p>
              <Button
                className="mt-4"
                onClick={() => navigate("/opportunities/new")}
              >
                Publicar primeira oportunidade
              </Button>
            </div>
          )}
          {query.isSuccess && query.data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {query.data.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  showStatus
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
