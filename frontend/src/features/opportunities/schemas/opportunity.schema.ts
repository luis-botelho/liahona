import { z } from "zod";

export const opportunitySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Informe um título com pelo menos 3 caracteres.")
    .max(120, "O título deve ter no máximo 120 caracteres."),
  description: z
    .string()
    .trim()
    .min(10, "Descreva a oportunidade em pelo menos 10 caracteres.")
    .max(2000, "A descrição deve ter no máximo 2000 caracteres."),
  type: z.enum(["JOB", "SERVICE"], {
    error: "Selecione o tipo da oportunidade.",
  }),
  location: z
    .string()
    .trim()
    .max(120, "A localização deve ter no máximo 120 caracteres."),
});

export type OpportunityFormData = z.infer<typeof opportunitySchema>;
