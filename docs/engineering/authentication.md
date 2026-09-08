# Authentication Guidelines

- **Estratégia:** JWT (JSON Web Token) / Bearer Token.
- **Persistência:** 
  - Local de armazenamento: `localStorage`
  - Chave de armazenamento: `@lia:token`
  - Justificativa: Facilidade de implementação, persistência de sessão entre fechamento/abertura do navegador e independência de domínios em desenvolvimento.

---

## Regras Técnicas Extraídas do Código

> As regras abaixo foram derivadas da análise direta do código-fonte e representam o estado **real** da implementação (não o planejado).

### 1. Formato e Estrutura do JWT

| Campo | Tipo | Origem | Descrição |
|---|---|---|---|
| `sub` | `string` (UUID) | `user.id` (Prisma) | Identificador único do usuário no banco |
| `email` | `string` | `user.email` (Prisma) | E-mail do usuário |
| `iat` | `number` (timestamp) | Auto-adicionado por `@fastify/jwt` | Data/hora de emissão do token |
| `exp` | `number` (timestamp) | Calculado por `@fastify/jwt` | Data/hora de expiração do token |

- **Biblioteca:** `@fastify/jwt` v10.2.0 (usa `fast-jwt` v6.2.4 internamente)
- **Algoritmo:** HS256 (padrão do `@fastify/jwt`, sem override explícito)
- **Secret:** via variável de ambiente `JWT_SECRET`
- **Plugin registrado em:** `backend/src/infrastructure/http/plugins/jwt.ts`
- **Token assinado em:** `backend/src/presentation/controllers/auth/login.controller.ts` (linhas 24-32)

**Payload de exemplo (decodificado):**
```json
{
  "sub": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "usuario@exemplo.com",
  "iat": 1721376000,
  "exp": 1721462400
}
```

### 2. Estrutura das Rotas Protegidas

**Backend (Fastify):**
- **Nenhum middleware de autenticação existe** — nenhum `onRequest` hook, `preHandler`, ou decorator `authenticate` é aplicado a qualquer rota.
- Todas as rotas atuais são **públicas**:
  - `POST /login` — `backend/src/presentation/routes/auth.routes.ts`
  - `POST /register` — `backend/src/presentation/routes/register.routes.ts`
  - `GET /health` — `backend/src/presentation/server.ts`
- **Nenhuma rota protegida por backend foi implementada ainda.**

**Frontend (React):**
- Componente `ProtectedRoute` está **planejado** para `frontend/src/components/protected-route.tsx` mas **não foi implementado**.
- Guard planejado: lerá o token do `localStorage` (ou contexto global). Se inexistente/inválido → redireciona para `/login`.
- **Rotas públicas:** `/login`, `/register`
- **Rotas protegidas planejadas:** `/` (Dashboard)

### 3. Política de Expiração da Sessão

| Configuração | Valor | Fonte |
|---|---|---|
| Expiração do Token | `1d` (1 dia) | `JWT_EXPIRES_IN` em `backend/.env` |
| Armazenamento | `localStorage` chave `@lia:token` | Documentado em `authentication.md` |
| Refresh Token | **Não implementado** | — |
| Logout | **Não implementado** (sem endpoint, hook ou UI) | — |

- O valor `1d` é passado como string para `expiresIn` no `jwtSign` do Fastify, que o converte internamente para timestamp `exp`.
- **Nota:** A ADR-017 (aprovada) define HTTP Only Cookies como estratégia oficial, mas o código atual usa `localStorage` + Bearer Token. Ver `knowledge-gaps.md`.
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
