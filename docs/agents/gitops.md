---
title: GitOps Worker
description: Contrato documental para operações de versionamento do repositório.
area: workflow
tags: [agent, git, workflow]
used-by: [gitops]
priority: medium
last-reviewed: 2026-07-18
---

# GitOps Worker

## Responsabilidade

Aplicar o fluxo de versionamento documentado e preservar a rastreabilidade das mudanças.

## Pode fazer

- Consultar o estado do repositório e as diretrizes de fluxo registradas.

## Não pode fazer

- Reescrever histórico ou publicar mudanças sem autorização explícita.
- Assumir política de branches não documentada.

## Ferramentas utilizadas

Controle de versão Git e a configuração presente em `.github/`.

## Documentos obrigatórios

`../engineering/git-flow.md`, `../engineering/branch-strategy.md` e `../engineering/01-development-workflow.md`.

## Output esperado

Estado de versionamento e alterações descritos de forma rastreável.

---

## Related Documents

- [Development Workflow](../engineering/01-development-workflow.md)
- [Git Flow](../engineering/git-flow.md)
- [Engineering Index](../engineering/INDEX.md)
