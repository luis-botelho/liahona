export interface RecommendableCourse {
  category?: string | null;
  skills: string[];
}

export interface RecommendableWorkerProfile {
  interests: string[];
  skills: string[];
}

export interface CourseRecommendation {
  score: number;
  reasons: string[];
}

export function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function scoreCourse(
  profile: RecommendableWorkerProfile,
  course: RecommendableCourse,
): CourseRecommendation {
  const interests = [...new Set(profile.interests.map(normalize).filter(Boolean))];
  const hasSkill = new Set(profile.skills.map(normalize));
  const courseSkills = [...new Set(course.skills.map(normalize).filter(Boolean))];

  let score = 0;
  const reasons: string[] = [];

  for (const skill of courseSkills) {
    if (interests.includes(skill)) {
      score += 50;
      reasons.push(`Interesse: ${skill}`);
    }

    if (!hasSkill.has(skill)) {
      reasons.push(`Desenvolva a habilidade: ${skill}`);
    }
  }

  const category = normalize(course.category ?? '');

  if (category && interests.includes(category)) {
    score += 40;
    reasons.push(`Área de interesse: ${category}`);
  }

  return { score, reasons };
}