import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { RecommendedOpportunityCard } from "@/features/opportunities/components/recommended-opportunity-card";
import { useRecommendedOpportunitiesQuery } from "@/features/opportunities/hooks/use-recommended-opportunities-query";
import { useWorkerProfileQuery } from "@/features/profiles/hooks/use-worker-profile";
import type { WorkerProfile } from "@/features/profiles/types/worker-profile";

interface WorkerDashboardProps {
  name: string;
  onLogout: () => void;
}

function isProfileIncomplete(profile: WorkerProfile | null | undefined) {
  if (!profile) return true;

  return (
    !profile.whatsapp ||
    !profile.city ||
    profile.skills.length === 0 ||
    profile.interests.length === 0
  );
}

export function WorkerDashboard({ name, onLogout }: WorkerDashboardProps) {
  const navigate = useNavigate();
  const recommended = useRecommendedOpportunitiesQuery();
  const profile = useWorkerProfileQuery();

  const profileIncomplete = isProfileIncomplete(profile.data);

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
              Encontramos oportunidades que combinam com o seu perfil.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/profile")}>
              Meu perfil
            </Button>
            <Button variant="outline" onClick={onLogout}>
              Sair
            </Button>
          </div>
        </header>

        {profileIncomplete && (
          <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="font-medium text-foreground">
              Complete seu perfil para receber melhores recomendações.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Diga onde você mora, o que sabe fazer e o que procura.
            </p>
            <Button className="mt-4" onClick={() => navigate("/profile")}>
              Completar meu perfil
            </Button>
          </section>
        )}

        <section className="py-8">
          <h2 className="mb-5 text-2xl font-semibold">
            Oportunidades para você
          </h2>
          {recommended.isPending && (
            <p className="rounded-2xl border p-8 text-center text-muted-foreground">
              Carregando oportunidades...
            </p>
          )}
          {recommended.isError && (
            <div className="rounded-2xl border border-destructive/30 p-8 text-center">
              <p className="text-destructive">
                Não foi possível carregar as oportunidades.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => recommended.refetch()}
              >
                Tentar novamente
              </Button>
            </div>
          )}
          {recommended.isSuccess && recommended.data.length === 0 && (
            <p className="rounded-2xl border p-8 text-center text-muted-foreground">
              Nenhuma oportunidade disponível no momento.
            </p>
          )}
          {recommended.isSuccess && recommended.data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {recommended.data.map((item) => (
                <RecommendedOpportunityCard
                  key={item.opportunity.id}
                  item={item}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}