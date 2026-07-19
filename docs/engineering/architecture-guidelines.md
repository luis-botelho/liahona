---
title: Architecture Guidelines
description: Diretrizes arquiteturais do projeto LIA — backend Clean Architecture, frontend feature-based.
area: engineering
tags: [engineering, architecture, clean-architecture]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# Architecture Guidelines

## Backend — Clean Architecture

O backend adota Clean Architecture com separação estrita de camadas:

```
domain/ → application/ → infrastructure/ → presentation/
```

Cada camada possui responsabilidades definidas. Detalhes completos em [backend-guidelines.md](backend-guidelines.md).

### Princípios

1. **Dependência externa para dentro**: A camada mais interna (domain) não depende de nenhuma outra.
2. **Contratos antes de implementações**: Interfaces são definidas no domain; implementações vivem na infrastructure.
3. **Um caso de uso, um arquivo**: Cada operação de negócio é uma classe isolada.
4. **Controllers sem lógica de negócio**: Controllers orquestram chamadas, não tomam decisões.

## Frontend — Feature-based Architecture

O frontend organiza código por feature (funcionalidade), não por tipo de arquivo.

```
features/auth/  → Todo o fluxo de autenticação
features/*/     → Cada feature encapsula components, hooks, pages, schemas, services, types
```

### Princípios

1. **Services isolam rede**: Nenhum componente chama Axios diretamente. Toda chamada HTTP vive em `*.service.ts`.
2. **Hooks abstraem mutations**: O interface com TanStack Query vive em hooks customizados.
3. **Schemas validam antes de enviar**: Zod schemas são a primeira barreira de validação.
4. **Pages são containers**: Páginas orquestram componentes e hooks, não contêm lógica complexa.

Detalhes em [frontend-guidelines.md](frontend-guidelines.md) e [frontend-architecture.md](frontend-architecture.md).

## Padrão de Comunicação Frontend-Backend

```
Frontend: Page → Form → Zod → Service → Axios → HTTP
Backend:  Route → Controller → UseCase → Repository → Prisma → DB
```

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [Frontend Guidelines](frontend-guidelines.md)
- [Frontend Architecture](frontend-architecture.md)
- [Tech Stack](tech-stack.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
