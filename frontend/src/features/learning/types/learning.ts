export type CourseSource = "LIA" | "EXTERNAL";
export type CourseEnrollmentStatus = "IN_PROGRESS" | "COMPLETED";

export interface CourseEnrollment {
  id: string;
  courseId: string;
  workerId: string;
  completedLessonIds: string[];
  status: CourseEnrollmentStatus;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  orderIndex: number;
}

export interface CourseSummary {
  id: string;
  title: string;
  description: string;
  category: string | null;
  skills: string[];
  provider: string | null;
  externalUrl: string | null;
  source: CourseSource;
  createdAt: string;
  lessonCount: number;
  enrollment: CourseEnrollment | null;
}

export interface RecommendedCourse extends CourseSummary {
  score: number;
  reasons: string[];
}

export interface CourseDetail extends CourseSummary {
  lessons: Lesson[];
  enrollment: CourseEnrollment | null;
  certificate: Certificate | null;
}

export interface Certificate {
  id: string;
  code: string;
  courseId: string;
  workerId: string;
  issuedAt: string;
  course: {
    id: string;
    title: string;
    provider: string | null;
    category: string | null;
  };
  worker: {
    name: string;
  };
}

export interface MyEnrollment {
  id: string;
  status: CourseEnrollmentStatus;
  completedLessonIds: string[];
  completedAt: string | null;
  updatedAt: string;
  course: {
    id: string;
    title: string;
    description: string;
    category: string | null;
    skills: string[];
    provider: string | null;
    source: CourseSource;
    lessons: Lesson[];
  };
}

export interface MyLearning {
  enrollments: MyEnrollment[];
  certificates: Certificate[];
}