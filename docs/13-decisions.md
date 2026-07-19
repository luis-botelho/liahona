---
title: Architectural Decisions
description: Documento de product do projeto LIA.
area: product
tags: [product, 13-decisions]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 📜 Architectural Decisions

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento centraliza todas as decisões arquiteturais e técnicas do projeto.

Cada decisão relevante deverá ser registrada através de uma ADR (Architecture Decision Record).

Nosso objetivo é preservar o histórico das decisões, evitando perda de contexto durante a evolução do produto.

---

# O que é uma ADR?

Uma ADR registra uma decisão importante tomada durante o desenvolvimento.

Ela responde perguntas como:

- Qual problema existia?
- Qual decisão foi tomada?
- Por que essa decisão foi escolhida?
- Quais alternativas foram consideradas?
- Quais são suas consequências?

Mais importante do que registrar a decisão é registrar o raciocínio utilizado.

---

# Quando criar uma ADR?

Uma ADR deverá ser criada quando houver decisões que impactem a arquitetura, a organização do projeto ou a estratégia técnica.

Exemplos:

- Escolha de tecnologias
- Mudanças arquiteturais
- Estratégias de autenticação
- Integrações importantes
- Alterações significativas na modelagem de dados
- Definição de padrões técnicos

Pequenas decisões de implementação não precisam de ADR.

---

# Estrutura das ADRs

Todas as ADRs deverão seguir o mesmo formato.

- Contexto
- Problema
- Decisão
- Justificativa
- Alternativas consideradas
- Consequências
- Status
- Data
- Referências

---

# Status possíveis

Uma ADR poderá possuir um dos seguintes estados:

- Proposed
- Accepted
- Deprecated
- Superseded

Quando uma decisão substituir outra, a ADR original deverá apontar para sua sucessora.

---

# Índice

## ADR-001

**Arquivo**

docs/decisions/ADR-001-tech-stack.md

**Título**

Adoção da Stack JavaScript/TypeScript Full Stack

**Status**

Accepted

**Resumo**

Define a utilização de React, React Native, Node.js, TypeScript, PostgreSQL e Prisma como base tecnológica inicial do projeto.

---

## ADR-002

**Arquivo**

docs/decisions/ADR-002-postgresql.md

**Título**

PostgreSQL como banco de dados principal

**Status**

Pendente (Sprint 0)

---

## ADR-003

**Arquivo**

docs/decisions/ADR-003-nodejs.md

**Título**

Node.js como tecnologia de Backend

**Status**

Pendente (Sprint 0)

---

## ADR-004

**Arquivo**

docs/decisions/ADR-004-react-native.md

**Título**

React Native como tecnologia Mobile

**Status**

Pendente (Sprint 0)

---

## ADR-005

**Arquivo**

docs/decisions/ADR-005-clean-architecture.md

**Título**

Arquitetura em camadas e separação de responsabilidades

**Status**

Pendente (Sprint 0)

---

## ADR-006

**Arquivo**

docs/decisions/ADR-006-authentication.md

**Título**

Estratégia inicial de autenticação

**Status**

Pendente (Sprint 0)

---

## ADR-007

**Arquivo**

docs/decisions/ADR-007-mvp-scope.md

**Título**

Escopo inicial do MVP

**Status**

Pendente (Sprint 0)

---

## ADR-008

**Arquivo**

docs/decisions/ADR-008-folder-structure.md

**Título**

Estrutura de pastas do projeto

**Status**

Pendente (Sprint 0)

---

## ADR-009

**Arquivo**

docs/decisions/ADR-009-git-workflow.md

**Título**

Fluxo de trabalho com Git

**Status**

Pendente (Sprint 0)

---

## ADR-010

**Arquivo**

docs/decisions/ADR-010-design-system.md

**Título**

Design System inicial

**Status**

Pendente (Sprint 0)

---

## ADR-011

**Arquivo**

docs/decisions/ADR-011-prisma.md

**Título**

Adequação ao Prisma 7

**Status**

Accepted

---

## ADR-012

**Arquivo**

docs/decisions/ADR-012-fastify.md

**Título**

Fastify como Framework HTTP

**Status**

Accepted

---

## ADR-013

**Arquivo**

docs/decisions/ADR-013-password-hash.md

**Título**

Estratégia de Hash de Senhas (Argon2id)

**Status**

Accepted

---

## ADR-014

**Arquivo**

docs/decisions/ADR-014-frontend-stack.md

**Título**

Frontend Stack

**Status**

Accepted

---

## ADR-015

**Arquivo**

docs/decisions/ADR-015-design-system.md

**Título**

Design System Foundation

**Status**

Accepted

---

## ADR-016

**Arquivo**

docs/decisions/ADR-016-data-fetching.md

**Título**

Estratégia de Data Fetching

**Status**

Accepted

---

## Próximas ADRs previstas

- Arquitetura REST
- Estratégia de Deploy
- Estratégia de Testes

Essas ADRs serão criadas apenas quando as respectivas decisões forem oficialmente tomadas.

---

# Filosofia

Boas decisões são documentadas.

Ótimas decisões também registram os motivos que levaram até elas.

As ADRs representam a memória técnica do projeto.

---

## Documentos Relacionados

- 05-architecture.md
- 06-tech-stack.md
- 09-database.md
- 10-api.md
- 11-contributing.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |

---

## Related Documents

- [Documentation Index](README.md)
- [Area Index](README.md)
- [Context Map](context-map.yaml)
