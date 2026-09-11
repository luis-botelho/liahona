import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";

import {
  useCoursesQuery,
  useRecommendedCoursesQuery,
} from "../hooks/use-learning";
import type { CourseSummary, RecommendedCourse } from "../types/learning";

function SourceBadge({ source }: { source: "LIA" | "EXTERNAL" }) {
  return source === "LIA" ? (
    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
      Curso da LIA
    </span>
  ) : (
    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
      Curso externo
    </span>
  );
}

function LessonProgress({ course }: { course: CourseSummary }) {
  const { enrollment } = course;

  if (!enrollment) return null;

  const completed = enrollment.completedLessonIds.length;

  if (enrollment.status === "COMPLETED") {
    return (
      <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700">
        Concluído
      </span>
    );
  }

  return (
    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {completed}/{course.lessonCount} aulas
    </span>
  );
}

function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <Link to={`/learning/${course.id}`} className="block h-full rounded-2xl">
      <Card className="flex h-full flex-col text-left transition-colors hover:border-primary/40">
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <SourceBadge source={course.source} />
            <LessonProgress course={course} />
          </div>
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {course.provider}
            {course.category ? ` · ${course.category}` : ""}
          </p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4">
          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {course.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function RecommendedSection({ items }: { items: RecommendedCourse[] }) {
  if (items.length === 0) return null;

  const recommended = items.filter((item) => item.score > 0).slice(0, 3);

  if (recommended.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Recomendados para você</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Baseados nos seus interesses e habilidades que você ainda pode
          desenvolver.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border bg-card shadow-sm"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function LearningCatalogPage() {
  const { user } = useAuth();
  const courses = useCoursesQuery();
  const recommended = useRecommendedCoursesQuery();

  const showRecommended = user?.role === "WORKER" && recommended.isSuccess;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Aprender</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cursos gratuitos para desenvolver habilidades e melhorar seu perfil
          profissional.
        </p>
      </header>

      {showRecommended && (
        <div className="mb-10">
          <RecommendedSection items={recommended.data} />
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Todos os cursos</h2>
        {courses.isLoading && (
          <p className="text-sm text-muted-foreground">Carregando cursos...</p>
        )}
        {courses.isError && (
          <p className="text-sm text-destructive">
            Não foi possível carregar os cursos.
          </p>
        )}
        {courses.isSuccess && courses.data.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum curso disponível por enquanto.
          </p>
        )}
        {courses.isSuccess && courses.data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.data.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}