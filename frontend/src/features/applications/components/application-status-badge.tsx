import { cn } from "@/lib/utils";

import {
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "../types/application";

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  APPLIED: "bg-secondary text-secondary-foreground",
  REVIEWING: "bg-blue-100 text-blue-800",
  INTERVIEW: "bg-violet-100 text-violet-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  WITHDRAWN: "bg-muted text-muted-foreground",
};

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function ApplicationStatusBadge({
  status,
  className,
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        STATUS_STYLES[status],
        className,
      )}
    >
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}