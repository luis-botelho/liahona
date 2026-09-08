import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { OpportunityCard } from "@/features/opportunities/components/opportunity-card";
import { useMyOpportunitiesQuery } from "@/features/opportunities/hooks/use-my-opportunities-query";
import { useRecruiterProfileQuery } from "@/features/profiles/hooks/use-recruiter-profile";
import type { RecruiterProfile } from "@/features/profiles/types/recruiter-profile";

function isProfileIncomplete(profile: RecruiterProfile | null | undefined) {
  if (!profile) return true;

  return !profile.whatsapp || !profile.city;
}

export function RecruiterDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const query = useMyOpportunitiesQuery();
  const profile = useRecruiterProfileQuery();

  const showProfileCta = profile.isSuccess && isProfileIncomplete(profile.data);

  return (
    <div className="px-4 py-8 sm:px-6">
      <section className="border-b pb-8">
        <h1 className="my-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Olá, {user?.name} 👋
        </h1>
        <p className="text-muted-foreground">
          Encontre pessoas para sua próxima oportunidade.
        </p>
      </section>

      {showProfileCta && (
        <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <p className="font-medium text-foreground">
            Complete seu perfil para apresentar seu negócio aos candidatos.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Informe o WhatsApp e a cidade da sua organização para receber
            interessados.
          </p>
          <Button className="mt-4" onClick={() => navigate("/profile")}>
            Completar meu perfil
          </Button>
        </section>
      )}

      <section className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-secondary/40 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-medium text-foreground">
            Publicar nova oportunidade
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Receba interessados da comunidade em minutos.
          </p>
        </div>
        <Button onClick={() => navigate("/opportunities/new")}>
          + Publicar oportunidade
        </Button>
      </section>

      <section className="py-8">
        <h2 className="mb-5 text-2xl font-semibold">Suas oportunidades</h2>

        {query.isPending && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="animate-pulse rounded-2xl border bg-muted/40 p-6">
              <div className="h-5 w-2/3 rounded-2xl bg-muted" />
              <div className="mt-6 h-16 rounded-2xl bg-muted" />
              <div className="mt-6 h-9 w-full rounded-2xl bg-muted" />
            </div>
            <div className="animate-pulse rounded-2xl border bg-muted/40 p-6">
              <div className="h-5 w-2/3 rounded-2xl bg-muted" />
              <div className="mt-6 h-16 rounded-2xl bg-muted" />
              <div className="mt-6 h-9 w-full rounded-2xl bg-muted" />
            </div>
          </div>
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
            <p className="font-medium text-foreground">
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
                interestedCount={opportunity._count?.applications ?? 0}
                action={
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      navigate(`/opportunities/${opportunity.id}/applications`)
                    }
                  >
                    Ver interessados
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}