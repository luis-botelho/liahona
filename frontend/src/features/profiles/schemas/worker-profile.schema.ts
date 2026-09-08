import { z } from "zod";

export const workerProfileSchema = z.object({
  whatsapp: z.string().trim().max(20, "WhatsApp deve ter no máximo 20 caracteres."),
  city: z.string().trim().max(80, "Cidade muito longa."),
  neighborhood: z.string().trim().max(80, "Bairro muito longo."),
  skillsText: z.string().trim().max(500, "Muitas habilidades. Separe por vírgulas."),
  interestsText: z.string().trim().max(500, "Muitos interesses. Separe por vírgulas."),
  bio: z.string().trim().max(500, "A bio deve ter no máximo 500 caracteres."),
  whatsappOptIn: z.boolean().optional(),
});

export type WorkerProfileFormData = z.infer<typeof workerProfileSchema>;