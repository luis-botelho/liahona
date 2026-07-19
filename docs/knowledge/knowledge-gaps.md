---
title: Knowledge Gaps
description: Decisões técnicas pendentes, inconsistências e dívida técnica documentada.
area: knowledge
tags: [knowledge, gaps, pending, technical-debt]
used-by: [development, review, analysis]
priority: critical
last-reviewed: 2026-07-19
---

# Knowledge Gaps

Este documento registra todas as decisões técnicas que ainda não foram tomadas, inconsistências encontradas no código real, e itens de dívida técnica que precisam de resolução pelo Executive Board.

---

## 1. Biblioteca de Roteamento (Frontend)

**Status:** DECISÃO PENDENTE — Executive Board

- **Situação:** Nenhuma biblioteca de roteamento está instalada no `frontend/package.json`.
- **O que foi documentado como planejado:** `react-router-dom` com `createBrowserRouter` (em `frontend-guidelines.md` e `routes.md`).
- **Impacto:** O `App.tsx` atual renderiza componentes diretamente sem roteamento. Não há rotas funcionais.
- **Arquivos afetados:** `App.tsx`, `frontend-guidelines.md`, `routes.md`.
- **Próximo passo:** Decidir entre `react-router-dom`, `@tanstack/react-router`, ou outro; instalar e implementar.

---

## 2. Biblioteca de Testes

**Status:** DECISÃO PENDENTE — Executive Board

- **Situação:** Nenhuma biblioteca de teste está instalada no frontend ou backend.
- **Não instalado:** vitest, jest, @testing-library/react, @testing-library/jest-dom, supertest, jsdom.
- **Scripts ausentes:** Não existe script `"test"` em nenhum dos `package.json`.
- **Impacto:** Nenhum teste pode ser executado ou escrito até que o framework seja definido.
- **Recomendação:** Vitest (mais leve, melhor integração com Vite) + React Testing Library (frontend) + Supertest (backend).
- **Próximo passo:** Aprovar framework e instalar dependências.

---

## 3. Duplicação de auth.service.ts

**Status:** DÍVIDA TÉCNICA — Executive Board

- **Situação:** Existem dois arquivos `auth.service.ts`:
  - `frontend/src/services/auth.service.ts` — contém apenas `register()` com tipos simples.
  - `frontend/src/features/auth/services/auth.service.ts` — contém `register()` E `login()` com tipos completos (`RegisterRequest`, `RegisterResponse`, `LoginRequest`, `LoginResponse`).
- **Quem usa o que:**
  - `use-login-mutation.ts` importa de `../services/auth.service` (features/auth).
  - `use-register-mutation.ts` importa de `../services/auth.service` (features/auth).
  - Nenhum hook importa de `src/services/auth.service.ts`.
- **Conclusão:** O arquivo `frontend/src/services/auth.service.ts` é **legado/orfão** e deve ser removido. O correto é `features/auth/services/auth.service.ts`.
- **Próximo passo:** Remover `frontend/src/services/auth.service.ts`.

---

## 4. Inconsistência de Nomenclatura de Arquivos

**Status:** DÍVIDA TÉCNICA — Executive Board

- **Situação:** Dois padrões de nomenclatura coexistem para páginas:
  - `LoginPage.tsx` (PascalCase)
  - `register.page.tsx` (kebab-case)
- **Padrão oficial definido:** kebab-case para arquivos, PascalCase para componentes (ver `coding-standards.md`).
- **Arquivo fora do padrão:** `LoginPage.tsx` deve ser renomeado para `login.page.tsx`.
- **Impacto:** Atualizar imports em `App.tsx`.
- **Próximo passo:** Renomear `LoginPage.tsx` → `login.page.tsx`.

---

## 5. Conflito ADR-017 vs. Código Real (Auth Strategy)

**Status:** DECISÃO PENDENTE — Executive Board

- **ADR-017 (aprovada):** Define HTTP Only Cookies como estratégia de persistência de sessão. O JWT deve ser enviado via `Set-Cookie` pelo backend, e o frontend deve usar `credentials: "include"`.
- **Código real:** Usa `localStorage` (chave `@lia:token`) + header `Authorization: Bearer`. O backend retorna o token no body da response JSON.
- **Impacto:** A implementação atual não segue a ADR aprovada. Existem duas opções:
  1. Implementar a ADR-017 (HTTP Only Cookies) — mais seguro.
  2. Criar uma nova ADR substituindo a ADR-017 com a estratégia atual (localStorage).
