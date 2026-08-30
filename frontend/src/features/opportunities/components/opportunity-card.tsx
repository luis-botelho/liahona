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
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
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
      </CardContent>
    </Card>
  );
}
