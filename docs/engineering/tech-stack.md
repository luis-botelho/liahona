---
title: Tech Stack
description: Tecnologias e ferramentas verificadas na configuração atual do repositório.
area: engineering
tags: [typescript, react, vite, fastify, prisma, postgresql]
used-by: [development, review, debug, analysis]
priority: critical
last-reviewed: 2026-07-18
---

# Tech Stack

Este documento registra somente tecnologias confirmadas pelos arquivos de configuração do repositório.

| Área | Tecnologia confirmada | Evidência |
|---|---|---|
| Backend | Node.js, TypeScript e Fastify | `backend/package.json` |
| Persistência | PostgreSQL, Prisma 7 e adaptador `@prisma/adapter-pg` | `backend/package.json`, `backend/prisma.config.ts` |
| Autenticação | JWT com `@fastify/jwt`; hash com Argon2 | `backend/package.json` |
| Frontend | React 19, TypeScript e Vite | `frontend/package.json`, `frontend/vite.config.ts` |
| Estilos e UI | Tailwind CSS 4, shadcn e Base UI | `frontend/package.json`, `frontend/components.json` |
| Dados no frontend | TanStack React Query, Axios, React Hook Form e Zod | `frontend/package.json` |
| Qualidade | ESLint, Prettier (backend) e configuração TypeScript estrita | `package.json` e `tsconfig*.json` de cada aplicação |

O alias `@/*` do frontend resolve para `frontend/src/*`. O backend compila `src` para `dist` e usa módulos NodeNext.

---

## Related Documents

- [Folder Structure](folder-structure.md)
- [Architecture](../05-architecture.md)
- [ADR Index](../decisions/INDEX.md)
