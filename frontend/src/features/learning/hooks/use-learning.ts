import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  completeCourseLesson,
  enrollInCourse,
  getCertificate,
  getCourse,
  getCourses,
  getMyLearning,
  getRecommendedCourses,
} from "../services/learning.service";

export const coursesQueryKey = ["courses"] as const;
export const myLearningQueryKey = ["learning", "mine"] as const;

export function useCoursesQuery() {
  return useQuery({
    queryKey: coursesQueryKey,
    queryFn: getCourses,
  });
}

export function useRecommendedCoursesQuery() {
  return useQuery({
    queryKey: ["learning", "recommended"],
    queryFn: getRecommendedCourses,
  });
}

export function useCourseQuery(id: string) {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => getCourse(id),
    enabled: Boolean(id),
  });
}

export function useMyLearningQuery() {
  return useQuery({
    queryKey: myLearningQueryKey,
    queryFn: getMyLearning,
  });
}

export function useCertificateQuery(code: string) {
  return useQuery({
    queryKey: ["certificates", code],
    queryFn: () => getCertificate(code),
    enabled: Boolean(code),
  });
}

export function useEnrollInCourseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInCourse,
    onSuccess: (_data, courseId) => {
      void queryClient.invalidateQueries({ queryKey: coursesQueryKey });
      void queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
      void queryClient.invalidateQueries({ queryKey: myLearningQueryKey });
    },
  });
}

export function useCompleteLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, lessonId }: { courseId: string; lessonId: string }) =>
      completeCourseLesson(courseId, lessonId),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["courses", variables.courseId] });
      void queryClient.invalidateQueries({ queryKey: myLearningQueryKey });
    },
  });
}