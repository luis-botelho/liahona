import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Opportunity } from "../types/opportunity";

interface PublicOpportunityCardProps {
  opportunity: Opportunity;
}

export function PublicOpportunityCard({
  opportunity,
}: PublicOpportunityCardProps) {
  const origin =
    opportunity.source === "EXTERNAL"
      ? (opportunity.sourceName ?? "Fonte externa")
      : "Publicada no LIA";

  return (
    <Card className="text-left">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {opportunity.type === "JOB" ? "Trabalho" : "Serviço"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {opportunity.category && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {opportunity.category}
            </span>
          )}
        </div>

        <CardDescription>
          {opportunity.author.name}
          {opportunity.location ? ` · ${opportunity.location}` : ""}
        </CardDescription>

        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Origem: {origin}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="line-clamp-3 text-sm leading-relaxed text-foreground/80">
          {opportunity.description}
        </p>

        <div className="flex items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
          <time dateTime={opportunity.createdAt}>
            {new Intl.DateTimeFormat("pt-BR").format(
              new Date(opportunity.createdAt),
            )}
          </time>

          <Link to={`/opportunities/${opportunity.id}`}>
            <Button size="xs" variant="outline">
              Ver oportunidade
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}