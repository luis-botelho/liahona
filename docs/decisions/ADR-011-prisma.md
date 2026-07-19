---
title: ADR-002 - Adequação ao Prisma 7
description: Documento de architecture do projeto LIA.
area: architecture
tags: [architecture, adr-011-prisma]
used-by: [development, review, analysis]
priority: high
last-reviewed: 2026-07-18
---

# ADR-002 — Adequação ao Prisma 7

## Status

Accepted

## Contexto

Durante a implementação da TASK-001 foi identificada uma mudança de configuração introduzida pelo Prisma 7 em relação às versões anteriores.

## Problema

A documentação e exemplos antigos utilizavam configurações que deixaram de ser suportadas na versão atual.

## Decisão

Adotar o padrão oficial do Prisma 7, ajustando a configuração do projeto para manter compatibilidade com a versão utilizada.

## Justificativa

- Compatibilidade com a versão atual.
- Evita uso de configurações depreciadas.
- Facilita futuras atualizações.

## Consequências

Nenhum impacto arquitetural.

A alteração é exclusivamente de infraestrutura e configuração.

## Referências

TASK-001 — Bootstrap do Backend.

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
