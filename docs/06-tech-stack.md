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
| Linguagem | TypeScript |
| Banco de Dados | PostgreSQL |
| ORM | Prisma |
| API | REST |
| Autenticação | JWT |
| Versionamento | Git |
| Repositório | GitHub |

---

# Frontend Web

## React

Escolhido por possuir:

- Ecossistema consolidado
- Grande comunidade
- Alta produtividade
- Excelente integração com TypeScript
- Componentização
- Facilidade de manutenção

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

Responsável pelas regras de negócio.

Motivos da escolha:

- Excelente desempenho para aplicações web
- Grande ecossistema
- Mesmo idioma utilizado no Frontend
- Facilidade de contratação futura
- Alta produtividade

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
