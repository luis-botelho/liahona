---
title: Database Guidelines
description: Diretrizes de banco de dados — PostgreSQL com Prisma ORM.
area: engineering
tags: [engineering, database, prisma, postgresql]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# Database Guidelines

## Stack

- **Banco**: PostgreSQL
- **ORM**: Prisma 7 (`@prisma/client`)
- **Adaptador**: `@prisma/adapter-pg` (driver `pg`)
- **Schema**: `backend/prisma/schema.prisma`

## Conexão

A instância do Prisma é criada em `backend/src/infrastructure/database/prisma.ts` usando o adaptador `PrismaPg` com connection string via `process.env.DATABASE_URL`.

## Convencoes

### Schema

- Nomes de tabelas em **snake_case** (padrão Prisma com `@@map` quando necessário).
- Todos os models devem ter `id`, `createdAt` e `updatedAt`.
- `id` deve ser `String` (UUID) gerado pelo Prisma.

### Migrations

- Migrations ficam em `backend/prisma/migrations/`.
- Nunca editar migrations já aplicadas.
- Criar migration: `npx prisma migrate dev --name <nome>`.
- Aplicar migration em produção: `npx prisma migrate deploy`.

### Repository Pattern

- Acesso ao banco exclusivamente via repositórios em `infrastructure/repositories/`.
- Usar `select` para retornar apenas campos necessários.
- Nunca usar `findMany` sem `take`/`limit` em produção.

### Segurança

- Nunca logar query completa com dados sensíveis.
- Senhas devem ser hasheadas com Argon2 (ADR-013) antes de persistir.
- `DATABASE_URL` deve estar em `.env` (nunca commitado).

## Modelos Existentes

| Model | Campos | Uso |
|---|---|---|
| User | id, name, email, password, createdAt, updatedAt | Cadastro e autenticação |

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [Tech Stack](tech-stack.md)
- [Security Guidelines](security-guidelines.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
