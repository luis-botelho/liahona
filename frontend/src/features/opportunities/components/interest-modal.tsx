import { Button } from "@/components/ui/button";

interface InterestModalProps {
  opportunityTitle: string;
  whatsappHref: string | null;
  onWhatsApp: () => void;
  onLia: () => void;
  onClose: () => void;
}

export function InterestModal({
  opportunityTitle,
  whatsappHref,
  onWhatsApp,
  onLia,
  onClose,
}: InterestModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Como você quer continuar?"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-semibold tracking-tight">
          Como você quer continuar?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {opportunityTitle}
        </p>

        <div className="mt-6 grid gap-3">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={onWhatsApp}
              className="rounded-2xl border p-4 text-left transition-colors hover:bg-secondary/50"
            >
              <strong className="block text-sm text-foreground">
                💬 Conversar pelo WhatsApp
              </strong>
              <span className="mt-1 block text-sm text-muted-foreground">
                Fale diretamente com o responsável. Você não precisa criar uma
                conta.
              </span>
            </a>
          ) : (
            <p className="rounded-2xl border p-4 text-sm text-muted-foreground">
              Contato pelo WhatsApp não disponível para esta oportunidade.
            </p>
          )}

          <button
            type="button"
            onClick={onLia}
            className="rounded-2xl border p-4 text-left transition-colors hover:bg-secondary/50"
          >
            <strong className="block text-sm text-foreground">
              ✨ Candidatar-me pelo LIA
            </strong>
            <span className="mt-1 block text-sm text-muted-foreground">
              Use seu perfil profissional, acompanhe sua candidatura e receba
              oportunidades compatíveis.
            </span>
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}