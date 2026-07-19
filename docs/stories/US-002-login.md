---
title: 👤 User Story
description: Documento de product do projeto LIA.
area: product
tags: [product, us-002-login]
used-by: [analysis, development, review]
priority: high
last-reviewed: 2026-07-18
---

# 👤 User Story

## 🆔

US-002 — Login de Usuário

---

## 📖 Como

Usuário cadastrado (trabalhador, empresa ou administrador)

---

## 🎯 Quero

Realizar login utilizando meu e-mail e senha.

---

## 💙 Para

Acessar as funcionalidades protegidas da plataforma de forma segura.

---

# 📌 Valor de Negócio

O login estabelece a identidade do usuário dentro do LIA.

Sem autenticação não é possível oferecer recursos personalizados, proteger dados ou construir uma reputação confiável.

Esta User Story inaugura oficialmente a camada de autenticação do sistema.

---

# 📦 Escopo

Inclui:

- Login utilizando e-mail
- Login utilizando senha
- Validação das credenciais
- Geração de JWT
- Retorno das informações básicas do usuário
- Tratamento de erros
- Persistência da sessão no frontend
- Redirecionamento após autenticação

Não inclui:

- Logout
- Recuperação de senha
- Refresh Token
- OAuth
- MFA
- Remember Me

Esses itens pertencem às próximas User Stories.

---

# 👥 Usuários Impactados

🧑 Trabalhadores

🏢 Empresas

🛡️ Administradores

---

# 🔗 Dependências

✅ US-001 concluída

---

# 📋 Critérios de Aceite

- [ ] Usuário consegue informar e-mail e senha.
- [ ] Credenciais válidas autenticam corretamente.
- [ ] Credenciais inválidas retornam erro apropriado.
- [ ] Senha é validada utilizando Argon2id.
- [ ] JWT é gerado corretamente.
- [ ] Frontend armazena a sessão conforme arquitetura definida.
- [ ] Usuário é redirecionado após login.
- [ ] Rotas protegidas reconhecem o usuário autenticado.

---

# 📚 Documentação Impactada

- API
- Architecture
- Security
- Changelog
- Sprint Journal

---

# 🌱 Impacto na Comunidade

Uma autenticação segura fortalece a confiança na plataforma e garante que trabalhadores, empresas e administradores acessem apenas os recursos apropriados ao seu perfil.

---

# ✅ Definition of Done

- Todas as Tasks concluídas.
- Testes aprovados.
- Review aprovado.
- Learn Log registrado.
- Documentação atualizada.
- Product Office homologou a entrega.

---

## Related Documents

- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
