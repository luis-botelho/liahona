export const APPLICATION_STATUSES = [
  'APPLIED',
  'REVIEWING',
  'INTERVIEW',
  'APPROVED',
  'REJECTED',
  'WITHDRAWN',
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const RECRUITER_SETTABLE_STATUSES: readonly ApplicationStatus[] = [
  'REVIEWING',
  'INTERVIEW',
  'APPROVED',
  'REJECTED',
];

export const WORKER_SETTABLE_STATUSES: readonly ApplicationStatus[] = [
  'WITHDRAWN',
];

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return (APPLICATION_STATUSES as readonly string[]).includes(value);
}

export function canRecruiterSetStatus(status: string): boolean {
  return (RECRUITER_SETTABLE_STATUSES as readonly string[]).includes(status);
}

export function canWorkerSetStatus(status: string): boolean {
  return (WORKER_SETTABLE_STATUSES as readonly string[]).includes(status);
}

export function isTerminalStatus(status: ApplicationStatus): boolean {
  return status === 'APPROVED' || status === 'REJECTED' || status === 'WITHDRAWN';
}