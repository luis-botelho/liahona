---
title: 👤 US-001 - Cadastro de Usuário
description: Documento de product do projeto LIA.
area: product
tags: [product, us-001-register-user]
used-by: [analysis, development, review]
priority: high
last-reviewed: 2026-07-18
---

# 👤 US-001 — Cadastro de Usuário

## 🎯 Objetivo

Permitir que um novo usuário crie uma conta na plataforma LIA.

---

## 👤 Persona

Visitante

---

## 📝 História

Como visitante,

quero criar uma conta,

para acessar os recursos da plataforma.

---

## ✅ Critérios de Aceite

- Cadastro por e-mail
- Nome obrigatório
- Senha criptografada
- Confirmação de senha
- Validação dos campos
- Mensagens de erro claras
- Usuário salvo no banco

---

## ❌ Fora do Escopo

- Login Social
- Recuperação de senha
- Confirmação por e-mail
- MFA

---

## 🔗 Dependências

- EPIC-001
- Banco de dados
- API Auth

---

## 📚 Documentação impactada

- Database
- API
- Architecture
- Changelog

---

## ✔️ Definition of Done

- Story implementada
- Testes passando
- Documentação atualizada
- Review realizado

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
