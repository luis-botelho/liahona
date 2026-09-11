import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useApplyToOpportunityMutation } from "../hooks/use-apply-to-opportunity-mutation";
import { useOpportunityQuery } from "../hooks/use-opportunity-query";
import { useDownloadResumeMutation } from "@/features/profiles/hooks/use-download-resume";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { InterestModal } from "../components/interest-modal";

export function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const query = useOpportunityQuery(id);
  const applyMutation = useApplyToOpportunityMutation();
  const downloadResume = useDownloadResumeMutation();
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [appliedAtRuntime, setAppliedAtRuntime] = useState(false);

  const opportunity = query.data;
  const applied = (opportunity?.hasApplied ?? false) || appliedAtRuntime;
  const isOwnerRecruiter = Boolean(
    opportunity && user && opportunity.author.id === user.id,
  );
  const isExternal = Boolean(opportunity?.externalUrl);
  const isLia = opportunity?.source === "LIA";
  const canShowInterest = Boolean(
    opportunity && isLia && opportunity.status === "ACTIVE" && user?.role !== "RECRUITER",
  );
  const whatsappHref = opportunity?.authorWhatsapp
    ? buildWhatsAppUrl(opportunity.authorWhatsapp, opportunity.title)
    : null;

  function goBack() {
    navigate(user ? "/dashboard" : "/");
  }

  async function handleApply() {
    if (!id) return;

    try {
      await applyMutation.mutateAsync(id);
      setAppliedAtRuntime(true);
      setInterestModalOpen(false);
      toast.success("Interesse registrado! O recrutador poderá ver seus dados.");
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "";

      if (message.includes("já")) {
        setAppliedAtRuntime(true);
        setInterestModalOpen(false);
        toast.success("Você já demonstrou interesse nesta oportunidade.");
        return;
      }

      toast.error(message || "Não foi possível registrar seu interesse.");
    }
  }

  function handleLiaChoice() {
    if (!opportunity || !id) return;

    if (user?.role === "WORKER") {
      void handleApply();
      return;
    }

    navigate(`/login?returnTo=${encodeURIComponent(`/opportunities/${id}`)}`);
  }

  async function handleTargetedResume() {
    if (!id) return;

    try {
      await downloadResume.mutateAsync(id);
      toast.success("Currículo preparado para esta vaga está sendo baixado.");
    } catch {
      toast.error("Não foi possível gerar o currículo. Tente novamente.");
    }
  }

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {query.isPending && (
          <p className="mt-8 rounded-2xl border p-8 text-center text-muted-foreground">
            Carregando oportunidade...
          </p>
        )}

        {query.isError && (
          <div className="mt-8 rounded-2xl border border-destructive/30 p-8 text-center">
            <p className="text-destructive">
              Não foi possível carregar a oportunidade.
            </p>
            <Button className="mt-4" variant="outline" onClick={goBack}>
              Voltar
            </Button>
          </div>
        )}

        {opportunity && (
          <>
            <div className="my-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {opportunity.title}
              </h1>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {opportunity.type === "JOB" ? "Trabalho" : "Serviço"}
              </span>
              {opportunity.category && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {opportunity.category}
                </span>
              )}
            </div>

            <p className="mb-8 text-muted-foreground">
              {opportunity.author.name}
              {opportunity.location
                ? ` · ${opportunity.location}`
                : ""}
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-foreground/80">
                  {opportunity.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {(opportunity.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t pt-4 text-sm text-muted-foreground">
                  {opportunity.location && (
                    <p>Localização: {opportunity.location}</p>
                  )}
                  <p>
                    Origem:{" "}
                    {opportunity.source === "EXTERNAL"
                      ? (opportunity.sourceName ?? "Fonte externa")
                      : "Publicada no LIA"}
                  </p>
                  <p>
                    Status:{" "}
                    {opportunity.status === "ACTIVE"
                      ? "Ativa"
                      : "Encerrada"}
                  </p>
                  <p>
                    Publicado em:{" "}
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(opportunity.createdAt),
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <Button variant="outline" onClick={goBack}>
                Voltar
              </Button>

              {user?.role === "RECRUITER" && isOwnerRecruiter && (
                <Button
                  onClick={() =>
                    navigate(`/opportunities/${opportunity.id}/applications`)
                  }
                >
                  Ver interessados
                </Button>
              )}

              {user?.role === "WORKER" && (
                <Button
                  variant="outline"
                  disabled={downloadResume.isPending}
                  onClick={handleTargetedResume}
                >
                  {downloadResume.isPending
                    ? "Gerando..."
                    : "Baixar currículo para esta vaga"}
                </Button>
              )}

              {isExternal && (
                <Button
                  render={
                    <a
                      href={opportunity.externalUrl ?? undefined}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                >
                  Ver oportunidade original
                </Button>
              )}

              {canShowInterest && (
                <Button
                  onClick={() => setInterestModalOpen(true)}
                  disabled={applied || applyMutation.isPending}
                >
                  {applied
                    ? "Interesse enviado ✓"
                    : "Tenho interesse"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      {interestModalOpen && opportunity && (
        <InterestModal
          opportunityTitle={opportunity.title}
          whatsappHref={whatsappHref}
          onWhatsApp={() => setInterestModalOpen(false)}
          onLia={handleLiaChoice}
          onClose={() => setInterestModalOpen(false)}
        />
      )}
    </div>
  );
}