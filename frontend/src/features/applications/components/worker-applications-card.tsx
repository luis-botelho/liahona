import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useWithdrawApplicationMutation } from "../hooks/use-applications";
import { ApplicationStatusBadge } from "./application-status-badge";
import type { WorkerApplication } from "../types/application";

interface WorkerApplicationsCardProps {
  applications: WorkerApplication[];
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("pt-BR");
}

const CAN_WITHDRAW_STATUSES = new Set(["APPLIED", "REVIEWING", "INTERVIEW"]);

export function WorkerApplicationsCard({
  applications,
}: WorkerApplicationsCardProps) {
  const withdrawMutation = useWithdrawApplicationMutation();

  async function handleWithdraw(id: string) {
    try {
      await withdrawMutation.mutateAsync(id);
      toast.success("Candidatura retirada.");
    } catch {
      toast.error("Não foi possível retirar a candidatura. Tente novamente.");
    }
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="text-left">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <CardTitle className="text-lg">
                <Link
                  to={`/opportunities/${application.opportunity.id}`}
                  className="text-primary hover:underline"
                >
                  {application.opportunity.title}
                </Link>
              </CardTitle>
              <ApplicationStatusBadge status={application.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              {application.opportunity.type === "SERVICE" ? "Serviço" : "Vaga"}
              {" · "}
              {application.opportunity.location ?? "Local não informado"}
              {" · solicitado em "}
              {formatDate(application.createdAt)}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {application.opportunity.category ?? "Sem categoria"}
              {" · publicada por "}
              {application.opportunity.author.name}
            </p>
            {CAN_WITHDRAW_STATUSES.has(application.status) && (
              <div className="mt-3 border-t pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={withdrawMutation.isPending}
                  onClick={() => handleWithdraw(application.id)}
                >
                  Retirar candidatura
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}