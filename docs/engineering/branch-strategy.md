---
title: Branch Strategy
description: Estratégia de branches do projeto LIA.
area: engineering
tags: [engineering, branch-strategy, git]
used-by: [development, gitops]
priority: high
last-reviewed: 2026-07-19
---

# Branch Strategy

## Estratégia

O projeto usa uma variação simplificada de Git Flow:

- **`main`**: Branch de produção. Sempre estável.
- **Branches de feature**: Criadas a partir de `main`, com prefixo descritivo.
- **Sem branch `develop`**: Para simplificar, as branches de feature fazem merge direto em `main` via PR.

## Naming Convention

```
<tipo>/<identificador>-<descrição-curta>
```

Exemplos:
- `feature/EPIC-001-user-registration`
- `fix/US-002-email-validation`
- `docs/naming-convention`
- `chore/update-dependencies`

## Proteção de Branch

<!-- DECISÃO PENDENTE: Branch protection rules no GitHub (requerer PR review,
     status checks) ainda não configuradas. Ver knowledge-gaps.md -->

---

## Related Documents

- [Git Flow](git-flow.md)
- [Development Workflow](01-development-workflow.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
