import { Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

import { useMyApplicationsQuery } from "../hooks/use-applications";
import { WorkerApplicationsCard } from "../components/worker-applications-card";

export function MyApplicationsPage() {
  const { user } = useAuth();
  const applications = useMyApplicationsQuery();

  if (!user) return null;

  if (user.role !== "WORKER") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="my-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Minhas candidaturas
        </h1>
        <p className="mb-8 text-muted-foreground">
          Acompanhe o status das oportunidades em que você demonstrou interesse.
        </p>

        {applications.isPending && (
          <p className="rounded-2xl border p-8 text-center text-muted-foreground">
            Carregando candidaturas...
          </p>
        )}

        {applications.isError && (
          <div className="rounded-2xl border border-destructive/30 p-8 text-center">
            <p className="text-destructive">
              Não foi possível carregar suas candidaturas.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => applications.refetch()}
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {applications.isSuccess && applications.data.length === 0 && (
          <div className="rounded-2xl border p-8 text-center">
            <p className="font-medium text-foreground">
              Você ainda não se candidatou a nenhuma oportunidade.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore o Radar de oportunidades e demonstre interesse naquelas
              que combinam com você.
            </p>
          </div>
        )}

        {applications.isSuccess && applications.data.length > 0 && (
          <WorkerApplicationsCard applications={applications.data} />
        )}
      </div>
    </div>
  );
}