---
title: Logging
description: Diretrizes de logging do projeto LIA.
area: engineering
tags: [engineering, logging]
used-by: [development, debug]
priority: medium
last-reviewed: 2026-07-19
---

# Logging

## Backend

### Fastify Logger

O servidor Fastify é inicializado com `logger: true`:

```typescript
const app = Fastify({ logger: true });
```

Isso habilita o logger estruturado do Fastify (baseado em Pino) com:
- Logs de request/response automaticamente.
- `request.log` disponível em todos os controllers.

### Uso nos Controllers

- Para erros inesperados: `request.log.error(error)` antes de retornar 500.
- Para erros de negócio (AppError): não logar, apenas retornar a mensagem.

### Variável de Ambiente

- `LOG_LEVEL` pode ser configurada para controlar verbosidade (info, warn, error, debug).

<!-- DECISÃO PENDENTE: Logging customizado ( além do logger nativo do Fastify) ainda não foi definido.
     Ver knowledge-gaps.md para pendências sobre logging estruturado, métricas e monitoramento. -->

## Frontend

- Logs de desenvolvimento via `console.log` / `console.error` (não usar em produção).
- Erros HTTP são tratados via TanStack Query `onError` callbacks.
- <!-- DECISÃO PENDENTE: Serviço de monitoramento frontend (ex: Sentry) ainda não definido. -->

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [Error Handling](error-handling.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
