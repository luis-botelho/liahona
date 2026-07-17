import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "../components/login-form";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Entrar no LIA
          </CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm/>
        </CardContent>
      </Card>
    </main>
  );
}