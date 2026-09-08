---
title: ADR-018 - User Identity and Capability Model
description: Documento de architecture do projeto LIA.
area: architecture
tags: [architecture, adr-018-user-capability-model]
used-by: [development, review, analysis, product]
priority: high
last-reviewed: 2026-09-08
---

# ADR-018 — User Identity and Capability Model

## Status

💡 **Proposed**

Esta é uma decisão **proposta**, registrada como direção arquitetural.

**Não deve ser implementada nesta missão.**

---

## Contexto

Hoje a entidade `User` possui uma `role` exclusiva:

```
WORKER | RECRUITER
```

Essa abordagem limita cenários reais da comunidade:

- um worker que também recruta;
- um trabalhador que também ensina;
- um educator que também trabalha;
- qualquer usuário que deseja solicitar uma tarefa/serviço pontual.

O produto evolui para um ecossistema onde uma mesma pessoa pode ocupar diferentes papéis ao longo do tempo.

---

## Alternativas

### A) Continuar com role exclusiva

Simples, mas impede que uma pessoa exerça múltiplos papéis.

Exige trocar de conta ou criar contas separadas.

### B) Enum com múltiplas roles

Permite combinações discretas, mas os papéis continuam sendo identidades.

Não modela bem capacidades/perfis independentes nem o domínio de tarefas pontuais.

### C) User como identidade + perfis/capacidades

O usuário representa uma identidade única.

Capacidades são expressas através de perfis/relacionamentos:

- `WorkerProfile`
- `RecruiterProfile`
- `EducatorProfile`

Publicar uma tarefa/serviço não exige uma role `Requester`.

---

## Decisão Proposta

Adotar a alternativa **C**.

O `User` representa a **identidade** de uma pessoa.

Capacidades são expressas através de **perfis e relacionamentos** (WorkerProfile, RecruiterProfile, EducatorProfile).

A criação de `REQUESTER` como role para tarefas pontuais não é necessária.

---

## Consequências

### Positivas

- Flexibilidade: uma pessoa pode exercer múltiplos papéis.
- Domínio mais realista: worker que recruta, trabalhador que ensina, etc.
- Crescimento do produto sem barreira de troca de conta.
- Menor necessidade de migrar usuários entre roles.

### Consequências / Custos

- A autorização precisará evoluir para lidar com múltiplas capacidades.
- O frontend não poderá depender de uma role exclusiva.
- Uma migration futura deverá preservar os usuários existentes.

### Estratégia transitória

- O modelo atual WORKER/RECRUITER continuará temporariamente.
- Só será substituído por uma implementação dedicada quando essa decisão for executada.

---

## Impacto

Modelo de dados

- Futuro: evolução do `User` para identidade + perfis de capacidade.

Autorização

- Futuro: autorização por capacidade, não por role exclusiva.

Frontend

- Futuro: não depender de role exclusiva.

---

## IMPORTANTE

Esta decisão **não deve ser implementada nesta missão**.

É exclusivamente um registro de direção arquitetural.

---

## Related Documents

- [ADR-007 - MVP Scope](./ADR-007-mvp-scope.md)
- [Roadmap](../03-roadmap.md)
- [Backlog](../04-backlog.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
