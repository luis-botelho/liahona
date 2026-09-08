import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OpportunityForm } from "../components/opportunity-form";

export function NewOpportunityPage() {
  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="my-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Publicar oportunidade
        </h1>
        <p className="mb-8 text-muted-foreground">
          Compartilhe uma vaga ou serviço com a comunidade.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da oportunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <OpportunityForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
