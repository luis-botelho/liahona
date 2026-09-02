import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Opportunity } from "../types/opportunity";

interface OpportunityCardProps {
  opportunity: Opportunity;
  showStatus?: boolean;
}

export function OpportunityCard({
  opportunity,
  showStatus = false,
}: OpportunityCardProps) {
  return (
    <Card className="text-left">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {opportunity.type === "JOB" ? "Trabalho" : "Serviço"}
          </span>
        </div>
        <CardDescription>
          Publicado por {opportunity.author.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-3 text-sm leading-relaxed text-foreground/80">
          {opportunity.description}
        </p>
        {opportunity.location && (
          <p className="text-sm text-muted-foreground">
            Localização: {opportunity.location}
          </p>
        )}
        {showStatus && (
          <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
            <span>
              Status: {opportunity.status === "ACTIVE" ? "Ativa" : "Encerrada"}
            </span>
            <time dateTime={opportunity.createdAt}>
              {new Intl.DateTimeFormat("pt-BR").format(
                new Date(opportunity.createdAt),
              )}
            </time>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
