---
title: "TASK-004 — Gerenciamento de Sessão (HTTP Only Cookies)"
description: Especificação técnica completa para implementação de sessão via HTTP Only Cookies.
area: product
tags: [product, task-004, auth, session, http-only-cookie]
used-by: [development, review]
priority: critical
last-reviewed: 2026-07-19
---

# TASK-004 — Gerenciamento de Sessão (HTTP Only Cookies)

> **User Story:** US-002 — Login de Usuário
>
> **Epic:** EPIC-001 — Gestão de Contas e Autenticação
>
> **Status:** Aguardando implementação
>
> **Dependências:** US-001 concluída, ADR-017 aprovada

---

## 1. Objetivo da Task

Implementar gerenciamento de sessão baseado em HTTP Only Cookies, mantendo o usuário autenticado entre navegações e protegendo rotas privadas do frontend.

---

## 2. Fluxo Completo da Autenticação

```
POST /login

↓

Backend valida credenciais (email + senha via Argon2id)

↓

Backend gera JWT (payload: sub, email)

↓

Backend envia Set-Cookie (HTTP Only, signed)

↓

Browser armazena cookie automaticamente

↓

Frontend chama GET /me (cookie enviado automaticamente)

↓

Backend valida cookie → retorna dados do usuário

↓

Frontend define isAuthenticated = true

↓

Protected Routes liberadas
```

---

## 3. Estratégia de Sessão

| Pergunta | Resposta |
|---|---|
| JWT fica onde? | HTTP Only Cookie (`liahona.session`) |
| Quem lê o JWT? | Somente o Backend |
| O React acessa o JWT? | Nunca |
| Como o React sabe que existe sessão? | `GET /me` |

---

## 4. Especificação do Cookie

| Atributo | Valor |
|---|---|
| Nome | `liahona.session` |
| httpOnly | `true` |
| secure | `true` em produção / `false` em desenvolvimento |
| sameSite | `lax` |
| path | `/` |
| maxAge | **DECISÃO PENDENTE** — 7 dias ou 24 horas (definir oficialmente) |

---

## 5. JWT

### Payload

| Campo | Tipo | Descrição |
|---|---|---|
| `sub` | `string` (UUID) | ID do usuário |
| `email` | `string` | E-mail do usuário |
| `iat` | `number` | Auto-adicionado por `@fastify/jwt` |
| `exp` | `number` | Calculado a partir de `expiresIn` |

### Expiração

**DECISÃO PENDENTE** — definir oficialmente:

- 15 minutos
- 30 minutos
- 1 hora
- 24 horas
- 7 dias

### Algoritmo

`HS256` (padrão `@fastify/jwt`)

---

## 6. Endpoint GET /me

```
GET /me
```

**Resposta com sessão válida:**

```
200 OK

{
  "id": "uuid",
  "name": "string",
  "email": "string"
}
```

**Sem sessão ou sessão expirada:**

```
401 Unauthorized
```

---

## 7. Rotas Públicas

| Rota | Método | Descrição |
|---|---|---|
| `/login` | POST | Autenticação |
| `/register` | POST | Cadastro |

---

## 8. Rotas Protegidas

**DECISÃO PENDENTE** — definir quais rotas serão protegidas:

| Rota | Método | Descrição |
|---|---|---|
| `/dashboard` | GET | Dashboard principal |
| `/profile` | GET | Perfil do usuário |
| `/applications` | GET | Candidaturas |

> O Development Worker implementa apenas as rotas aprovadas pelo Product Office.

---

## 9. Estratégia do Frontend

```
App inicia

↓

AuthContext monta → chama GET /me

↓

Usuário autenticado?

↓

Sim → carrega aplicação

↓

Não → redireciona /login
```

---

## 10. AuthContext

### Responsabilidades

O `AuthContext` deverá armazenar:

| Campo / Método | Tipo | Descrição |
|---|---|---|
| `user` | `User \| null` | Dados do usuário logado |
| `loading` | `boolean` | Estado de carregamento inicial |
| `isAuthenticated` | `boolean` | `true` se `user` existir |
| `login()` | `() => void` | Disparado após POST /login |
| `logout()` | `() => void` | Limpa contexto e redireciona |
| `refreshUser()` | `() => void` | Revalida via GET /me |

### Localização

`frontend/src/contexts/auth-context.tsx` (a ser criado)

---

## 11. ProtectedRoute

### Fluxo

```
Entrou rota privada

↓

loading?

↓

Sim → mostra spinner

↓

Não → autenticado?

↓

Sim → renderiza componente

↓

Não → redirect /login
```

### Localização

`frontend/src/components/protected-route.tsx` (a ser criado)

---

## 12. Logout

