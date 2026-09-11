export function normalizeFriendlyList(values: string[]): string[] {
  const seen = new Set<string>();

  return values
    .map((value) => value.trim().replace(/\s+/g, ' '))
    .filter((value) => {
      if (!value) return false;

      const key = value.toLowerCase();

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
}

export interface WorkerProfileCompletionInput {
  professionalTitle?: string | null;
  city?: string | null;
  skills?: string[];
  desiredRoles?: string[];
  whatsapp?: string | null;
}

export interface WorkerProfileCompletion {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
}

const COMPLETION_FIELDS: ReadonlyArray<keyof WorkerProfileCompletionInput> = [
  'professionalTitle',
  'city',
  'skills',
  'desiredRoles',
  'whatsapp',
];

export function computeWorkerProfileCompletion(
  profile: WorkerProfileCompletionInput,
): WorkerProfileCompletion {
  const checks: Record<string, boolean> = {
    professionalTitle: Boolean(profile.professionalTitle?.trim()),
    city: Boolean(profile.city?.trim()),
    skills: Boolean(profile.skills?.length),
    desiredRoles: Boolean(profile.desiredRoles?.length),
    whatsapp: Boolean(profile.whatsapp?.trim()),
  };

  const missingFields = COMPLETION_FIELDS.filter(
    (field) => !checks[field],
  ) as string[];

  const completedFields = COMPLETION_FIELDS.length - missingFields.length;

  return {
    isComplete: missingFields.length === 0,
    completionPercentage: Math.round(
      (completedFields / COMPLETION_FIELDS.length) * 100,
    ),
    missingFields,
  };
}