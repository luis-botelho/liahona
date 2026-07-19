# Frontend Architecture — Data Flow

## Fluxo de Vida do Dado (Lifecycle)

O fluxo de dados no frontend do LIA segue estritamente a sequência abaixo:

`Page -> Form -> Zod Validation -> HTTP Client -> Backend -> Response -> TanStack Query -> UI Update`

1. **Page:** O componente de página (ex: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/pages/LoginPage.tsx`) serve como container de renderização e injeta dependências no formulário.
2. **Form:** O usuário preenche e interage com os campos no componente de formulário (ex: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/components/login-form.tsx`) controlado via `react-hook-form`.
3. **Zod Validation:** No momento do envio (submit), o `zodResolver` intercepta os dados e valida contra o schema do Zod (ex: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/schemas/login.schema.ts`).
   - Se inválido: O fluxo é interrompido e a UI renderiza erros de validação nos inputs.
   - Se válido: Os dados são repassados ao handler de submissão do formulário.
4. **HTTP Client:** O formulário chama a mutação (`mutate` ou `mutateAsync`) do TanStack Query, que invoca o serviço HTTP (ex: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/services/auth.service.ts`), chamando o cliente Axios (`/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts`).
5. **Backend:** O cliente HTTP Axios executa a chamada contra os endpoints HTTP do servidor rodando na porta `3333`.
6. **Response:** A API do backend processa a operação e devolve um payload estruturado (ex: status code 200 ou status de erro).
7. **TanStack Query:** O hook do TanStack Query (ex: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/hooks/use-login-mutation.ts`) captura o retorno da requisição e executa os callbacks correspondentes (`onSuccess` ou `onError`).
8. **UI Update:** O estado do TanStack Query muda (`isPending`, `isSuccess`, `data`, `error`), forçando a re-renderização da interface para apresentar feedback visual (ex: toasts da biblioteca `sonner`, desabilitar botões, redirecionar rotas).

---

## Regras de Isolamento de Camadas

### Permissão para Instanciar Cliente Axios:
- **Permitido apenas em:**
  - `/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts` (Instanciador global da instância do Axios).

### Proibição de Chamadas de Rede Diretas (Axios/Fetch):
- **Camadas Proibidas de chamar Axios ou API diretamente:**
  - Componentes de UI Genéricos (`/home/botelho/Documents/GitHub/liahona/frontend/src/components/ui/*`)
  - Componentes de Formulários de Features (`/home/botelho/Documents/GitHub/liahona/frontend/src/features/*/components/*`)
  - Páginas de Features (`/home/botelho/Documents/GitHub/liahona/frontend/src/features/*/pages/*`)
  - Schemas de Validação (`/home/botelho/Documents/GitHub/liahona/frontend/src/features/*/schemas/*`)
- **Diretriz:** Toda interação com a rede deve ser abstraída em um serviço dedicado (`*.service.ts`) e consumida na interface através de hooks customizados do TanStack Query (`useQuery` ou `useMutation`).
