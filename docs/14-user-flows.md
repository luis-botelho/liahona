---
title: User Flows
description: Documento de product do projeto LIA.
area: product
tags: [product, 14-user-flows]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 🔀 User Flows

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento descreve os principais fluxos de navegação do LIA.

Seu objetivo é mapear como cada persona interage com a plataforma para atingir seus objetivos.

Os fluxos aqui descritos servirão como base para wireframes, design, desenvolvimento e testes.

---

# Princípios

Todo fluxo deve ser:

- Simples
- Objetivo
- Intuitivo
- Rápido
- Consistente

Cada etapa deve aproximar o usuário de seu objetivo.

Nunca criar passos desnecessários.

---

# Fluxo 01 — Cadastro

Persona

- João
- Carlos

Objetivo

Criar uma conta.

Fluxo

```text
Tela Inicial

↓

Criar Conta

↓

Informações Básicas

↓

Confirmação

↓

Perfil

↓

Home
```

---

# Fluxo 02 — Login

Objetivo

Entrar rapidamente na plataforma.

Fluxo

```text
Tela Inicial

↓

Login

↓

Autenticação

↓

Home
```

---

# Fluxo 03 — Completar Perfil

Persona

João

Objetivo

Criar um perfil profissional.

Fluxo

```text
Home

↓

Meu Perfil

↓

Editar Dados

↓

Adicionar Experiências

↓

Adicionar Competências

↓

Salvar
```

---

# Fluxo 04 — Publicar Serviço

Persona

Carlos

Objetivo

Divulgar seus serviços.

Fluxo

```text
Home

↓

Novo Serviço

↓

Informações

↓

Categoria

↓

Fotos

↓

Publicar
```

---

# Fluxo 05 — Buscar Profissionais

Persona

Pedro

Objetivo

Encontrar alguém para contratar.

Fluxo

```text
Home

↓

Pesquisar

↓

Filtros

↓

Lista

↓

Perfil

↓

Contato
```

---

# Fluxo 06 — Publicar Vaga

Persona

Dona Maria

Objetivo

Criar uma oportunidade de trabalho.

Fluxo

```text
Home

↓

Nova Vaga

↓

Descrição

↓

Requisitos

↓

Publicar
```

---

# Fluxo 07 — Candidatar-se

Persona

João

Objetivo

Enviar candidatura.

Fluxo

```text
Vaga

↓

Detalhes

↓

Candidatar-se

↓

Confirmação
```

---

# Fluxo 08 — Avaliar Usuário

Objetivo

Registrar uma experiência após um serviço.

Fluxo

```text
Serviço Finalizado

↓

Avaliar

↓

Comentário

↓

Enviar
```

---

# Fluxo 09 — Conversar

Objetivo

Facilitar comunicação.

Fluxo

```text
Perfil

↓

Chat

↓

Mensagens

↓

Encerrar
```

---

# Evolução

Novos fluxos deverão ser adicionados conforme o crescimento da plataforma.

Sempre que um fluxo sofrer alterações significativas, este documento deverá ser atualizado antes da implementação.

---

# Filosofia

Fluxos representam jornadas humanas.

Não desenhamos apenas telas.

Desenhamos experiências.

Quanto menor o esforço necessário para atingir um objetivo, melhor será a experiência do usuário.

---

## Documentos Relacionados

- 15-wireframes.md
- 16-personas.md
- 04-backlog.md
- 08-design-system.md

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
