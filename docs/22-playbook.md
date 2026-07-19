---
title: 📖 Playbook LIA
description: Documento de product do projeto LIA.
area: product
tags: [product, 22-playbook]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 📖 Playbook LIA

> "Não desenvolvemos funcionalidades. Desenvolvemos produto."

Este documento define como o LIA é planejado, desenvolvido, documentado e evoluído.

Todo colaborador deve seguir este Playbook.

---

# 🧭 Filosofia

Antes de escrever qualquer linha de código devemos responder:

- Qual problema estamos resolvendo?
- Quem será beneficiado?
- Em qual Epic essa funcionalidade pertence?
- Existe uma User Story para ela?
- O valor entregue justifica sua implementação?

No LIA:

> Produto antes de tecnologia.

---

# 🌱 Ritual de Desenvolvimento

Todo desenvolvimento segue obrigatoriamente o fluxo abaixo.

```text
💡 Ideia

        ↓

📦 Identificar a Epic

        ↓

📚 Refinar User Story

        ↓

✅ Definition of Ready (DoR)

        ↓

📝 Criar Task

        ↓

🌿 Criar Branch

        ↓

💻 Desenvolver

        ↓

🧪 Testar

        ↓

📚 Atualizar Documentação

        ↓

🔍 Checkup

        ↓

📤 Commit

        ↓

☁️ Push

        ↓

🔀 Pull Request

        ↓

👀 Review

        ↓

✅ Merge

        ↓

📈 Atualizar GitHub Projects

        ↓

🏁 Fechar Task

        ↓

🏆 Fechar User Story

        ↓

🎉 Sprint Review
```

---

# ✅ Definition of Ready (DoR)

Nenhuma Task pode iniciar sem que todos os itens abaixo estejam atendidos.

```
☐ Epic definida

☐ User Story refinada

☐ Critérios de aceite definidos

☐ Escopo compreendido

☐ Dependências identificadas

☐ Arquitetura conhecida

☐ Dúvidas esclarecidas
```

---

# 🌿 Estratégia de Branches

## Branch principal

```
main
```

A branch `main` representa sempre uma versão estável.

Nunca desenvolvemos diretamente nela.

Todo trabalho ocorre em branches temporárias.

---

## Features

```
feature/us-001-register-user

feature/us-014-create-service

feature/us-022-rate-worker
```

---

## Documentação

```
docs/playbook

docs/readme

docs/api

docs/epics
```

---

## Correções

```
fix/login-validation
```

---

## Refatoração

```
refactor/auth-module
```

---

## Hotfix

```
hotfix/login-crash
```

---

# 📝 Commits

Seguimos o padrão **Conventional Commits**.

Formato:

```
tipo(contexto): descrição
```

Exemplos:

```text
feat(auth): create user registration

fix(api): validate cpf

docs(playbook): update development flow

refactor(database): simplify repositories

test(auth): add registration tests

chore(release): v0.2.0
```

---

# 📚 Documentação Obrigatória

Código e documentação evoluem juntos.

Antes do Merge verificar se algum documento precisa ser atualizado.

Checklist:

```
☐ README

☐ Changelog

☐ Sprint Journal

☐ Architecture

☐ Database

☐ API

☐ Security

☐ Testing

☐ ADR

☐ Epic

☐ Story

☐ Glossary
```

---

# 🔍 Checkup Antes do Commit

Antes de criar um Commit responder:

```
☐ Estou na branch correta?

☐ A Task foi concluída?

☐ A User Story continua válida?

☐ Os testes passaram?

☐ Atualizei a documentação?

☐ Rodei git status?

☐ O Commit segue Conventional Commits?

☐ Estou pronto para abrir um Pull Request?
```

---

# ✔️ Definition of Done (DoD)

Uma Task só pode ser considerada concluída quando:

```
☐ Código implementado

☐ Testes executados

☐ Critérios de aceite atendidos

☐ Documentação atualizada

☐ Pull Request aprovado

☐ Merge realizado

☐ GitHub Projects atualizado
```

---

# 🏛️ Constituição do LIA

## Regras de Ouro

⭐ Nada entra em código sem pertencer a uma Epic.

⭐ Toda Epic possui User Stories.

⭐ Toda User Story possui Tasks.

⭐ Toda Task possui Definition of Ready.

⭐ Toda Task possui Definition of Done.

⭐ Código e documentação evoluem juntos.

⭐ A branch `main` é sagrada.

⭐ Todo desenvolvimento acontece em branches.

⭐ Antes de automatizar, compreender o problema.

⭐ Simplicidade antes de complexidade.

⭐ Produto antes de tecnologia.

⭐ Melhorar o processo faz parte do desenvolvimento.

---

# 🤖 Uso de Inteligência Artificial

A Inteligência Artificial faz parte do processo de engenharia do LIA.

Ela acelera pesquisas, auxilia na implementação e apoia decisões técnicas.

Entretanto:

- IA não substitui pensamento crítico.
- IA não substitui arquitetura.
- IA não substitui decisões de produto.

Ferramentas como ChatGPT, Codex, Copilot, NotebookLM e outras possuem papel consultivo.

A responsabilidade final sobre qualquer decisão pertence à equipe do projeto.

---

# 📦 Gestão do Produto

Todo desenvolvimento segue a hierarquia:

```text
Milestone

↓

Epic

↓

User Story

↓

Task

↓

Código
```

Nenhuma funcionalidade deve "pular" etapas.

---

# 🎉 Ritual de Encerramento da Sprint

Ao final de cada Sprint responder:

```
🎯 O objetivo foi alcançado?

📦 O backlog foi atualizado?

📚 A documentação continua consistente?

🧪 Os testes passaram?

🚀 O GitHub representa o estado real do projeto?

📝 O Changelog foi atualizado?

📖 O Sprint Journal foi atualizado?

🎉 O que aprendemos?

💡 O que melhoraremos na próxima Sprint?
```

---

# 💙 Cultura LIA

O LIA é desenvolvido como um produto real.

Cada documento preserva conhecimento.

Cada ADR registra uma decisão.

Cada Epic representa um objetivo.

Cada Story entrega valor.

Cada Task aproxima o produto da comunidade.

Construímos software.

Construímos conhecimento.

Construímos um processo.

Porque acreditamos que grandes produtos nascem de boas decisões, não de grandes quantidades de código.

---

> "Software é a consequência. Produto é a intenção."

---

## Related Documents

- [Documentation Index](README.md)
- [Area Index](README.md)
- [Context Map](context-map.yaml)
