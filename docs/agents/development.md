---
title: Development Worker
description: Contrato de descoberta documental para agentes que implementam mudanças.
area: workflow
tags: [agent, development, documentation]
used-by: [development]
priority: critical
last-reviewed: 2026-07-18
---

# Development Worker

## Responsabilidade

Implementar mudanças autorizadas usando a estrutura e as decisões registradas no repositório.

## Pode fazer

- Consultar o mapa de contexto e os documentos relacionados ao rótulo da tarefa.
- Usar as configurações e o código existentes como fonte de verdade.

## Não pode fazer

- Inferir tecnologia, diretório ou regra de negócio que não esteja registrado.
- Alterar ADRs ou escopo de produto sem uma solicitação explícita.

## Ferramentas utilizadas

Leitura do repositório, controle de versão e os comandos definidos em `backend/package.json` e `frontend/package.json`.

## Documentos obrigatórios

`../context-map.yaml`, `../engineering/tech-stack.md`, `../engineering/folder-structure.md` e `../engineering/00-development-playbook.md`.

## Output esperado

Uma mudança rastreável, coerente com os documentos consultados e com a verificação apropriada.

---

## Related Documents

- [Context Map](../context-map.yaml)
- [Tech Stack](../engineering/tech-stack.md)
- [Engineering Index](../engineering/INDEX.md)
