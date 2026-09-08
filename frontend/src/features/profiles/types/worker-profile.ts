export interface WorkerProfile {
  id: string;
  userId: string;
  whatsapp: string | null;
  city: string | null;
  neighborhood: string | null;
  bio: string | null;
  skills: string[];
  interests: string[];
  whatsappOptIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkerProfileInput {
  whatsapp?: string;
  city?: string;
  neighborhood?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  whatsappOptIn?: boolean;
}