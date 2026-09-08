import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpsertWorkerProfileMutation } from "../hooks/use-worker-profile";
import {
  workerProfileSchema,
  type WorkerProfileFormData,
} from "../schemas/worker-profile.schema";

interface WorkerProfileFormProps {
  profile:
    | {
        whatsapp?: string | null;
        city?: string | null;
        neighborhood?: string | null;
        bio?: string | null;
        skills?: string[];
        interests?: string[];
        whatsappOptIn?: boolean;
      }
    | null
    | undefined;
}

export function WorkerProfileForm({ profile }: WorkerProfileFormProps) {
  const mutation = useUpsertWorkerProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkerProfileFormData>({
    resolver: zodResolver(workerProfileSchema),
    defaultValues: {
      whatsapp: "",
      city: "",
      neighborhood: "",
      skillsText: "",
      interestsText: "",
      bio: "",
      whatsappOptIn: false,
    },
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      whatsapp: profile.whatsapp ?? "",
      city: profile.city ?? "",
      neighborhood: profile.neighborhood ?? "",
      skillsText: (profile.skills ?? []).join(", "),
      interestsText: (profile.interests ?? []).join(", "),
      bio: profile.bio ?? "",
      whatsappOptIn: profile.whatsappOptIn ?? false,
    });
  }, [profile, reset]);

  async function onSubmit(data: WorkerProfileFormData) {
    try {
      await mutation.mutateAsync({
        whatsapp: data.whatsapp || undefined,
        city: data.city || undefined,
        neighborhood: data.neighborhood || undefined,
        bio: data.bio || undefined,
        skills: data.skillsText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interests: data.interestsText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        whatsappOptIn: data.whatsappOptIn,
      });

      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Não foi possível salvar o perfil. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          placeholder="Ex.: 5511999999999"
          {...register("whatsapp")}
        />
        {errors.whatsapp && (
          <p className="text-sm text-destructive">{errors.whatsapp.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" placeholder="Ex.: Mambucaba" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro (opcional)</Label>
          <Input
            id="neighborhood"
            placeholder="Ex.: Centro"
            {...register("neighborhood")}
          />
          {errors.neighborhood && (
            <p className="text-sm text-destructive">
              {errors.neighborhood.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skillsText">Habilidades</Label>
        <Input
          id="skillsText"
          placeholder='Ex.: "atendimento, elétrica, estoque"'
          {...register("skillsText")}
        />
        <p className="text-xs text-muted-foreground">
          Separe por vírgulas. Ex.: atendimento, caixa, vendas
        </p>
        {errors.skillsText && (
          <p className="text-sm text-destructive">
            {errors.skillsText.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="interestsText">Áreas de interesse</Label>
        <Input
          id="interestsText"
          placeholder='Ex.: "vendas, serviços, logística"'
          {...register("interestsText")}
        />
        <p className="text-xs text-muted-foreground">
          Separe por vírgulas. Ex.: vendas, atendimento
        </p>
        {errors.interestsText && (
          <p className="text-sm text-destructive">
            {errors.interestsText.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Mini bio (opcional)</Label>
        <textarea
          id="bio"
          rows={3}
          placeholder="Conte um pouco sobre você"
          className="w-full rounded-2xl border border-input bg-input/30 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-sm text-destructive">{errors.bio.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border p-4">
        <input
          id="whatsappOptIn"
          type="checkbox"
          className="mt-0.5 size-4 accent-primary"
          {...register("whatsappOptIn")}
        />
        <Label htmlFor="whatsappOptIn">
          Quero receber oportunidades pelo WhatsApp
        </Label>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar perfil"}
        </Button>
      </div>
    </form>
  );
}