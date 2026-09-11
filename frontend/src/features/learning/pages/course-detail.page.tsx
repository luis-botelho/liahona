import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";

import {
  useCompleteLessonMutation,
  useCourseQuery,
  useEnrollInCourseMutation,
} from "../hooks/use-learning";

export function CourseDetailPage() {
  const { id = "" } = useParams();
  const { user } = useAuth();
  const course = useCourseQuery(id);
  const enroll = useEnrollInCourseMutation();
  const completeLesson = useCompleteLessonMutation();
  const [workingLessonId, setWorkingLessonId] = useState<string | null>(null);

  const isWorker = user?.role === "WORKER";
  const data = course.data;

  async function handleEnroll() {
    try {
      await enroll.mutateAsync(id);
      toast.success("Matrícula realizada! Boa aula.");
    } catch {
      toast.error("Não foi possível se matricular. Tente novamente.");
    }
  }

  async function handleCompleteLesson(lessonId: string) {
    setWorkingLessonId(lessonId);

    try {
      await completeLesson.mutateAsync({ courseId: id, lessonId });
      toast.success("Aula concluída!");
    } catch {
      toast.error("Não foi possível concluir a aula.");
    } finally {
      setWorkingLessonId(null);
    }
  }

  if (course.isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm text-muted-foreground">Carregando curso...</p>
      </div>
    );
  }

  if (course.isError || !data) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-sm text-destructive">
          Não foi possível carregar o curso.
        </p>
        <Link to="/learning" className="mt-4 inline-block">
          <Button variant="outline">Voltar para Aprender</Button>
        </Link>
      </div>
    );
  }

  const completedLessonIds = data.enrollment?.completedLessonIds ?? [];
  const isCompleted = data.enrollment?.status === "COMPLETED";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Link
        to="/learning"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        &larr; Voltar para Aprender
      </Link>

      <header className="mt-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {data.source === "LIA" ? "Curso da LIA" : "Curso externo"}
          </span>
          {data.category && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {data.category}
            </span>
          )}
          {isCompleted && (
            <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700">
              Concluído
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>

        <p className="text-sm text-muted-foreground">
          {data.provider}
          {data.lessonCount > 0 ? ` · ${data.lessonCount} aulas` : ""}
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          {data.description}
        </p>

        {data.externalUrl && (
          <p>
            <a
              href={data.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary underline underline-offset-4"
            >
              Abrir curso no site do provedor
            </a>
          </p>
        )}
      </header>

      {isCompleted && isWorker && (
        <Card className="mt-8 border-emerald-600/30 bg-emerald-600/5">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 py-5">
            <div>
              <p className="font-semibold text-emerald-800">
                Parabéns pela conclusão!
              </p>
              <p className="text-sm text-muted-foreground">
                Seu certificado já está disponível.
              </p>
            </div>
            {data.certificate && (
              <Link to={`/certificates/${data.certificate.code}`}>
                <Button>Ver certificado</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Conteúdo do curso</h2>

          {isWorker && !data.enrollment && (
            <Button onClick={handleEnroll} disabled={enroll.isPending}>
              {enroll.isPending ? "Matriculando..." : "Matricular-se"}
            </Button>
          )}
        </div>

        {data.enrollment && (
          <p className="mt-2 text-sm text-muted-foreground">
            {completedLessonIds.length} de {data.lessons.length} aulas
            concluídas
          </p>
        )}

        <div className="mt-4 space-y-3">
          {data.lessons.map((lesson, index) => {
            const completed = completedLessonIds.includes(lesson.id);
            const busy = workingLessonId === lesson.id;

            return (
              <Card
                key={lesson.id}
                className={completed ? "border-muted bg-muted/40" : ""}
              >
                <CardHeader className="py-4">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                      {index + 1}
                    </span>
                    <span>{lesson.title}</span>
                  </CardTitle>

                  {isWorker && data.enrollment && !completed && (
                    <CardAction>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={busy}
                        onClick={() => handleCompleteLesson(lesson.id)}
                      >
                        {busy ? "Concluindo..." : "Concluir aula"}
                      </Button>
                    </CardAction>
                  )}

                  {completed && (
                    <CardAction>
                      <span className="text-sm font-medium text-emerald-700">
                        ✓ Concluída
                      </span>
                    </CardAction>
                  )}
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {!isWorker && (
          <p className="mt-6 text-sm text-muted-foreground">
            Trabalhadores logados podem se matricular e acompanhar o progresso.
          </p>
        )}
      </section>
    </div>
  );
}