- **Próximo passo:** Executive Board deve decidir qual estratégia seguir.

---

## 6. Conflito ADR-006 vs. Código Real (Auth Architecture)

**Status:** ADR PENDENTE — Executive Board

- **ADR-006:** Status "Pendente (Sprint 0)" — nunca foi preenchida.
- **Código real:** Autenticação já implementada com JWT + Argon2.
- **Impacto:** A ADR precisa ser preenchida ou substituída documentando a estratégia real.
- **Próximo passo:** Preencher ADR-006 ou criar ADR-018 documentando a autenticação real.

---

## 7. Response Format Inconsistente

**Status:** DÍVIDA TÉCNICA — Executive Board

- **Situação:** Dois endpoints de auth retornam formatos diferentes:
  - `/register`: `{ id, name, email, createdAt, updatedAt }` (201)
  - `/login`: `{ success: true, data: { token, user: { id, name, email } } }` (200)
- **Impacto:** O frontend precisa tratar dois formatos de resposta diferentes.
- **Próximo passo:** Padronizar um formato único (recomendado: `{ success: true, data: { ... } }`).

---

## 8. Interceptors HTTP Não Implementados

**Status:** DÍVIDA TÉCNICA — Executive Board

- **Situação:** `http-client.md` documenta interceptors de request (injeção de token) e response (401 → logout automático), mas o código atual em `src/services/api.ts` não os implementa.
- **Impacto:** Tokens não são injetados automaticamente; erros 401 não disparam logout.
- **Próximo passo:** Implementar interceptors quando a estratégia de auth (localStorage vs. cookies) for definida.

---

## 9. ProtectedRoute e Roteamento

**Status:** DÍVIDA TÉCNICA — Executive Board

- **Situação:** `routes.md` e `authentication.md` documentam um componente `ProtectedRoute` e rotas públicas/protetidas, mas nada disso existe no código.
- **Impacto:** Sem roteamento, não há proteção de rotas.
- **Próximo passo:** Implementar após decidir biblioteca de roteamento.

---

## 10. Prettier no Frontend

**Status:** DÍVIDA TÉCNICA — Executive Board

- **Situação:** Prettier está configurado apenas no backend. O frontend não tem Prettier.
- **Impacto:** Formatação de código inconsistente entre frontend e backend.
- **Próximo passo:** Instalar e configurar Prettier no frontend.

---

## 11. LoginUseCase Usa Error Genérico

**Status:** DÍVIDA TÉCNICA — Low Priority

- **Situação:** `login.use-case.ts` lança `new Error('Invalid credentials')` em vez de `AppError` com statusCode.
- **Impacto:** O controller faz tradução manual. Não segue o padrão definido em `error-handling.md`.
- **Próximo passo:** Refatorar para usar `AppError(401)`.

---

## 12. Variável de Ambiente VITE_API_URL

**Status:** DÍVIDA TÉCNICA — Low Priority

- **Situação:** `http-client.md` documenta `import.meta.env.VITE_API_URL` como variável de ambiente planejada, mas `api.ts` usa string hardcode `"http://localhost:3333"`.
- **Impacto:** Não é possível configurar a URL base por ambiente.
- **Próximo passo:** Criar `.env` no frontend com `VITE_API_URL` e usar no `api.ts`.

---

## 13. Config Backend Vazio

**Status:** DÍVIDA TÉCNICA — Low Priority

- **Situação:** `backend/src/config/` existe mas contém apenas `.gitkeep`. Não há centralização de configuração.
- **Impacto:** Variáveis de ambiente são lidas diretamente nos arquivos (`process.env.JWT_SECRET!`).
- **Próximo passo:** Criar módulo de configuração centralizado com validação (ex: `zod` ou `envalid`).

---

## 14. Repository Manifest Desatualizado

**Status:** DÍVIDA TÉCNICA — Low Priority

- **Situação:** `docs/repository-manifest.yaml` lista dependências de forma genérica sem versões. O package.json real contém mais dependências (ex: `@hugeicons/react`, `next-themes`, `tw-animate-css`).
- **Impacto:** Documentação não reflete o estado real do projeto.
- **Próximo passo:** Atualizar manifest com todas as dependências reais.

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
- [Tech Stack](../engineering/tech-stack.md)
