# ADR-013 — Estratégia de Hash de Senhas

## Status

Accepted

---

## Contexto

Foi necessária a definição do algoritmo responsável pela proteção das senhas dos usuários.

As alternativas avaliadas foram:

- bcrypt
- Argon2id

---

## Problema

A autenticação do projeto exige um mecanismo seguro para armazenar credenciais sem comprometer a privacidade dos usuários.

A solução escolhida deve ser moderna, robusta e alinhada às melhores práticas de segurança atuais.

---

## Decisão

O projeto utilizará Argon2id como algoritmo oficial para armazenamento de senhas.

---

## Justificativa

- Recomendação da OWASP.
- Melhor resistência contra ataques por GPU.
- Algoritmo moderno.
- Projeto sem necessidade de compatibilidade com sistemas legados.

---

## Consequências

Nenhuma senha poderá ser armazenada em texto puro.

Todo processo de autenticação deverá utilizar Argon2id.

Mudanças futuras dependerão de nova ADR.

---

## Referências

- 18-security.md
- 06-tech-stack.md
- 10-api.md
