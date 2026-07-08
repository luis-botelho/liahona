# Development Workflow

## Filosofia

Nenhuma linha de código é escrita antes de:

- Vision
- Backlog
- Epic
- Story
- Task

---

## Fluxo

Issue

↓

Branch

↓

Implementação

↓

Testes

↓

Commit

↓

PR

↓

Review

↓

Merge

↓

Release

---

## Commits

Seguimos Conventional Commits.

Exemplos:

feat(auth): add login endpoint

fix(api): validate email

docs(readme): update project overview

refactor(user): simplify validation

test(auth): add login tests

chore(release): v0.1.0-foundation

---

## Releases

Toda release deve:

✔ possuir changelog

✔ possuir tag

✔ estar sincronizada com GitHub

✔ representar um estado estável

---

## Definition of Ready

Uma task só pode ser iniciada quando:

- Epic existe
- Story existe
- Critérios de aceite definidos
- Dependências resolvidas

---

## Definition of Done

Uma task está pronta quando:

✔ Código

✔ Testes

✔ Documentação

✔ Review

✔ Merge

✔ Changelog atualizado (quando necessário)