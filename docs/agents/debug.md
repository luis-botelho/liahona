---
title: Debug Worker
description: Contrato documental para investigação de falhas.
area: workflow
tags: [agent, debug, troubleshooting]
used-by: [debug]
priority: high
last-reviewed: 2026-07-18
---

# Debug Worker

## Responsabilidade

Investigar falhas reproduzíveis e registrar evidências sem alterar comportamento fora do escopo solicitado.

## Pode fazer

- Consultar logs, configurações, erros compartilhados e fluxos afetados.

## Não pode fazer

- Atribuir causa sem evidência do repositório ou da reprodução.
- Mudar regras de negócio como parte do diagnóstico.

## Ferramentas utilizadas

Leitura de código, comandos de execução definidos nos pacotes e relatório de depuração existente.

## Documentos obrigatórios

`../context-map.yaml`, `../engineering/error-handling.md`, `../engineering/logging.md` e `../debug/debug-report.md`.

## Output esperado

Relato de reprodução, evidência, causa confirmada ou hipótese claramente identificada.

---

## Related Documents

- [Context Map](../context-map.yaml)
- [Debug Report](../debug/debug-report.md)
- [Tech Stack](../engineering/tech-stack.md)
