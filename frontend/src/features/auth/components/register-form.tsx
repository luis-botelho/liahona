import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import { useRegisterMutation } from "../hooks/use-register-mutation";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "WORKER" },
  });

  const mutation = useRegisterMutation(() => reset());

  function onSubmit(data: RegisterSchema) {
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>

            <Input
              id="name"
              autoComplete="name"
              placeholder="Seu nome"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="voce@email.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-foreground">
                O que você quer fazer no LIA?
              </legend>
              <div className="grid gap-3">
                <label className="flex cursor-pointer gap-3 rounded-2xl border p-4 text-left has-checked:border-primary has-checked:bg-secondary/60">
                  <input
                    type="radio"
                    value="WORKER"
                    className="mt-1"
                    {...register("role")}
                  />
                  <span>
                    <strong className="block text-sm text-foreground">
                      🔎 Encontrar trabalho e oportunidades
                    </strong>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      Quero encontrar vagas, bicos e oportunidades na região.
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer gap-3 rounded-2xl border p-4 text-left has-checked:border-primary has-checked:bg-secondary/60">
                  <input
                    type="radio"
                    value="RECRUITER"
                    className="mt-1"
                    {...register("role")}
                  />
                  <span>
                    <strong className="block text-sm text-foreground">
                      🏢 Contratar pessoas
                    </strong>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      Quero publicar oportunidades e encontrar pessoas para
                      trabalhar.
                    </span>
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.role.message}
                </p>
              )}
            </fieldset>
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>

            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="********"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar senha</Label>

            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="********"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
