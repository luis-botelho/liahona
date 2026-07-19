---
title: Testing Guidelines
description: Diretrizes de testes do projeto LIA — framework e estratégia ainda não definidos.
area: engineering
tags: [engineering, testing, vitest, jest]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# Testing Guidelines

<!-- DECISÃO PENDENTE: Framework de testes ainda não instalado.
     Nenhuma biblioteca de teste (vitest, jest, @testing-library/react, etc.)
     está presente em package.json do frontend ou backend.
     Ver knowledge-gaps.md para registro da pendência. -->

## Status Atual

Nenhuma biblioteca de teste está instalada no momento. O framework, ferramentas e estratégia de testes são **decisões pendentes** que precisam ser tomadas pelo Executive Board antes de escrever testes.

### Frontend (`frontend/package.json`)

- **Não instalado**: vitest, jest, @testing-library/react, @testing-library/jest-dom, jsdom.
- **Script de teste ausente**: Não existe script `"test"` no `package.json`.

### Backend (`backend/package.json`)

- **Não instalado**: vitest, jest, supertest, @types/jest.
- **Script de teste ausente**: Não existe script `"test"` no `package.json`.

## Estratégia Proposta (sujeita a aprovação)

Quando o framework for definido, recomenda-se:

### Backend

- Testes unitários para use cases (mock de repositórios).
- Testes de integração para controllers/routes (com banco de teste ou container Docker).
- Ferramenta sugerida: Vitest + Supertest.

### Frontend

- Testes unitários para hooks e serviços.
- Testes de componente para formulários (validação Zod + renderização).
- Ferramenta sugerida: Vitest + React Testing Library.

## O que testar

| Camada | Backend | Frontend |
|---|---|---|
| Unit | Use cases, validações, lógica de negócio | Hooks, funções utilitárias, schemas Zod |
| Integration | Controllers + repositórios (com DB) | Services (mock de API) |
| E2E | — | Fluxos de autenticação (futuro) |

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [Frontend Guidelines](frontend-guidelines.md)
- [Tech Stack](tech-stack.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
