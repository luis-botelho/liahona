import { Button } from "@/components/ui/button";
import { OpportunityCard } from "@/features/opportunities/components/opportunity-card";
import { useOpportunitiesQuery } from "@/features/opportunities/hooks/use-opportunities-query";

interface WorkerDashboardProps {
  name: string;
  onLogout: () => void;
}

export function WorkerDashboard({ name, onLogout }: WorkerDashboardProps) {
  const query = useOpportunitiesQuery();

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
              Veja oportunidades disponíveis na região.
            </p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Sair
          </Button>
        </header>
        <section className="py-8">
          <h2 className="mb-5 text-2xl font-semibold">
            Oportunidades disponíveis
          </h2>
          {query.isPending && (
            <p className="rounded-2xl border p-8 text-center text-muted-foreground">
              Carregando oportunidades...
            </p>
          )}
          {query.isError && (
            <div className="rounded-2xl border border-destructive/30 p-8 text-center">
              <p className="text-destructive">
                Não foi possível carregar as oportunidades.
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
            <p className="rounded-2xl border p-8 text-center text-muted-foreground">
              Nenhuma oportunidade disponível no momento.
            </p>
          )}
          {query.isSuccess && query.data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {query.data.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          )}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Em breve o LIA poderá recomendar oportunidades com base no seu
            perfil.
          </p>
        </section>
      </div>
    </main>
  );
}
