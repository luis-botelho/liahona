---
title: ADR-014 - Frontend Stack
description: Documento de architecture do projeto LIA.
area: architecture
tags: [architecture, adr-014-frontend-stack]
used-by: [development, review, analysis]
priority: high
last-reviewed: 2026-07-18
---

# ADR-014 — Frontend Stack

## Status

Accepted

---

## Contexto

Era necessário definir oficialmente a stack do frontend antes do início do desenvolvimento da interface.

---

## Decisão

O frontend utilizará:

- React 19
- Vite
- TypeScript

---

## Justificativa

- excelente produtividade;
- alta performance;
- simplicidade arquitetural;
- alinhamento com Progressive Engineering.

---

## Consequências

Toda nova interface deverá seguir esta stack.

Mudanças futuras dependerão de nova ADR.

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
