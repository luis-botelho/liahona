---
title: Coding Standards
description: Padrões de código e convenções de estilo do projeto LIA.
area: engineering
tags: [engineering, coding-standards, typescript, eslint]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# Coding Standards

## Linguagem

- **TypeScript** em todo o projeto (frontend e backend).
- Strict mode habilitado nos dois `tsconfig.json`.

## ESLint

- Configurado em frontend e backend.
- Backend usa `eslint-config-prettier` e `eslint-plugin-prettier`.
- Comandos:
  - `npm run lint` — verifica
  - `npm run lint:fix` — corrige automaticamente

## Prettier

- Disponível apenas no backend (`npm run format`).
- <!-- DECISÃO PENDENTE: Prettier ainda não configurado no frontend. Ver knowledge-gaps.md -->

## Convenções de Nomenclatura

| Elemento | Padrão | Exemplo |
|---|---|---|
| Arquivos de componente | kebab-case | `login-form.tsx` |
| Arquivos de página | kebab-case (recomendado) | `register.page.tsx` |
| Arquivos de hook | kebab-case | `use-login-mutation.ts` |
| Arquivos de service | kebab-case | `auth.service.ts` |
| Arquivos de schema | kebab-case | `login.schema.ts` |
| Arquivos de util | kebab-case | `utils.ts` |
| Componentes React | PascalCase | `LoginForm`, `LoginPage` |
| Funções utilitárias | camelCase | `useLoginMutation` |
| Interfaces/Types | PascalCase | `LoginRequest`, `RegisterUserDTO` |
| Constantes globais | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Variáveis de ambiente | UPPER_SNAKE_CASE | `DATABASE_URL`, `JWT_SECRET` |

> **Nota:** `LoginPage.tsx` (PascalCase) e `register.page.tsx` (kebab-case) coexistem no repositório. O padrão oficial é kebab-case para arquivos. `LoginPage.tsx` ainda não foi renomeado — ver [knowledge-gaps.md](../knowledge/knowledge-gaps.md).

## Regras de Código

- Imports absolutos com alias `@/` no frontend.
- Imports relativos com extensão `.js` no backend (compatível com ESM).
- Um componente/função exportado por arquivo.
- Funções puras para controllers (exceto quando com dependência injetada).
- Nunca expor `password` em respostas da API.

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [Frontend Guidelines](frontend-guidelines.md)
- [Tech Stack](tech-stack.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
