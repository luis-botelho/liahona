# 📜 Architectural Decisions

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento centraliza todas as decisões arquiteturais e técnicas do projeto.

Cada decisão relevante deverá ser registrada através de uma ADR (Architecture Decision Record).

Nosso objetivo é preservar o histórico das decisões, evitando perda de contexto durante a evolução do produto.

---

# O que é uma ADR?

Uma ADR registra uma decisão importante tomada durante o desenvolvimento.

Ela responde perguntas como:

- Qual problema existia?
- Qual decisão foi tomada?
- Por que essa decisão foi escolhida?
- Quais alternativas foram consideradas?
- Quais são suas consequências?

Mais importante do que registrar a decisão é registrar o raciocínio utilizado.

---

# Quando criar uma ADR?

Uma ADR deverá ser criada quando houver decisões que impactem a arquitetura, a organização do projeto ou a estratégia técnica.

Exemplos:

- Escolha de tecnologias
- Mudanças arquiteturais
- Estratégias de autenticação
- Integrações importantes
- Alterações significativas na modelagem de dados
- Definição de padrões técnicos

Pequenas decisões de implementação não precisam de ADR.

---

# Estrutura das ADRs

Todas as ADRs deverão seguir o mesmo formato.

- Contexto
- Problema
- Decisão
- Justificativa
- Alternativas consideradas
- Consequências
- Status
- Data
- Referências

---

# Status possíveis

Uma ADR poderá possuir um dos seguintes estados:

- Proposed
- Accepted
- Deprecated
- Superseded

Quando uma decisão substituir outra, a ADR original deverá apontar para sua sucessora.

---

# Índice

## ADR-001

**Título**

Adoção da Stack JavaScript/TypeScript Full Stack

**Status**

Accepted

**Resumo**

Define a utilização de React, React Native, Node.js, TypeScript, PostgreSQL e Prisma como base tecnológica inicial do projeto.

---

## Próximas ADRs previstas

- ADR-002 — Arquitetura REST
- ADR-003 — Organização em Camadas
- ADR-004 — Estratégia de Autenticação
- ADR-005 — Modelagem Inicial do Banco
- ADR-006 — Convenção de Branches
- ADR-007 — Estratégia de Deploy

Essas ADRs serão criadas apenas quando as respectivas decisões forem oficialmente tomadas.

---

# Filosofia

Boas decisões são documentadas.

Ótimas decisões também registram os motivos que levaram até elas.

As ADRs representam a memória técnica do projeto.

---

## Documentos Relacionados

- 05-architecture.md
- 06-tech-stack.md
- 09-database.md
- 10-api.md
- 11-contributing.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 04/07/2026 | 1.0.0 | Criação do documento |