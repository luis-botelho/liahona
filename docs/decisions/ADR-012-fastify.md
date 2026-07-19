---
title: ADR-012 - Fastify como Framework HTTP
description: Documento de architecture do projeto LIA.
area: architecture
tags: [architecture, adr-012-fastify]
used-by: [development, review, analysis]
priority: high
last-reviewed: 2026-07-18
---

# ADR-012 — Fastify como Framework HTTP

## Status

Accepted

---

## Contexto

Durante a Sprint 1 surgiu a necessidade de definir oficialmente o framework HTTP do backend.

As opções avaliadas foram:

- Express
- Fastify
- Hono
- NestJS

---

## Problema

A camada HTTP precisava de uma base oficial, com boa produtividade, boa performance e compatibilidade com a arquitetura que o LIA vem adotando.

Era necessário escolher um framework que pudesse evoluir junto com o produto sem introduzir complexidade desnecessária.

---

## Decisão

O projeto adotará o Fastify como framework HTTP oficial.

---

## Justificativa

- Alto desempenho.
- Excelente suporte ao TypeScript.
- Ecossistema maduro.
- Arquitetura baseada em plugins.
- Fácil integração com Prisma.
- Alinhamento com a filosofia Progressive Engineering.

---

## Consequências

Todo novo endpoint deverá utilizar a estrutura oficial do Fastify.

Mudanças futuras deverão ser discutidas através de nova ADR.

---

## Referências

- 05-architecture.md
- 06-tech-stack.md
- 10-api.md

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
