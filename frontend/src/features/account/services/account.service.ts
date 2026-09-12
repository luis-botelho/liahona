import { api } from "@/services/api";

interface ApiResponse<T> {
  success: true;
  data: T;
}

export async function exportMyData(): Promise<void> {
  const response = await api.get<ApiResponse<Record<string, unknown>>>(
    "/account/data",
  );

  const blob = new Blob([JSON.stringify(response.data.data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "meus-dados-lia.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function deleteMyAccount(): Promise<void> {
  await api.post("/account/delete");
}