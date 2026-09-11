export interface WorkerProfile {
  id: string;
  userId: string;
  whatsapp: string | null;
  city: string | null;
  neighborhood: string | null;
  bio: string | null;
  skills: string[];
  interests: string[];
  professionalTitle: string | null;
  availability: string | null;
  desiredRoles: string[];
  workPreferences: string[];
  discoverableByRecruiters: boolean;
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
  professionalTitle?: string;
  availability?: string;
  desiredRoles?: string[];
  workPreferences?: string[];
  discoverableByRecruiters?: boolean;
  whatsappOptIn?: boolean;
}

export interface WorkerProfileCompletion {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
}

export interface WorkerProfileResponse {
  profile: WorkerProfile | null;
  completion: WorkerProfileCompletion;
}