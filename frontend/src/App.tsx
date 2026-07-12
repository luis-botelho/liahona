import { Toaster } from "@/components/ui/sonner";
import { RegisterPage } from "./features/auth/pages/register.page";

export default function App() {
  return (
    <>
      <RegisterPage />
      <Toaster richColors position="top-right" />
    </>
  );
}