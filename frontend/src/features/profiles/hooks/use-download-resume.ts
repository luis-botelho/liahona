import { useMutation } from "@tanstack/react-query";

import { downloadResumePdf } from "../services/resume.service";

export function useDownloadResumeMutation() {
  return useMutation({
    mutationFn: (opportunityId?: string) => downloadResumePdf(opportunityId),
  });
}