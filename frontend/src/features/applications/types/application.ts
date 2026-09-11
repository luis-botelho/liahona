export type ApplicationStatus =
  | "APPLIED"
  | "REVIEWING"
  | "INTERVIEW"
  | "APPROVED"
  | "REJECTED"
  | "WITHDRAWN";

export const RECRUITER_SETTABLE_STATUSES: readonly ApplicationStatus[] = [
  "REVIEWING",
  "INTERVIEW",
  "APPROVED",
  "REJECTED",
];

export interface WorkerApplication {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  opportunity: {
    id: string;
    title: string;
    type: "JOB" | "SERVICE";
    status: "ACTIVE" | "CLOSED";
    location: string | null;
    category: string | null;
    createdAt: string;
    author: {
      name: string;
    };
  };
}

export interface ApplicationStatusUpdate {
  id: string;
  status: ApplicationStatus;
  updatedAt: string;
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Interesse enviado",
  REVIEWING: "Em análise",
  INTERVIEW: "Entrevista",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
  WITHDRAWN: "Retirado",
};