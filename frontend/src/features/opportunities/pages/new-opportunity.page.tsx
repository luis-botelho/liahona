import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OpportunityForm } from "../components/opportunity-form";

export function NewOpportunityPage() {
  return (
    <main className="min-h-screen px-5 py-10 text-left sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">LIAHONA</p>
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
    </main>
  );
}
