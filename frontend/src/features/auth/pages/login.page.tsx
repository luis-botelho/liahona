import { Link, useSearchParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSafeReturnTo, buildReturnToHref } from "@/lib/return-to";
import { LoginForm } from "../components/login-form";

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const returnTo = getSafeReturnTo(searchParams.get("returnTo"));
  const registerHref = buildReturnToHref("/register", returnTo);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Entrar no LIA
          </CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm returnTo={returnTo} />

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link
              to={registerHref}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Criar perfil
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}