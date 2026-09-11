import { api } from "@/services/api";

function extractFilename(contentDisposition: string | undefined): string | null {
  if (!contentDisposition) return null;

  const match = /filename="?([^";]+)"?/.exec(contentDisposition);

  return match?.[1] ?? null;
}

export async function downloadResumePdf(opportunityId?: string): Promise<void> {
  const response = await api.get("/resume", {
    params: opportunityId ? { opportunityId } : undefined,
    responseType: "blob",
  });

  const filename =
    extractFilename(response.headers["content-disposition"]) ??
    "curriculo-lia.pdf";

  const url = URL.createObjectURL(response.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}