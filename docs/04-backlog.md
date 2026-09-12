---
title: Backlog Master
description: Documento de product do projeto LIA.
area: product
tags: [product, 04-backlog]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 📚 Backlog Master

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 2.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento estabelece as regras de organização do desenvolvimento do LIA.

O Backlog Master define como funcionalidades são propostas, planejadas, priorizadas, implementadas e entregues.

Este documento deve ser considerado a principal referência para o gerenciamento do produto.

---

# Princípios

O backlog existe para organizar ideias, reduzir riscos e garantir que o desenvolvimento permaneça alinhado à visão do projeto.

Nenhuma funcionalidade será desenvolvida sem antes passar pelo processo de planejamento descrito neste documento.

---

# Hierarquia de Planejamento

Todo trabalho deverá seguir a seguinte estrutura:

```text
Vision

↓

Roadmap

↓

Milestone

↓

Epic

↓

User Story

↓

Task

↓

Subtask

↓

Código
```

Nenhuma etapa deve ser ignorada.

---

# Fluxo de Desenvolvimento

Todo item seguirá obrigatoriamente o fluxo abaixo:

```text
Idea

↓

Backlog

↓

Ready

↓

In Progress

↓

Review

↓

Testing

↓

Done
```

Caso uma atividade seja bloqueada, ela receberá a label **blocked** até que o impedimento seja resolvido.

---

# Current MVP Delivery Focus

Durante a corrida do MVP seguimos um fluxo enxuto, sem cerimônia:

```text
Plan
→ Implement
→ Test
→ Review
→ Ship
```

## Status resumido

**DONE ATUAL**

- Auth
- Roles atuais
- Worker/Recruiter profiles
- Opportunities
- Deterministic matching
- Applications (interesse/candidatura única)
- Recruiter candidates
- WhatsApp infrastructure
- Onboarding
- CI
- Public Opportunity Experience
- Guest Interest Flow
- Progressive Authentication (login/registro com return-to para a oportunidade)
- Worker Professional Profile (título profissional, disponibilidade, cargos desejados, preferências, visibilidade para recrutadores, score de completude)
- Application History (trabalhador acompanha suas candidaturas e status)
- Recruiting Pipeline (status do candidato: em análise, entrevista, aprovado, rejeitado; trabalhador pode retirar candidatura)
- Backend test foundation (vitest + CI para regras de negócio e matching)
- Curriculum PDF (geração de currículo com dados reais; versão direcionada por oportunidade)
- Learning foundation (catálogo de cursos LIA/externos, recomendação por interesses e lacunas de habilidades, matrícula, progresso por aula, conclusão e certificado verificável)
- Privacy/LGPD controls (consentimentos, exportação de dados, exclusão de conta com cascata)

**CURRENT**

- Targeted Curriculum (polish) — básico entregue com o Curriculum PDF

**NEXT**

- Local Tasks & Services
- Educator Profile & Internal Course Creation
- Manual Opportunity Curation
- Recruiter Notifications

Não apagamos histórico útil: os itens DONE representam o que já foi construído e validado.

---

# Priorização

O backlog é organizado por prioridade (P0 → P3).

Nenhuma feature abaixo é uma ordem rígida de implementação — é uma priorização que reflete a direção atual do produto.

## P0 — Fundação pública e identidade

- Public Opportunity Experience ✅
- Guest Interest Flow ✅
- Progressive Authentication ✅
- Worker Professional Profile ✅
- Recruiter & Opportunities ✅
- Opportunity Matching ✅
- Worker Radar ✅ (recomendação por score; notificação WhatsApp com opt-in)

## P1 — Personalização e recrutamento

- Application History ✅
- Recruiting Pipeline ✅
- Curriculum PDF ✅
- Targeted Curriculum ✅ (básico)
- Learning foundation ✅ (catálogo, matrícula, progresso, certificados)
- Talent Radar
- Recruiter Notifications
- Local Tasks & Services
- Manual Opportunity Curation
- Privacy/LGPD Controls ✅ (exportação de dados, exclusão de conta, painel de consentimentos)

## P2 — Aprendizagem, IA e governança

- Learning Catalog
- Learning Paths (foundation entregue: catálogo, matrícula, progresso, certificados)
- EducatorProfile
- Internal Courses (criação de cursos dentro da plataforma)
- AI Resume Assistant
- Opportunity Discovery Agent
- Normalization
- Deduplication
- Trust/Moderation

## P3 — Ecossistema e monetização futura

- Education Partnerships
- Merchant Association
- Recruiter Insights
- Reputation
- Rewards
- Monetization

---

# LGPD e Privacidade

A LGPD e a privacidade são requisitos transversais.

Consentimentos e preferências devem ser separados por finalidade:

- receber Radar por WhatsApp;
- permitir recrutadores encontrarem o perfil;
- tornar perfil público;
- receber recomendações;
- receber comunicações promocionais.

Deve ser previsto no roadmap:

- acesso aos dados;
- edição;
- exportação;
- exclusão;
- controle de visibilidade.

Princípios de produto: minimização, finalidade, transparência.

O LIA pretende atuar como plataforma de conexão/intermediação, sujeita às obrigações legais aplicáveis.

---

# Organização das Milestones

As milestones representam as grandes fases do produto.

Cada Epic pertence obrigatoriamente a uma milestone.

Cada User Story pertence obrigatoriamente a uma Epic.

Cada Task pertence obrigatoriamente a uma User Story.

Essa estrutura garante rastreabilidade entre visão, planejamento e implementação.

---

# Organização das Issues

Toda Issue deverá conter:

- Título
- Descrição
- Objetivo
- Contexto
- Critérios de Aceite
- Dependências
- Checklist
- Labels
- Milestone

