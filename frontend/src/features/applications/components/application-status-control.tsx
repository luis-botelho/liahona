import { toast } from "sonner";

import { useUpdateApplicationStatusMutation } from "../hooks/use-applications";
import {
  APPLICATION_STATUS_LABELS,
  RECRUITER_SETTABLE_STATUSES,
  type ApplicationStatus,
} from "../types/application";

interface ApplicationStatusControlProps {
  applicationId: string;
  currentStatus: ApplicationStatus;
}

export function ApplicationStatusControl({
  applicationId,
  currentStatus,
}: ApplicationStatusControlProps) {
  const mutation = useUpdateApplicationStatusMutation();

  if (currentStatus === "WITHDRAWN") return null;

  async function handleChange(status: ApplicationStatus) {
    try {
      await mutation.mutateAsync({ id: applicationId, status });
      toast.success(`Candidatura movida para "${APPLICATION_STATUS_LABELS[status]}".`);
    } catch {
      toast.error("Não foi possível atualizar o status. Tente novamente.");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        disabled={mutation.isPending}
        onChange={(event) => handleChange(event.target.value as ApplicationStatus)}
        className="rounded-xl border border-input bg-input/30 px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
      >
        <option value={currentStatus}>
          {APPLICATION_STATUS_LABELS[currentStatus]}
        </option>
        {RECRUITER_SETTABLE_STATUSES.map((status) => (
          <option key={status} value={status}>
            {APPLICATION_STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </div>
  );
}