---
title: Clean Code
description: Princípios de código limpo aplicados ao projeto LIA.
area: engineering
tags: [engineering, clean-code, solid]
used-by: [development, review]
priority: medium
last-reviewed: 2026-07-19
---

# Clean Code

## Princípios Gerais

- **Single Responsibility**: Cada arquivo, função e classe faz uma coisa só.
- **Explicit over implicit**: Preferir nomes descritivos a comentários.
- **Funções pequenas**: Funções com no máximo ~30 linhas. Se maior, decompor.
- **Arquivos pequenos**: Se um arquivo passa de ~200 linhas, considerar separação.
- **Sem código morto**: Remover imports não usados, variáveis não referenciadas.

## Backend

- Controllers: Funções puras (ou classes mínimas com construtor para DI).
- Use Cases: Uma classe por operação de negócio.
- Repositories: Implementação dos contratos do domain.

## Frontend

- Components: Uma responsabilidade visual por componente.
- Hooks: Uma lógica reutilizável por hook.
- Services: Uma operação HTTP por função, todas no mesmo service file da feature.

## SOLID no Projeto

| Princípio | Aplicação |
|---|---|
| S — Single Responsibility | Um controller por endpoint, um use case por operação |
| O — Open/Closed | Domain interfaces permitem novas implementações sem modificar use cases |
| L — Liskov Substitution | Repositories implementam interfaces do domain |
| I — Interface Segregation | Repositories pequenos e específicos (UserRepository) |
| D — Dependency Inversion | Use cases dependem de interfaces, não de Prisma diretamente |

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [Frontend Guidelines](frontend-guidelines.md)
- [Coding Standards](coding-standards.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
