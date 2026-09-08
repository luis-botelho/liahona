import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { RecommendedOpportunity } from "../types/opportunity";

interface RecommendedOpportunityCardProps {
  item: RecommendedOpportunity;
}

export function RecommendedOpportunityCard({
  item,
}: RecommendedOpportunityCardProps) {
  const navigate = useNavigate();
  const { opportunity, matchScore, matchReasons } = item;

  return (
    <Card className="text-left">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{opportunity.title}</CardTitle>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {matchScore}% compatível
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {opportunity.author.name}
          {opportunity.location ? ` · ${opportunity.location}` : ""}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80">
          {opportunity.description}
        </p>
        {matchReasons.length > 0 && (
          <div className="space-y-1 rounded-2xl bg-secondary/40 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">
              Por que combina com você:
            </p>
            <ul className="space-y-1">
              {matchReasons.map((reason) => (
                <li key={reason} className="text-sm text-foreground/80">
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button
          className="w-full"
          variant="outline"
          onClick={() => navigate(`/opportunities/${opportunity.id}`)}
        >
          Ver oportunidade
        </Button>
      </CardContent>
    </Card>
  );
}