Nenhuma Issue poderá ser criada incompleta.

---

# Definition of Ready

Uma tarefa somente poderá iniciar desenvolvimento quando possuir:

- Objetivo claramente definido
- Escopo compreendido
- Critérios de aceite
- Dependências identificadas
- Labels atribuídas
- Milestone definida
- Epic relacionada

---

# Definition of Done

Uma tarefa será considerada concluída somente quando:

- Código implementado
- Revisão concluída
- Testes realizados
- Documentação atualizada
- Build sem erros
- Merge realizado

---

# Critérios de Priorização

Toda priorização seguirá a seguinte ordem:

1. Valor entregue ao usuário
2. Dependências técnicas
3. Impacto estratégico
4. Complexidade de implementação

Ideias interessantes não possuem prioridade automática.

---

# Estimativa de Tamanho

Todas as Tasks deverão possuir uma estimativa.

| Label | Descrição |
|--------|-----------|
| XS | Muito pequena |
| S | Pequena |
| M | Média |
| L | Grande |
| XL | Muito grande |

Caso uma Task seja classificada como XL, deve ser avaliada a possibilidade de dividi-la em tarefas menores.

---

# Convenção de Branches

Seguiremos a seguinte estratégia:

```text
main

develop

feature/

fix/

hotfix/

release/
```

Branches devem possuir nomes claros e relacionados à Issue correspondente.

---

# Convenção de Commits

Sempre que possível, seguiremos o padrão Conventional Commits.

Exemplos:

```text
feat:

fix:

docs:

refactor:

test:

chore:
```

---

# Filosofia de Desenvolvimento

No LIA acreditamos que:

- Pensar vem antes de programar.
- Documentar vem antes de implementar.
- Validar vem antes de escalar.
- Simplicidade vence complexidade.
- Qualidade supera velocidade.

---

# Regras do Projeto

## Consistência

As labels oficiais do projeto são permanentes.

Novas labels somente poderão ser adicionadas após revisão da organização geral do projeto.

---

## Milestones

As milestones representam fases estratégicas do produto.

Mudanças devem ser excepcionais.

---

## Documentação

Toda decisão relevante deverá ser documentada.

Sempre que possível, utilizar ADRs para registrar decisões arquiteturais importantes.

---

## Código

Código deve ser escrito para pessoas.

Computadores apenas executam.

---

# Objetivo Final

Construir um produto sustentável, organizado e escalável, capaz de evoluir durante anos sem perder clareza, qualidade ou consistência.

Mais do que entregar funcionalidades, buscamos construir um software que possa ser compreendido, mantido e expandido por qualquer colaborador que venha a participar do projeto.

---

## Documentos Relacionados

- 01-vision.md
- 03-roadmap.md
- 05-architecture.md
- 11-contributing.md
- docs/decisions/README.md

---

## Future Ideas (Icebox)

- Programa de Embaixadores

- Patrocínio

- Open Source

- API Pública

- Marketplace

- Mentorias

- Eventos

- Newsletter

- Instagram Oficial

- LinkedIn Oficial

- Campanhas de Divulgação

- Crowdfunding

- Analytics Público

- Dashboard da Comunidade

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |
| 08/09/2026 | 2.0.0 | Reescrita do "Current MVP Delivery Focus": adição de status (DONE ATUAL, CURRENT, NEXT) e reestruturação por prioridade P0/P1/P2/P3. Adição de diretrizes LGPD/privacidade. |
| 11/09/2026 | 2.1.0 | Worker Professional Profile concluído (P0). Fundação de testes no backend (vitest + CI). CURRENT/NEXT atualizado para Application History e Recruiting Pipeline. Prioridades P0 marcadas conforme estado real. |
| 11/09/2026 | 2.2.0 | Application History e Recruiting Pipeline concluídos (P1): status de candidatura (APPLIED/REVIEWING/INTERVIEW/APPROVED/REJECTED/WITHDRAWN), endpoint de histórico do trabalhador, mudança de status pelo recrutador e retirada pelo trabalhador. CURRENT atualizado para Curriculum PDF. |
| 11/09/2026 | 2.3.0 | Curriculum PDF e Targeted Curriculum concluídos (P1): geração de PDF com dados reais do perfil e versão direcionada por oportunidade (habilidades relevantes priorizadas). CURRENT atualizado. |
| 11/09/2026 | 2.4.0 | Learning foundation concluída (P1/P2): modelo de cursos (LIA/externo), lições, matrícula, progresso por aula, conclusão e certificado único/verificável (código público). Recomendação de cursos por interesses e lacunas de habilidades. UI: catálogo "Aprender", detalhe do curso e página pública do certificado. |
| 11/09/2026 | 2.5.0 | Privacy/LGPD controls (P1): endpoint de exportação de dados (acesso/portabilidade), exclusão de conta com remoção em cascata (esquecimento) e painel de privacidade na UI com consentimentos, export e exclusão confirmada. `Opportunity.author` agora apaga em cascata. |

| 11/09/2026 | 2.5.0 | Privacy/LGPD controls concluídos (P1): exportação de dados do usuário (portabilidade, JSON com perfil, oportunidades, candidaturas, matrículas e certificados), exclusão de conta com remoção em cascata (direito ao esquecimento) e painel de consentimentos/privacidade na UI (consents exibidos e documentos). CHANGELOG atualizado. |

Ja fizemos 51 PRs - para melhorar a performance, vou compactar: apenas merges e commits essenciais a partir de agora.
---

## Related Documents

- [Documentation Index](README.md)
- [Area Index](README.md)
- [Context Map](context-map.yaml)
