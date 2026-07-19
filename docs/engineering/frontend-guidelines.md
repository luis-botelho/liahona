# Frontend Guidelines

- **Framework:** React 19 / Vite
- **Linguagem:** TypeScript
- **Roteamento:**
  <!-- DECISÃO PENDENTE: Nenhuma biblioteca de roteamento está instalada.
       Ver knowledge-gaps.md para registro da pendência. -->
  - Biblioteca: `react-router-dom` (planejado, **ainda não instalado**)
  - Caminho Absoluto do Router: `/home/botelho/Documents/GitHub/liahona/frontend/src/app/routes.tsx` (planejado)
  - Estratégia e Organização: Roteamento declarativo configurado via `createBrowserRouter`. Divisão em rotas públicas (livre acesso) e rotas protegidas (envolvidas por um componente Guard que valida o token).
- **HTTP:**
  - Biblioteca: Axios
  - Caminho Absoluto: `/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts`
  - Local de Interceptors: `/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts`
  - Local de Endpoints: Arquivos `.service.ts` dentro de cada feature, ex: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/services/auth.service.ts`
- **Gerenciamento de Estado:**
  - Biblioteca: TanStack Query (React Query)
  - Regra Estrita - Quando usar:
    - Estado vindo de requisições de rede (servidor).
    - Cacheamento automático de dados.
    - Sincronização de dados em background e retries automáticos.
    - Ações de criação/edição/deleção que causam invalidação de cache (mutations).
  - Regra Estrita - Quando NÃO usar:
    - Estado puramente de interface (modal aberto, item selecionado, filtros de busca transitórios). Usar `useState` do React.
    - Estado de configuração da aplicação que não envolva a API (tema escuro/claro, sidebar minimizada). Usar React Context ou Zustand.
- **Formulários:**
  - Biblioteca: React Hook Form + Zod (`@hookform/resolvers/zod`).
  - Snippet Exato de Exemplo (Baseado no repositório em `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/components/login-form.tsx`):
    ```tsx
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { loginSchema, type LoginSchema } from "../schemas/login.schema";
    import { useLoginMutation } from "../hooks/use-login-mutation";

    export function LoginForm() {
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<LoginSchema>({
            resolver: zodResolver(loginSchema),
        });
        const loginMutation = useLoginMutation();

        async function onSubmit(data: LoginSchema) {
            await loginMutation.mutateAsync(data);
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="password" {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Entrando..." : "Entrar"}
                </button>
            </form>
        );
    }
    ```
- **Estrutura de Pastas:**
  ```text
  /home/botelho/Documents/GitHub/liahona/frontend/src/
  ├── app/                  # Provedores de estado e arquivo de rotas globais
  ├── components/           # Componentes genéricos de UI reutilizáveis (ex: shadcn)
  ├── features/             # Funcionalidades e fluxos agrupados por domínio
  │   └── auth/             # Módulo de Autenticação
  │       ├── components/   # Componentes visuais locais do fluxo
  │       ├── hooks/        # Hooks Customizados / Mutations do TanStack Query
  │       ├── pages/        # Páginas visíveis do fluxo de auth
  │       ├── schemas/      # Esquemas de validação do Zod
  │       ├── services/     # Serviços de chamadas HTTP específicos
  │       └── types/        # Definições de tipo para o fluxo de autenticação
  ├── lib/                  # Código e utilitários de terceiros (ex: cn helper)
  ├── providers/            # Instanciação global de Provedores (ex: queryClient)
  └── services/             # Instanciação do Axios e configurações globais HTTP
  ```
