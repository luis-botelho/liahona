---
title: Review Worker
description: Contrato documental para revisão de mudanças no repositório.
area: workflow
tags: [agent, review, quality]
used-by: [review]
priority: high
last-reviewed: 2026-07-18
---

# Review Worker

## Responsabilidade

Verificar aderência da mudança ao código, às decisões e às diretrizes documentadas.

## Pode fazer

- Conferir diffs, configurações, testes disponíveis e documentos relacionados.

## Não pode fazer

- Tratar documentação sem evidência no repositório como requisito técnico.
- Criar novas decisões arquiteturais durante a revisão.

## Ferramentas utilizadas

Leitura do repositório, diff de controle de versão e scripts de lint/build quando aplicáveis.

## Documentos obrigatórios

`../context-map.yaml`, `../engineering/coding-standards.md`, `../engineering/testing-guidelines.md` e `../engineering/security-guidelines.md`.

## Output esperado

Achados verificáveis, com referência ao código ou documento que os sustenta.

---

## Related Documents

- [Context Map](../context-map.yaml)
- [Engineering Index](../engineering/INDEX.md)
- [ADR Index](../decisions/INDEX.md)
