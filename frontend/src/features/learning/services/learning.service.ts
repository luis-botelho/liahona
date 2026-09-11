import { api } from "@/services/api";

import type {
  Certificate,
  CourseDetail,
  CourseEnrollment,
  CourseSummary,
  MyLearning,
  RecommendedCourse,
} from "../types/learning";

interface ApiResponse<T> {
  success: true;
  data: T;
}

export async function getCourses() {
  const response = await api.get<ApiResponse<CourseSummary[]>>("/courses");

  return response.data.data;
}

export async function getRecommendedCourses() {
  const response = await api.get<ApiResponse<RecommendedCourse[]>>(
    "/learning/recommended",
  );

  return response.data.data;
}

export async function getCourse(id: string) {
  const response = await api.get<ApiResponse<CourseDetail>>(`/courses/${id}`);

  return response.data.data;
}

export async function getMyLearning() {
  const response = await api.get<ApiResponse<MyLearning>>("/learning/mine");

  return response.data.data;
}

export async function enrollInCourse(id: string) {
  const response = await api.post<ApiResponse<CourseEnrollment>>(
    `/courses/${id}/enroll`,
  );

  return response.data.data;
}

export async function completeCourseLesson(
  courseId: string,
  lessonId: string,
) {
  const response = await api.post<
    ApiResponse<{
      enrollment: CourseEnrollment;
      certificate: Certificate | null;
      lessonCompleted: boolean;
    }>
  >(`/courses/${courseId}/lessons/${lessonId}/complete`);

  return response.data.data;
}

export async function getCertificate(code: string) {
  const response = await api.get<ApiResponse<Certificate>>(
    `/certificates/${code}`,
  );

  return response.data.data;
}