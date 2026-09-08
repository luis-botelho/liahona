export interface MatchableOpportunity {
  category?: string | null;
  tags: string[];
  location?: string | null;
}

export interface MatchableWorkerProfile {
  skills: string[];
  interests: string[];
  city?: string | null;
}

export interface MatchResult {
  matchScore: number;
  matchReasons: string[];
}

export function normalizeTag(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeTags(values: string[]): string[] {
  return [...new Set(values.map(normalizeTag).filter(Boolean))];
}

function locationMatches(workerCity: string, opportunityLocation: string): boolean {
  const a = normalizeTag(workerCity);
  const b = normalizeTag(opportunityLocation);

  if (!a || !b) return false;

  return a === b || a.includes(b) || b.includes(a);
}

export function scoreOpportunity(
  opportunity: MatchableOpportunity,
  profile: MatchableWorkerProfile,
): MatchResult {
  const matchReasons: string[] = [];
  let matchScore = 0;

  const workerCity = profile.city?.trim();
  const oppLocation = opportunity.location?.trim();

  if (workerCity && oppLocation && locationMatches(workerCity, oppLocation)) {
    matchScore += 40;
    matchReasons.push('Localização compatível');
  }

  const opportunityTags = normalizeTags(opportunity.tags ?? []);
  const workerSkills = normalizeTags(profile.skills ?? []);
  const matchedSkill = workerSkills.find((skill) =>
    opportunityTags.includes(skill),
  );

  if (matchedSkill) {
    matchScore += 40;
    matchReasons.push(`Habilidade: ${matchedSkill}`);
  }

  const workerInterests = normalizeTags(profile.interests ?? []);
  const categoryTag = normalizeTag(opportunity.category ?? '');

  const matchedInterest = workerInterests.find(
    (interest) =>
      opportunityTags.includes(interest) || (categoryTag && interest === categoryTag),
  );

  if (matchedInterest) {
    matchScore += 20;
    matchReasons.push(`Interesse: ${matchedInterest}`);
  }

  return { matchScore, matchReasons };
}