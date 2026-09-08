import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";

import { RecruiterProfileForm } from "../components/recruiter-profile-form";
import { WorkerProfileForm } from "../components/worker-profile-form";
import { useRecruiterProfileQuery } from "../hooks/use-recruiter-profile";
import { useWorkerProfileQuery } from "../hooks/use-worker-profile";

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const isWorker = user.role === "WORKER";

  return (
    <main className="min-h-screen px-5 py-10 text-left sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">LIAHONA</p>
        <h1 className="my-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Meu perfil
        </h1>
        <p className="mb-8 text-muted-foreground">
          {isWorker
            ? "Conte onde você mora, o que sabe fazer e o que procura. Assim o LIA encontra as oportunidades certas para você."
            : "Cadastre os dados do seu comércio para publicar oportunidades e receber interessados."}
        </p>
        <Card>
          <CardHeader>
            <CardTitle>
              {isWorker ? "Perfil de trabalhador" : "Perfil de recrutador"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isWorker ? (
              <WorkerProfileFormShell />
            ) : (
              <RecruiterProfileFormShell />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function WorkerProfileFormShell() {
  const query = useWorkerProfileQuery();

  if (query.isError) {
    return (
      <p className="py-6 text-center text-sm text-destructive">
        Não foi possível carregar seu perfil.
      </p>
    );
  }

  return <WorkerProfileForm profile={query.data} />;
}

function RecruiterProfileFormShell() {
  const query = useRecruiterProfileQuery();

  if (query.isError) {
    return (
      <p className="py-6 text-center text-sm text-destructive">
        Não foi possível carregar seu perfil.
      </p>
    );
  }

  return <RecruiterProfileForm profile={query.data} />;
}