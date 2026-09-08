import { Button } from "@/components/ui/button";
import { useOpportunitiesQuery } from "../hooks/use-opportunities-query";
import { PublicOpportunityCard } from "../components/public-opportunity-card";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border bg-muted/40 p-6">
      <div className="h-5 w-2/3 rounded-2xl bg-muted" />
      <div className="mt-3 h-4 w-1/2 rounded-2xl bg-muted" />
      <div className="mt-6 h-16 rounded-2xl bg-muted" />
      <div className="mt-6 h-9 w-full rounded-2xl bg-muted" />
    </div>
  );
}

export function PublicFeedPage() {
  const query = useOpportunitiesQuery();

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <section className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Oportunidades perto de você
          </h1>
          <p className="mt-3 text-muted-foreground">
            Encontre empregos, serviços e tarefas na sua comunidade. Você não
            precisa de uma conta para começar.
          </p>
        </section>

        <section className="py-8">
          {query.isPending && (
            <div className="grid gap-4 md:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
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
            <div className="rounded-2xl border p-8 text-center">
              <p className="font-medium text-foreground">
                Ainda não há oportunidades publicadas.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Volte mais tarde — novas oportunidades aparecem todos os dias.
              </p>
            </div>
          )}

          {query.isSuccess && query.data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {query.data.map((opportunity) => (
                <PublicOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}