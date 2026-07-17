import { Toaster } from "@/components/ui/sonner";
// import { RegisterPage } from "./features/auth/pages/register.page";
import { LoginPage } from "./features/auth/pages/LoginPage";

export default function App() {
  return (
    <>
      {/* <RegisterPage /> */}
      <LoginPage/>
      <Toaster richColors position="top-right" />
    </>
  );
}