---
title: Database
description: Documento de product do projeto LIA.
area: product
tags: [product, 09-database]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 🗄 Database

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento define os princípios utilizados na modelagem do banco de dados do LIA.

Seu objetivo é garantir consistência, integridade e escalabilidade durante toda a evolução da plataforma.

A modelagem deverá representar o negócio da forma mais fiel possível, evitando duplicidade de informações e facilitando futuras expansões.

---

# Filosofia

O banco de dados representa a memória do LIA.

Cada tabela existe para armazenar informações relevantes do negócio.

Modelamos entidades do mundo real, não telas da aplicação.

---

# Princípios

## Integridade

Os dados devem permanecer consistentes durante todo o ciclo de vida da aplicação.

---

## Clareza

Nomes de tabelas, colunas e relacionamentos devem ser autoexplicativos.

---

## Normalização

Sempre que possível, evitar redundância de dados.

Duplicação somente será aceita quando houver justificativa técnica.

---

## Escalabilidade

A estrutura deverá permitir crescimento sem necessidade de grandes reestruturações.

---

## Auditoria

Sempre que fizer sentido, registrar informações de criação, atualização e exclusão lógica.

---

# Convenções

## Idioma

Toda estrutura será escrita em inglês.

---

## Nomeação

Utilizar nomes claros.

Exemplos:

users

jobs

companies

services

applications

ratings

---

## Chaves Primárias

Todas as entidades utilizarão identificadores únicos.

---

## Datas

Sempre armazenar:

createdAt

updatedAt

Quando necessário:

deletedAt

---

# Entidades Principais

A modelagem inicial deverá contemplar entidades como:

- Users
- Profiles
- Companies
- Jobs
- Applications
- Services
- Categories
- Skills
- Ratings
- Messages
- Conversations
- Notifications

Novas entidades poderão ser adicionadas conforme evolução do produto.

---

# Relacionamentos

Os relacionamentos deverão representar regras reais do negócio.

Sempre priorizar integridade referencial.

Evitar relacionamentos desnecessariamente complexos.

---

# Evolução

Mudanças estruturais deverão ocorrer através de migrations.

Nunca alterar diretamente bancos em produção.

---

# Segurança

Dados sensíveis deverão receber tratamento adequado.

Sempre considerar:

- Criptografia
- Restrições
- Índices
- Integridade
- Performance

---

# Documentação

Toda alteração relevante na modelagem deverá atualizar:

- Diagrama ER
- Documentação
- ADR, quando necessário

---

# Filosofia

O banco de dados deve representar o negócio.

Nunca a interface.

As telas podem mudar.

O modelo de domínio deve permanecer consistente.

---

## Documentos Relacionados

- 05-architecture.md
- 06-tech-stack.md
- 10-api.md
- 14-user-flows.md

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
