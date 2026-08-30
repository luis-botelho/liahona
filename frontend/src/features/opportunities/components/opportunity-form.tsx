import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateOpportunityMutation } from "../hooks/use-create-opportunity-mutation";
import {
  opportunitySchema,
  type OpportunityFormData,
} from "../schemas/opportunity.schema";

export function OpportunityForm() {
  const navigate = useNavigate();
  const mutation = useCreateOpportunityMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: { type: "JOB", location: "" },
  });

  async function onSubmit(data: OpportunityFormData) {
    try {
      await mutation.mutateAsync({
        ...data,
        location: data.location || undefined,
      });
      toast.success("Oportunidade publicada com sucesso!");
      navigate("/dashboard");
    } catch {
      toast.error("Não foi possível publicar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" placeholder="Ex.: Desenvolvedor React" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <textarea
          id="description"
          rows={6}
          placeholder="Conte os detalhes da oportunidade"
          className="w-full rounded-2xl border border-input bg-input/30 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          {...register("description")}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <select
          id="type"
          className="h-9 w-full rounded-4xl border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          {...register("type")}
        >
          <option value="JOB">Trabalho</option>
          <option value="SERVICE">Serviço</option>
        </select>
        {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localização (opcional)</Label>
        <Input id="location" placeholder="Ex.: São Paulo, SP ou Remoto" {...register("location")} />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Publicando..." : "Publicar oportunidade"}
        </Button>
      </div>
    </form>
  );
}
