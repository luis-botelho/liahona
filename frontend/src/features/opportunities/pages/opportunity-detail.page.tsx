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

export function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const query = useOpportunityQuery(id);
  const applyMutation = useApplyToOpportunityMutation();
  const [appliedAtRuntime, setAppliedAtRuntime] = useState(false);

  if (!user) return null;

  const opportunity = query.data;
  const applied = (opportunity?.hasApplied ?? false) || appliedAtRuntime;

  const isOwnerRecruiter = opportunity?.author.id === user.id;

  async function handleApply() {
    if (!id) return;

    try {
      await applyMutation.mutateAsync(id);
      setAppliedAtRuntime(true);
      toast.success("Interesse registrado! O recrutador poderá ver seus dados.");
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "";

      if (message.includes("já")) {
        setAppliedAtRuntime(true);
        toast.success("Você já demonstrou interesse nesta oportunidade.");
        return;
      }

      toast.error(message || "Não foi possível registrar seu interesse.");
    }
  }

  return (
    <main className="min-h-screen px-5 py-10 text-left sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">LIAHONA</p>

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
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Voltar ao início
            </Button>
          </div>
        )}

        {opportunity && (
          <>
            <div className="my-3 flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {opportunity.title}
              </h1>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {opportunity.type === "JOB" ? "Trabalho" : "Serviço"}
              </span>
            </div>
            <p className="mb-8 text-muted-foreground">
              {opportunity.author.name}
              {opportunity.location ? ` · ${opportunity.location}` : ""}
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
                  {opportunity.category && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {opportunity.category}
                    </span>
                  )}
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
                  <p>
                    Status:{" "}
                    {opportunity.status === "ACTIVE" ? "Ativa" : "Encerrada"}
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

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Voltar
              </Button>

              {user.role === "RECRUITER" && isOwnerRecruiter && (
                <Button
                  onClick={() =>
                    navigate(`/opportunities/${opportunity.id}/applications`)
                  }
                >
                  Ver interessados
                </Button>
              )}

              {user.role === "WORKER" &&
                opportunity.status === "ACTIVE" && (
                  <Button
                    onClick={handleApply}
                    disabled={applied || applyMutation.isPending}
                  >
                    {applied
                      ? "Interesse registrado"
                      : applyMutation.isPending
                        ? "Registrando..."
                        : "Tenho interesse"}
                  </Button>
                )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}