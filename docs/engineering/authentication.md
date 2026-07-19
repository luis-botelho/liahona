# Authentication Guidelines

- **Estratégia:** JWT (JSON Web Token) / Bearer Token.
- **Persistência:** 
  - Local de armazenamento: `localStorage`
  - Chave de armazenamento: `@lia:token`
  - Justificativa: Facilidade de implementação, persistência de sessão entre fechamento/abertura do navegador e independência de domínios em desenvolvimento.
- **Fluxo de Login:**
  1. Componente de formulário `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/components/login-form.tsx` coleta credenciais e submete via React Hook Form.
  2. Validação local do payload ocorre usando `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/schemas/login.schema.ts`.
  3. Chamada ao hook de mutação em `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/hooks/use-login-mutation.ts`.
  4. Invocação do serviço em `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/services/auth.service.ts` chamando `POST /login` via cliente Axios em `/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts`.
  5. API do Backend em `/home/botelho/Documents/GitHub/liahona/backend/src/presentation/controllers/auth/login.controller.ts` responde com `200 OK` contendo `{ success: true, data: { token: string, user: { id: string, name: string, email: string } } }`.
  6. O token JWT recebido é salvo no `localStorage` sob a chave `@lia:token`.
  7. O token JWT é injetado nas requisições subsequentes via interceptor do Axios em `/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts`.
  8. O estado do usuário é armazenado no contexto global da aplicação (a ser criado no provedor de autenticação).
- **Fluxo de Logout:**
  1. Remoção do token da chave `@lia:token` no `localStorage`.
  2. Limpeza do header `Authorization` (redefinindo para `undefined` ou removendo) na instância do Axios em `/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts`.
  3. Redirecionamento forçado do usuário para a rota pública `/login`.
- **Guards de Rotas:**
  - Componente: `ProtectedRoute` (planejado para ser implementado em `/home/botelho/Documents/GitHub/liahona/frontend/src/components/protected-route.tsx`).
  - Verificação de Sessão: O guard lerá o token do `localStorage` (ou o estado do contexto global de autenticação). Se o token for inexistente ou inválido (expirado), redirecionará o usuário para a rota `/login`.
- **Rotas Públicas:**
  - `/login` (Componente: `LoginPage` em `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/pages/LoginPage.tsx`)
  - `/register` (Componente: `RegisterPage` em `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/pages/register.page.tsx`)
- **Refresh Token:** Não implementado.
