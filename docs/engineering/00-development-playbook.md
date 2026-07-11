# LIA Development Playbook

> "Um bom software nasce muito antes da primeira linha de código."

## Introdução

Este documento define a forma oficial como desenvolvemos software nos projetos da organização.

Mais do que um conjunto de regras, este playbook representa nossa cultura de engenharia.

Acreditamos que software é resultado de boas decisões, documentação clara, comunicação eficiente e evolução contínua.

Tecnologias mudam.

Processos amadurecem.

Produtos evoluem.

Nossa forma de trabalhar deve permanecer consistente.

---

# Princípios

Todo desenvolvimento deve respeitar os seguintes princípios:

* Documentation First
* Community First
* Progressive Engineering
* Simplicidade antes da complexidade
* Qualidade acima da velocidade
* Pequenas entregas constantes
* Código é consequência do planejamento

---

# Nosso Ritual de Desenvolvimento

Toda funcionalidade percorre obrigatoriamente o seguinte fluxo:

Ideia

↓

Vision

↓

Backlog

↓

Epic

↓

User Stories

↓

Tasks

↓

Sprint Planning

↓

Branch

↓

Desenvolvimento

↓

Testes

↓

Review

↓

Merge

↓

Release

↓

Changelog

Nenhuma etapa deve ser ignorada.

---

# Antes de Programar

Antes de abrir o editor de código, responda:

* Esta funcionalidade existe no Backlog?
* Ela pertence a uma Epic?
* Existe uma User Story?
* Existe uma Task definida?
* Os critérios de aceite estão claros?

Se alguma resposta for "não", pare e volte ao planejamento.

---

# Início do Dia

Antes de escrever código:

1. Atualizar a branch principal.
2. Ler a Epic da Sprint.
3. Revisar a User Story.
4. Confirmar a Task.
5. Criar a branch de trabalho.
6. Iniciar o desenvolvimento.

---

# Branches

Seguimos uma convenção simples e previsível.

feature/EPIC-001-login

feature/EPIC-003-user-profile

fix/EPIC-002-validation

docs/update-readme

chore/dependencies

---

# Commits

Utilizamos Conventional Commits.

Exemplos:

feat(auth): add login endpoint

fix(api): validate email

docs(playbook): update workflow

refactor(user): simplify service

test(auth): add login tests

chore(release): publish v1.0.0

Cada commit deve representar uma alteração coesa.

---

# Antes do Commit

Confirme:

* O código funciona.
* Não existem arquivos temporários.
* A documentação foi atualizada quando necessário.
* A Task está concluída.
* Os testes passaram.

---

# Pull Request

Todo Pull Request deve responder:

* O que foi desenvolvido?
* Qual problema resolve?
* Existe impacto em outras áreas?
* Existe ADR relacionada?
* Existe documentação atualizada?

---

# Após o Merge

Após concluir uma entrega:

* Atualizar o Changelog quando necessário.
* Encerrar a Task.
* Atualizar o status da Story.
* Revisar a Sprint.
* Planejar a próxima entrega.

---

# Filosofia

Nosso objetivo não é escrever mais código.

Nosso objetivo é construir produtos sustentáveis.

Planejamos antes de desenvolver.

Documentamos antes de decidir.

Evoluímos continuamente.

Porque acreditamos que software é muito mais do que programação.

Software é coordenação entre pessoas, decisões e tempo.
