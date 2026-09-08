import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOpportunityQuery } from "../hooks/use-opportunity-query";
import { useOpportunityApplicationsQuery } from "../hooks/use-opportunity-applications-query";

function sanitizePhone(phone: string | null): string {
  if (!phone) return "";

  return phone.replace(/\D/g, "");
}

export function OpportunityApplicationsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detail = useOpportunityQuery(id);
  const applications = useOpportunityApplicationsQuery(id);

  return (
    <main className="min-h-screen px-5 py-10 text-left sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="my-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Interessados
        </h1>
        <p className="mb-8 text-muted-foreground">
          {detail.data?.title ?? "Carregando oportunidade..."}
        </p>

        {applications.isPending && (
          <p className="rounded-2xl border p-8 text-center text-muted-foreground">
            Carregando interessados...
          </p>
        )}

        {applications.isError && (
          <div className="rounded-2xl border border-destructive/30 p-8 text-center">
            <p className="text-destructive">
              Não foi possível carregar os interessados.
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

        {applications.isSuccess && applications.data.length === 0 && (
          <p className="rounded-2xl border p-8 text-center text-muted-foreground">
            Nenhum interessado por enquanto.
          </p>
        )}

        {applications.isSuccess && applications.data.length > 0 && (
          <div className="space-y-4">
            {applications.data.map((application) => {
              const profile = application.worker.workerProfile;
              const phone = sanitizePhone(profile?.whatsapp ?? null);
              const title = detail.data?.title ?? "oportunidade";

              const whatsappMessage = encodeURIComponent(
                `Olá ${application.worker.name}, vi seu interesse na oportunidade "${title}" pelo LIA.`,
              );
              const whatsappLink = phone
                ? `https://wa.me/${phone}?text=${whatsappMessage}`
                : null;

              return (
                <Card key={application.id} className="text-left">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {application.worker.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {profile?.city}
                      {profile?.neighborhood
                        ? ` · ${profile.neighborhood}`
                        : ""}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {profile?.bio && (
                      <p className="text-sm text-foreground/80">
                        {profile.bio}
                      </p>
                    )}
                    {profile && profile.skills.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Skills:
                        </p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {profile.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      {whatsappLink ? (
                        <Button
                          variant="outline"
                          render={
                            <a
                              href={whatsappLink}
                              target="_blank"
                              rel="noreferrer"
                            />
                          }
                        >
                          Conversar no WhatsApp
                        </Button>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Sem WhatsApp cadastrado.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Voltar
          </Button>
        </div>
      </div>
    </main>
  );
}