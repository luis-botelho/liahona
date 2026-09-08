import { Link, useSearchParams } from "react-router-dom";

import { getSafeReturnTo, buildReturnToHref } from "@/lib/return-to";
import { RegisterForm } from "../components/register-form";

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const returnTo = getSafeReturnTo(searchParams.get("returnTo"));
  const loginHref = buildReturnToHref("/login", returnTo);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <RegisterForm returnTo={returnTo} />

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link
            to={loginHref}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}