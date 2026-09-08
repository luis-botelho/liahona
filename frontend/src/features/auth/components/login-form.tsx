import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../hooks/use-login-mutation";

import { toast } from "sonner";

import {
    loginSchema,
    type LoginSchema,
} from "../schemas/login.schema";

import { useAuth } from "../hooks/use-auth";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const loginMutation = useLoginMutation();
    const { login } = useAuth();
    const navigate = useNavigate();
    async function onSubmit(data: LoginSchema) {
        try {
            const response = await loginMutation.mutateAsync(data);

            login(response)
            toast.success("Login realizado com sucesso!");
            navigate("/dashboard");
        } catch {
            toast.error("E-mail ou senha inválidos.");
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6" noValidate
        >
            <div className="space-y-2">
                <Label htmlFor="email">
                    E-mail
                </Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    {...register("email")}
                />
                {
                    errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email.message}
                        </p>
                    )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">
                    Senha
                </Label>

                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}

                />
                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
        </form>

    );
}


