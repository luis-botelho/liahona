import { z } from "zod";

export const recruiterProfileSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2, "Informe o nome do comércio ou organização.")
    .max(120, "Nome muito longo."),
  whatsapp: z.string().trim().max(20, "WhatsApp deve ter no máximo 20 caracteres."),
  city: z.string().trim().max(80, "Cidade muito longa."),
  neighborhood: z.string().trim().max(80, "Bairro muito longo."),
  description: z.string().trim().max(500, "A descrição deve ter no máximo 500 caracteres."),
});

export type RecruiterProfileFormData = z.infer<typeof recruiterProfileSchema>;