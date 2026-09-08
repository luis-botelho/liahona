import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpsertRecruiterProfileMutation } from "../hooks/use-recruiter-profile";
import {
  recruiterProfileSchema,
  type RecruiterProfileFormData,
} from "../schemas/recruiter-profile.schema";

interface RecruiterProfileFormProps {
  profile:
    | {
        organizationName?: string | null;
        whatsapp?: string | null;
        city?: string | null;
        neighborhood?: string | null;
        description?: string | null;
      }
    | null
    | undefined;
}

export function RecruiterProfileForm({ profile }: RecruiterProfileFormProps) {
  const mutation = useUpsertRecruiterProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecruiterProfileFormData>({
    resolver: zodResolver(recruiterProfileSchema),
    defaultValues: {
      organizationName: "",
      whatsapp: "",
      city: "",
      neighborhood: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      organizationName: profile.organizationName ?? "",
      whatsapp: profile.whatsapp ?? "",
      city: profile.city ?? "",
      neighborhood: profile.neighborhood ?? "",
      description: profile.description ?? "",
    });
  }, [profile, reset]);

  async function onSubmit(data: RecruiterProfileFormData) {
    try {
      await mutation.mutateAsync({
        organizationName: data.organizationName,
        whatsapp: data.whatsapp || undefined,
        city: data.city || undefined,
        neighborhood: data.neighborhood || undefined,
        description: data.description || undefined,
      });

      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Não foi possível salvar o perfil. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="organizationName">
          Nome do comércio / empresa / organização
        </Label>
        <Input
          id="organizationName"
          placeholder="Ex.: Padaria XYZ"
          {...register("organizationName")}
        />
        {errors.organizationName && (
          <p className="text-sm text-destructive">
            {errors.organizationName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          placeholder="Ex.: 5511988888888"
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
        <Label htmlFor="description">Descrição curta (opcional)</Label>
        <textarea
          id="description"
          rows={3}
          placeholder="O que sua organização faz?"
          className="w-full rounded-2xl border border-input bg-input/30 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar perfil"}
        </Button>
      </div>
    </form>
  );
}