```
Logout (botão ou link)

↓

DELETE cookie (backend envia Set-Cookie com maxAge: 0)

↓

Frontend limpa AuthContext (user = null, isAuthenticated = false)

↓

Redireciona para /login
```

### Endpoint

```
POST /logout
```

> Endpoint a ser criado no backend. Remove o cookie da sessão.

---

## 13. Axios

| Configuração | Valor |
|---|---|
| `withCredentials` | `true` |
| `baseURL` | `http://localhost:3333` (dev) / variável de ambiente (produção) |
| timeout | **DECISÃO PENDENTE** — sugerido 10000 ms |

### Localização

`frontend/src/services/api.ts`

---

## 14. Tratamento do 401

Quando qualquer requisição retornar `401`:

```
401 recebido

↓

Limpar AuthContext (user = null, isAuthenticated = false)

↓

Redireciona para /login
```

### Implementação

Interceptor de response no Axios (`api.ts`):

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // limpar contexto
      // redirect /login
    }
    return Promise.reject(error);
  }
);
```

---

## 15. Refresh da Página (F5)

```
Usuário pressiona F5

↓

Cookie permanece no browser (HTTP Only)

↓

React recarrega → AuthContext monta → chama GET /me

↓

Cookie enviado automaticamente (withCredentials: true)

↓

Backend valida cookie → 200 OK

↓

Usuário continua autenticado
```

---

## 16. Expiração

```
JWT expirou (maxAge do cookie atingido ou exp do JWT)

↓

Próxima requisição: GET /me ou qualquer rota protegida

↓

Backend retorna 401

↓

Frontend interceptor captura 401

↓

Frontend limpa sessão (AuthContext)

↓

Redireciona para /login
```

---

## 17. Sequence Diagram

```
React                    Fastify              Use Case           Prisma           JWT              Cookie           Browser
  │                         │                    │                  │                │                │                │
  │── POST /login ─────────>│                    │                  │                │                │                │
  │                         │── validateUser ───>│                  │                │                │                │
  │                         │                    │── findByEmail ──>│                │                │                │
  │                         │                    │<── user ─────────│                │                │                │
  │                         │                    │── verifyPassword │                │                │                │
  │                         │                    │── sign JWT ─────────────────────>│                │                │
  │                         │                    │<── token ────────────────────────│                │                │
  │                         │<── token ──────────│                  │                │                │                │
  │<── Set-Cookie ──────────│─────────────────────────────────────────────────────────────────────>│                │
  │                         │                    │                  │                │                │  armazena      │
  │                         │                    │                  │                │                │  cookie        │
  │                         │                    │                  │                │                │                │
  │── GET /me ─────────────>│                    │                  │                │                │                │
  │   (cookie enviado)      │── verifyCookie ───>│                  │                │                │                │
  │                         │                    │── findById ─────>│                │                │                │
  │                         │                    │<── user ─────────│                │                │                │
  │<── { id, name, email } ─│<── user ───────────│                  │                │                │                │
  │                         │                    │                  │                │                │                │
  │── render ProtectedRoute │                    │                  │                │                │                │
```

---

## 18. Atualizações de Documentação

Após implementação, os seguintes documentos deverão ser atualizados:

| Documento | Alteração |
|---|---|
| `docs/10-api.md` | Novo endpoint `GET /me`, alteração do contrato de `POST /login` (não retorna mais token no body) |
| `docs/18-security.md` | Estratégia de sessão via HTTP Only Cookie |
| `docs/decisions/ADR-017-authentication-session-strategy.md` | Refinamento com detalhes de implementação |
| `docs/12-changelog.md` | Registro da alteração |
| `docs/23-sprint-journal.md` | Entrada do sprint |
| `docs/engineering/authentication.md` | Atualização com fluxo HTTP Only Cookie |
| `docs/engineering/security-guidelines.md` | Atualização da seção de autenticação |

---

## Dependência Não Documentada

> **Importante:** Há um detalhe que ainda não está documentado e precisa ser decidido antes da implementação: qual biblioteca de cookies será usada no Fastify.

### Recomendação

| Item | Valor |
|---|---|
| Plugin | `@fastify/cookie` |
| Motivo | Integração oficial com Fastify, suporte a cookies assinados e configuração simples para HTTP Only Cookies |

---

## Referências

- [ADR-017](../decisions/ADR-017-authentication-session-strategy.md) — Estratégia aprovada (HTTP Only Cookies)
- [Authentication Guidelines](../engineering/authentication.md) — Diretrizes de autenticação
- [Security Guidelines](../engineering/security-guidelines.md) — Diretrizes de segurança
- [Knowledge Gaps #5](../knowledge/knowledge-gaps.md) — Conflito ADR-017 vs código real
- [Knowledge Gaps #14](../knowledge/knowledge-gaps.md) — Blockers do Development Worker

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
