---
title: Folder Structure
description: Estrutura de diretórios verificada no repositório atual.
area: engineering
tags: [engineering, folder-structure]
used-by: [development, review, debug]
priority: critical
last-reviewed: 2026-07-18
---

# Folder Structure

Esta é uma fotografia da estrutura existente. Diretórios gerados e de dependências não definem convenções de implementação.

```text
backend/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── application/       # DTOs e casos de uso
│   ├── config/
│   ├── domain/            # entidades e contratos de repositório
│   ├── infrastructure/    # banco, HTTP e repositórios Prisma
│   ├── presentation/      # controllers e rotas
│   └── shared/            # erros compartilhados
└── package.json

frontend/
├── public/
├── src/
│   ├── app/
│   ├── components/ui/
│   ├── features/auth/
│   ├── lib/
│   ├── providers/
│   └── services/
└── package.json

docs/
├── agents/
├── decisions/
├── engineering/
├── epics/
├── sprints/
└── stories/
```

`backend/dist/`, `backend/generated/` e `backend/src/generated/` existem no checkout, mas são saídas ou clientes gerados e não foram tratados como fonte de convenção. O frontend usa o alias `@/` para `frontend/src/`.

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
