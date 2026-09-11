import { z } from "zod";

export const workerProfileSchema = z.object({
  professionalTitle: z
    .string()
    .trim()
    .max(100, "O cargo deve ter no máximo 100 caracteres."),
  whatsapp: z.string().trim().max(20, "WhatsApp deve ter no máximo 20 caracteres."),
  city: z.string().trim().max(80, "Cidade muito longa."),
  neighborhood: z.string().trim().max(80, "Bairro muito longo."),
  skillsText: z.string().trim().max(500, "Muitas habilidades. Separe por vírgulas."),
  interestsText: z.string().trim().max(500, "Muitos interesses. Separe por vírgulas."),
  desiredRolesText: z
    .string()
    .trim()
    .max(500, "Muitos cargos desejados. Separe por vírgulas."),
  workPreferencesText: z
    .string()
    .trim()
    .max(500, "Muitas preferências. Separe por vírgulas."),
  bio: z.string().trim().max(500, "A bio deve ter no máximo 500 caracteres."),
  availability: z.string().trim().max(40, "Disponibilidade muito longa."),
  discoverableByRecruiters: z.boolean().optional(),
  whatsappOptIn: z.boolean().optional(),
});

export type WorkerProfileFormData = z.infer<typeof workerProfileSchema>;