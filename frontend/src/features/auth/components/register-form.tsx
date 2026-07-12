import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registerSchema, type RegisterSchema } from "../schemas/register.schema";
import { useRegisterMutation } from "../hooks/use-register-mutation";

export function RegisterForm() {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const mutation = useRegisterMutation(() => reset());

    function onSubmit(data: RegisterSchema) {
        mutation.mutate({
            name: data.name,
            email: data.email,
            password: data.password,
        });
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Criar conta</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                        <Label htmlFor="password">
                            Senha
                        </Label>

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
                        <Label htmlFor="confirmPassword">
                            Confirmar senha
                        </Label>

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