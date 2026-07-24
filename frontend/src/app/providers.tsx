import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { queryClient } from "../providers/query-client";
import { AuthProvider } from "../contexts/auth-context";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>

      <Toaster
        richColors
        position="top-right"
      />
    </QueryClientProvider>
  );
}