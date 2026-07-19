---
title: Tech Stack
description: Documento de product do projeto LIA.
area: product
tags: [product, 06-tech-stack]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 💻 Tech Stack

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento apresenta as tecnologias utilizadas no desenvolvimento do LIA e os motivos que justificam cada escolha.

A stack foi definida considerando simplicidade, produtividade, comunidade, escalabilidade e facilidade de manutenção.

Novas tecnologias somente deverão ser adotadas quando agregarem valor real ao produto.

---

# Filosofia

A escolha de tecnologias segue alguns princípios fundamentais.

## Resolver problemas antes de seguir tendências.

## Priorizar ecossistemas maduros.

## Reduzir complexidade.

## Facilitar manutenção.

## Maximizar reaproveitamento de conhecimento.

---

# Visão Geral da Stack

| Camada | Tecnologia |
|----------|------------|
| Frontend Web | React |
| Mobile | React Native |
| Backend | Node.js |
| Framework HTTP | Fastify |
| Linguagem | TypeScript |
| Banco de Dados | PostgreSQL |
| ORM | Prisma |
| API | REST |
| Autenticação | JWT |
| Hash de Senhas | Argon2id |
| Versionamento | Git |
| Repositório | GitHub |

---

# Frontend Web

## React 19

O frontend web do LIA foi projetado para oferecer uma experiência moderna, rápida e escalável, mantendo simplicidade no desenvolvimento.

### Tecnologias oficiais

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Hook Form
- Zod
- Axios

### Data Fetching

A estratégia oficial de comunicação com a API será baseada em:

- TanStack Query

Sua adoção permite:

- cache automático;
- sincronização de dados;
- invalidação inteligente;
- gerenciamento de loading;
- retry automático;
- otimizações de performance.

A comunicação HTTP será realizada utilizando Axios.

---

# Mobile

## React Native

Permite compartilhar conhecimento entre Web e Mobile.

Benefícios:

- Curva de aprendizado reduzida
- Comunidade madura
- Grande quantidade de bibliotecas
- Desenvolvimento multiplataforma

---

# Backend

## Node.js

O backend do LIA é desenvolvido utilizando tecnologias modernas do ecossistema Node.js, priorizando simplicidade, performance e manutenibilidade.

### Tecnologias oficiais

- Node.js (Runtime)
- TypeScript
- Fastify (Framework HTTP)
- Prisma ORM
- PostgreSQL
- Argon2id (Hash de senhas)
- JWT (Autenticação)

> **Fastify foi escolhido por oferecer melhor desempenho, excelente suporte ao TypeScript e arquitetura baseada em plugins, alinhando-se à filosofia de Progressive Engineering do projeto.**

---

# Linguagem

## TypeScript

Toda aplicação utilizará TypeScript.

Objetivos:

- Segurança de tipos
- Melhor documentação do código
- Melhor experiência de desenvolvimento
- Redução de erros em tempo de execução

---

# Banco de Dados

## PostgreSQL

Escolhido por:

- Robustez
- Confiabilidade
- Escalabilidade
- Excelente suporte relacional
- Software Open Source

---

# ORM

## Prisma

Escolhido para facilitar:

- Modelagem do banco
- Migrações
- Segurança de tipos
- Produtividade

---

# API

Seguiremos arquitetura REST.

Princípios:

- Recursos bem definidos
- Versionamento
- Padronização
- Baixo acoplamento

---

# Autenticação

JWT será utilizado inicialmente.

No futuro, a estratégia poderá evoluir conforme as necessidades da plataforma.

---

# Ferramentas de Desenvolvimento

- Git
- GitHub
- GitHub Projects
- GitHub Actions
- ESLint
- Prettier

---

# Qualidade

Toda tecnologia deverá atender aos seguintes critérios:

- Comunidade ativa
- Documentação oficial
- Facilidade de manutenção
- Boa integração com a stack atual
- Compatibilidade com longo prazo

---

# Tecnologias Futuras

Algumas tecnologias poderão ser incorporadas futuramente conforme a evolução do produto.

Exemplos:

- Docker
- Redis
- RabbitMQ
- ElasticSearch
- OpenTelemetry
- Kubernetes

Essas tecnologias não fazem parte do MVP e somente serão avaliadas quando houver necessidade comprovada.

---

# Processo de Escolha

Nenhuma tecnologia será adotada apenas por estar em alta.

Toda decisão deverá considerar:

- Problema resolvido
- Impacto técnico
- Complexidade adicionada
- Curva de aprendizado
- Custos de manutenção

Sempre que necessário, a decisão deverá ser registrada através de um ADR.

---

## Documentos Relacionados

- 05-architecture.md
- 09-database.md
- 10-api.md
- docs/decisions/README.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |

---

## Related Documents

- [Documentation Index](README.md)
- [Area Index](README.md)
- [Context Map](context-map.yaml)
