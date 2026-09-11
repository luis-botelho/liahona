import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useCertificateQuery } from "../hooks/use-learning";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function CertificatePublicPage() {
  const { code = "" } = useParams();
  const certificate = useCertificateQuery(code);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <main className="w-full max-w-xl">
        {certificate.isError && (
          <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold">Certificado não encontrado</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Verifique o código e tente novamente.
            </p>
            <Link to="/learning" className="mt-6 inline-block">
              <Button variant="outline">Voltar para Aprender</Button>
            </Link>
          </div>
        )}

        {certificate.isLoading && (
          <p className="text-center text-sm text-muted-foreground">
            Carregando certificado...
          </p>
        )}

        {certificate.isSuccess && (
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="border-b bg-primary px-8 py-6 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/80">
                Certificado de conclusão
              </p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-primary-foreground">
                LIA
              </p>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Learning & Impact Association
              </p>
            </div>

            <div className="space-y-6 px-8 py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Certificamos que
              </p>
              <p className="text-2xl font-semibold">
                {certificate.data.worker.name}
              </p>
              <p className="text-sm text-muted-foreground">
                concluiu com êxito o curso
              </p>
              <p className="text-xl font-semibold">
                {certificate.data.course.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {certificate.data.course.provider}
                {certificate.data.course.category
                  ? ` · ${certificate.data.course.category}`
                  : ""}
              </p>

              <div className="rounded-2xl bg-secondary/40 px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Código de verificação
                </p>
                <p className="mt-1 font-mono text-lg font-semibold tracking-wider">
                  {certificate.data.code}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Emitido em {formatDate(certificate.data.issuedAt)}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}