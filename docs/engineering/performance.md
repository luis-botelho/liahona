---
title: Performance
description: Diretrizes de performance do projeto LIA.
area: engineering
tags: [engineering, performance]
used-by: [development, review, debug]
priority: medium
last-reviewed: 2026-07-19
---

# Performance

## Backend

- Fastify é um framework de alta performance (benchmarks superam Express).
- Prisma queries devem usar `select` para evitar SELECT *.
- Evitar N+1 queries: usar `include` do Prisma ou queries separadas quando necessário.
- Connection pooling via `@prisma/adapter-pg` com driver `pg`.

## Frontend

- **TanStack Query**: Cache inteligente, deduplicação de requests, stale-while-revalidate.
- **Code splitting**: <!-- DECISÃO PENDENTE: Lazy loading de rotas depende da escolha de biblioteca de roteamento. -->
- **Imagens**: <!-- DECISÃO PENDENTE: Estratégia de imagens (CDN, otimização) ainda não definida. -->

## Métricas

<!-- DECISÃO PENDENTE: Ferramentas de monitoramento de performance (ex: Lighthouse CI,
     APM) ainda não definidas. Ver knowledge-gaps.md. -->

---

## Related Documents

- [Tech Stack](tech-stack.md)
- [Backend Guidelines](backend-guidelines.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
