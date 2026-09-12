import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useWorkerProfileQuery } from "@/features/profiles/hooks/use-worker-profile";

import {
  useDeleteMyAccountMutation,
  useExportMyDataMutation,
} from "../hooks/use-account";

function ConsentRow({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-secondary/40 px-4 py-3">
      <span className="text-sm text-foreground/80">{label}</span>
      <span
        className={
          enabled
            ? "text-sm font-medium text-emerald-700"
            : "text-sm font-medium text-muted-foreground"
        }
      >
        {enabled ? "Ativo" : "Desativado"}
      </span>
    </div>
  );
}

export function PrivacyPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const exportData = useExportMyDataMutation();
  const deleteAccount = useDeleteMyAccountMutation();
  const workerProfile = useWorkerProfileQuery();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const isWorker = user?.role === "WORKER";

  const consents =
    isWorker && workerProfile.isSuccess ? workerProfile.data.profile : null;

  async function handleExport() {
    try {
      await exportData.mutateAsync();
      toast.success("Seus dados estão sendo baixados.");
    } catch {
      toast.error("Não foi possível exportar seus dados.");
    }
  }

  async function handleDelete() {
    if (confirmText.trim() !== "EXCLUIR") {
      toast.error('Digite EXCLUIR para confirmar a exclusão.');
      return;
    }

    try {
      await deleteAccount.mutateAsync();
      toast.success("Sua conta e seus dados foram removidos.");
      logout();
      navigate("/");
    } catch {
      toast.error("Não foi possível excluir sua conta.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacidade e seus dados (LGPD)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Você controla os seus dados. Consulte, exporte ou apague tudo de
          forma direta — sem pedir para terceiros.
        </p>

        {isWorker && consents && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Consentimentos</p>
            <ConsentRow
              label="Receber o Radar de oportunidades por WhatsApp"
              enabled={Boolean(consents.whatsappOptIn)}
            />
            <ConsentRow
              label="Permitir que recrutadores encontrem meu perfil"
              enabled={Boolean(consents.discoverableByRecruiters)}
            />
            <p className="text-xs text-muted-foreground">
              Você pode alterar esses consentimentos a qualquer momento nas
              permissões do seu perfil.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-sm font-medium">Consulta e portabilidade</p>
          <p className="text-sm text-muted-foreground">
            Baixe uma cópia em JSON com o seu perfil, suas candidaturas e, se
            houver, seus cursos e certificados.
          </p>
          <Button
            variant="outline"
            disabled={exportData.isPending}
            onClick={handleExport}
          >
            {exportData.isPending ? "Preparando..." : "Exportar meus dados"}
          </Button>
        </div>

        <div className="space-y-4 rounded-2xl border border-destructive/20 p-5">
          <div>
            <p className="text-sm font-medium text-destructive">
              Excluir minha conta
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Remove definitivamente sua conta, perfil, candidaturas e, se você
              for recrutador, as oportunidades publicadas. Fora do sistema,
              eliminamos o que pudermos dos seus registros segundo a LGPD.
            </p>
          </div>

          {!confirmOpen ? (
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(true)}
            >
              Solicitar exclusão da conta
            </Button>
          ) : (
            <div className="space-y-3">
              <Input
                value={confirmText}
                onChange={(event) => setConfirmText(event.target.value)}
                placeholder="Digite EXCLUIR para confirmar"
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="destructive"
                  disabled={deleteAccount.isPending}
                  onClick={handleDelete}
                >
                  {deleteAccount.isPending
                    ? "Excluindo..."
                    : "Excluir definitivamente"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setConfirmOpen(false);
                    setConfirmText("");
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}