import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { RecommendedOpportunityCard } from "@/features/opportunities/components/recommended-opportunity-card";
import { useRecommendedOpportunitiesQuery } from "@/features/opportunities/hooks/use-recommended-opportunities-query";
import { useWorkerProfileQuery } from "@/features/profiles/hooks/use-worker-profile";
import { useDownloadResumeMutation } from "@/features/profiles/hooks/use-download-resume";

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

export function WorkerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const recommended = useRecommendedOpportunitiesQuery();
  const profile = useWorkerProfileQuery();
  const downloadResume = useDownloadResumeMutation();

  const showProfileCta =
    profile.isSuccess && !profile.data.completion.isComplete;

  async function handleDownloadResume() {
    try {
      await downloadResume.mutateAsync(undefined);
      toast.success("Seu currículo em PDF está sendo baixado.");
    } catch {
      toast.error("Não foi possível gerar o currículo. Tente novamente.");
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6">
      <section className="border-b pb-8">
        <h1 className="my-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Olá, {user?.name} 👋
        </h1>
        <p className="text-muted-foreground">
          Encontramos oportunidades que combinam com o seu perfil.
        </p>
      </section>

      {showProfileCta && (
        <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${profile.data.completion.completionPercentage}%` }}
            />
          </div>
          <p className="font-medium text-foreground">
            Complete seu perfil para receber oportunidades mais relevantes.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Seu perfil está {profile.data.completion.completionPercentage}%
            completo. Diga onde você mora, o que sabe fazer e o que procura.
          </p>
          <Button className="mt-4" onClick={() => navigate("/profile")}>
            Completar meu perfil
          </Button>
        </section>
      )}

      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-muted/30 p-5">
        <div>
          <p className="font-medium text-foreground">Seu currículo</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Baixe seu currículo em PDF, pronto para enviar ou imprimir.
          </p>
        </div>
        <Button
          variant="outline"
          disabled={downloadResume.isPending}
          onClick={handleDownloadResume}
        >
          {downloadResume.isPending ? "Gerando..." : "Baixar currículo (PDF)"}
        </Button>
      </section>

      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-muted/30 p-5">
        <div>
          <p className="font-medium text-foreground">Aprender</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Cursos gratuitos para desenvolver habilidades novas e melhorar seu
            perfil.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/learning")}>
          Ver cursos
        </Button>
      </section>

      <section className="py-8">
        <h2 className="mb-5 text-2xl font-semibold">Oportunidades para você</h2>

        {recommended.isPending && (
          <div className="grid gap-4 md:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
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
          <div className="rounded-2xl border p-8 text-center">
            <p className="font-medium text-foreground">
              Ainda não encontramos oportunidades por aqui.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete seu perfil para receber recomendações melhores ou volte
              mais tarde — novas oportunidades aparecem todos os dias.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => navigate("/profile")}
            >
              Completar meu perfil
            </Button>
          </div>
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
  );
}