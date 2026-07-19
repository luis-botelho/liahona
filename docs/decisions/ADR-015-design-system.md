---
title: ADR-015 - Design System Foundation
description: Documento de architecture do projeto LIA.
area: architecture
tags: [architecture, adr-015-design-system]
used-by: [development, review, analysis]
priority: high
last-reviewed: 2026-07-18
---

# ADR-015 — Design System Foundation

## Status

Accepted

---

## Contexto

Era necessário definir a base do Design System do projeto.

---

## Decisão

O Design System utilizará:

- Tailwind CSS v4
- shadcn/ui

---

## Justificativa

- componentes reutilizáveis;
- identidade própria;
- baixo acoplamento;
- excelente integração com React.

---

## Consequências

Os componentes pertencem ao projeto e não a uma biblioteca externa.

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
