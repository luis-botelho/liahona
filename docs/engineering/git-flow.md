---
title: Git Flow
description: Fluxo de trabalho com Git do projeto LIA.
area: engineering
tags: [engineering, git-flow, conventional-commits]
used-by: [development, gitops]
priority: high
last-reviewed: 2026-07-19
---

# Git Flow

## Branch Principal

- `main` — branch estável, sempre deployável.

## Branches de Trabalho

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feature/` | Nova funcionalidade | `feature/EPIC-001-login` |
| `fix/` | Correção de bug | `fix/EPIC-002-validation` |
| `docs/` | Atualização de documentação | `docs/update-readme` |
| `chore/` | Manutenção, dependências | `chore/dependencies` |

## Conventional Commits

```
<type>(<scope>): <descrição>

feat(auth): add login endpoint
fix(api): validate email
docs(playbook): update workflow
refactor(user): simplify service
test(auth): add login tests
chore(release): publish v1.0.0
```

## Fluxo

1. Criar branch a partir de `main`.
2. Desenvolver e commitar com mensagens convencionais.
3. Abrir Pull Request para review.
4. Após aprovação, fazer merge em `main`.
5. Tags em releases.

## Regras

- Nunca commitar direto em `main`.
- Cada PR deve ser coeso (uma feature, um fix).
- PR deve descrever: o que foi feito, por quê, impactos.

---

## Related Documents

- [Development Workflow](01-development-workflow.md)
- [Development Playbook](00-development-playbook.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
