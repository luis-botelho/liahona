# ADR-001 — Adoção de uma Stack JavaScript/TypeScript Full Stack

> **Status:** Accepted
>
> **Data:** 03/07/2026

---

# Contexto

O LIA será composto por múltiplas aplicações:

- Frontend Web
- Aplicativo Mobile
- Backend
- Painel Administrativo

Era necessário definir uma stack tecnológica que reduzisse a complexidade do desenvolvimento e facilitasse a evolução do produto.

---

# Decisão

Adotar JavaScript/TypeScript como linguagem principal de toda a plataforma.

A stack inicial será composta por:

- React
- React Native
- Node.js
- TypeScript
- PostgreSQL
- Prisma

---

# Justificativa

Essa decisão reduz significativamente a troca de contexto entre aplicações.

Permite compartilhar conhecimento entre frontend, backend e mobile.

Facilita manutenção.

Reduz curva de aprendizado.

Aumenta produtividade.

Possui enorme comunidade.

Possui excelente mercado.

---

# Alternativas Consideradas

## Java + Spring

Excelente robustez.

Maior complexidade para um time pequeno.

---

## C# + .NET

Excelente ecossistema.

Curva de aprendizado maior para o momento atual do projeto.

---

## Flutter

Boa experiência mobile.

Não compartilha conhecimento com React Web.

---

## Python

Excelente para diversas aplicações.

Menor alinhamento com a estratégia Full Stack adotada.

---

# Consequências

## Positivas

- Uma única linguagem predominante.
- Menor curva de aprendizado.
- Maior velocidade de desenvolvimento.
- Compartilhamento de conhecimento.
- Grande disponibilidade de documentação.

---

## Negativas

- Dependência maior do ecossistema JavaScript.
- Algumas bibliotecas evoluem rapidamente, exigindo atualização constante.

---

# Revisão

Esta decisão poderá ser revisada caso existam mudanças significativas nos objetivos do projeto ou no ecossistema tecnológico.

---

# Referências

- 05-architecture.md
- 06-tech-stack.md