---
title: Documentation Changelog
description: Registro de todas as alterações realizadas na consolidação documental de 2026-07-19.
area: workflow
tags: [documentation, changelog, audit]
used-by: [development, review, analysis]
priority: high
last-reviewed: 2026-07-19
---

# CHANGELOG-DOCS

## Consolidação Final — 2026-07-19

### Resumo Executivo

Consolidação da base documental do LIA, alinhando propostas de governança e manual de implementação com o código real do repositório. Todos os dados de package.json, estrutura de diretórios e código fonte foram verificados contra a documentação.

---

## Arquivos Criados

| Arquivo | Motivo |
|---|---|
| `docs/engineering/backend-guidelines.md` | Corrigir bug de referência quebrada no `decision-tree.yaml`. Diretrizes de implementação do backend baseadas na estrutura Clean Architecture existente. |
| `docs/knowledge/knowledge-gaps.md` | Documentar 14 decisões pendentes, inconsistências e itens de dívida técnica para resolução pelo Executive Board. |
| `docs/knowledge/INDEX.md` | Índice programático do diretório de conhecimento. |
| `docs/CHANGELOG-DOCS.md` | Este arquivo — registro de todas as mudanças documentais. |

## Arquivos Atualizados (conteúdo real substituído)

| Arquivo | Alteração |
|---|---|
| `docs/engineering/architecture-guidelines.md` | Substituído placeholder por diretrizes arquiteturais reais: Clean Architecture (backend) e feature-based (frontend). |
| `docs/engineering/api-guidelines.md` | Substituído placeholder por diretrizes REST reais: formatos de resposta, status codes, endpoints existentes, inconsistências documentadas. |
| `docs/engineering/backend-guidelines.md` | Criado com conteúdo real baseado na estrutura de camadas existente: domain → application → infrastructure → presentation. |
| `docs/engineering/coding-standards.md` | Substituído placeholder por padrões reais: TypeScript, ESLint, Prettier, nomenclatura (kebab-case para arquivos, PascalCase para componentes). |
| `docs/engineering/database-guidelines.md` | Substituído placeholder por diretrizes reais: PostgreSQL, Prisma 7, repository pattern, migrations. |
| `docs/engineering/error-handling.md` | Substituído placeholder por diretrizes reais: AppError, tratamento em controllers e use cases, frontend (TanStack Query + Sonner). |
| `docs/engineering/git-flow.md` | Substituído placeholder por fluxo real: branches, conventional commits, PR workflow. |
| `docs/engineering/branch-strategy.md` | Substituído placeholder por estratégia real: `main` + branches com prefixo. |
| `docs/engineering/clean-code.md` | Substituído placeholder por princípios SOLID aplicados ao projeto. |
| `docs/engineering/logging.md` | Substituído placeholder por diretrizes reais: Fastify logger, `request.log.error()`. |
| `docs/engineering/performance.md` | Substituído placeholder por diretrizes reais: Fastify, TanStack Query cache, Prisma select. |
| `docs/engineering/security-guidelines.md` | Substituído placeholder por diretrizes reais: JWT, Argon2, CORS, validação de input. |
| `docs/engineering/testing-guidelines.md` | Substituído placeholder por status real: nenhuma biblioteca de teste instalada, framework pendente. |
| `docs/engineering/frontend-guidelines.md` | Atualizado: react-router-dom marcado como "ainda não instalado" com referência a knowledge-gaps.md. |
| `docs/engineering/routes.md` | Atualizado: react-router-dom marcado como "ainda não instalada" com referência a knowledge-gaps.md. |
| `docs/engineering/http-client.md` | Atualizado: interceptores marcados como "não implementados" com TODO e referência a knowledge-gaps.md. |
| `docs/engineering/INDEX.md` | Atualizado: adicionados 11 novos documentos, removidos placeholders "ausência de diretriz". |
| `docs/context-map.yaml` | Atualizado: workers agora referenciam arquivos reais (backend-guidelines, frontend-guidelines, etc.) e knowledge-gaps.md. |
| `docs/repository-manifest.yaml` | Atualizado: dependências reais do package.json com versões, lista de absent-from-repository atualizada. |
| `docs/README.md` | Atualizado: adicionada linha "Conhecimento" ao índice de áreas. |

## Decisões Pendentes Registradas (para Executive Board)

| # | Pendência | Prioridade | Referência |
|---|---|---|---|
| 1 | Biblioteca de roteamento (frontend) | alta | knowledge-gaps.md §1 |
| 2 | Biblioteca de testes (frontend + backend) | alta | knowledge-gaps.md §2 |
| 3 | Remover `frontend/src/services/auth.service.ts` (legado) | alta | knowledge-gaps.md §3 |
| 4 | Renomear `LoginPage.tsx` → `login.page.tsx` | média | knowledge-gaps.md §4 |
| 5 | Conflito ADR-017 vs. código real (localStorage vs. cookies) | alta | knowledge-gaps.md §5 |
| 6 | ADR-006 nunca preenchida | alta | knowledge-gaps.md §6 |
| 7 | Response format inconsistente (/register vs. /login) | média | knowledge-gaps.md §7 |
| 8 | Interceptors HTTP não implementados | alta | knowledge-gaps.md §8 |
| 9 | ProtectedRoute e rotas não implementadas | alta | knowledge-gaps.md §9 |
| 10 | Prettier não configurado no frontend | média | knowledge-gaps.md §10 |
| 11 | LoginUseCase usa Error genérico | baixa | knowledge-gaps.md §11 |
| 12 | VITE_API_URL não utilizado | baixa | knowledge-gaps.md §12 |
| 13 | Config backend vazio | baixa | knowledge-gaps.md §13 |
| 14 | Repository manifest desatualizado | baixa | knowledge-gaps.md §14 |

## Nenhum ADR Foi Alterado

Conforme regra, nenhum ADR existente foi modificado. O conflito ADR-017 vs. código real foi registrado em `knowledge-gaps.md` para decisão do Executive Board.

## Bug Corrigido

- `docs/decision-tree.yaml` referenciava `docs/engineering/backend-guidelines.md` (que não existia). O arquivo foi criado com conteúdo real. A referência agora está válida.

## Inconsistências Documentadas (não silenciadas)

- Duplicação de `auth.service.ts` → documentada em knowledge-gaps.md §3.
- Nomenclatura `LoginPage.tsx` vs. `register.page.tsx` → documentada em knowledge-gaps.md §4.
- Response format inconsistente → documentada em knowledge-gaps.md §7.

---

## Related Documents

- [Documentation Index](README.md)
- [Knowledge Gaps](knowledge/knowledge-gaps.md)
- [Documentation Report](documentation-report.md)
