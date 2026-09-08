export interface RecruiterProfile {
  id: string;
  userId: string;
  organizationName: string;
  whatsapp: string | null;
  city: string | null;
  neighborhood: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecruiterProfileInput {
  organizationName?: string;
  whatsapp?: string;
  city?: string;
  neighborhood?: string;
  description?: string;
}