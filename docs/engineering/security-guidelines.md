---
title: Security Guidelines
description: Diretrizes de segurança do projeto LIA.
area: engineering
tags: [engineering, security, authentication, password-hash]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# Security Guidelines

## Autenticação

- JWT com `@fastify/jwt` (ADR-017).
- <!-- DECISÃO PENDENTE: A ADR-017 define HTTP Only Cookies como estratégia oficial,
     mas o código atual usa localStorage + Bearer Token. Ver knowledge-gaps.md. -->
- Estratégia atual no código: `localStorage` com chave `@lia:token` + header `Authorization: Bearer`.
- Estratégia aprovada na ADR-017: HTTP Only Cookies via `Set-Cookie`.

## Senhas

- Hash com **Argon2id** (ADR-013) via biblioteca `argon2`.
- Nunca armazenar senhas em texto plano.
- Nunca retornar o campo `password` em respostas da API.

## Variáveis Sensíveis

- `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN` em `.env`.
- Nunca commitar `.env` no repositório.
- Usar `.env.example` (ou equivalente) para documentar variáveis necessárias.

## CORS

- Configurado com `origin: true` em desenvolvimento (permite qualquer origem).
- Em produção, restringir para o domínio do frontend.

## Headers HTTP

- `Content-Type: application/json` como padrão.
- Rate limiting: <!-- DECISÃO PENDENTE: Rate limiting ainda não implementado. Ver knowledge-gaps.md -->

## Validação de Input

- Backend: Validação manual nos use cases (AppError com statusCode 400).
- Frontend: Schemas Zod antes da chamada HTTP.
- Validar no backend é obrigatório; frontend é complementar.

---

## Related Documents

- [Authentication](authentication.md)
- [Backend Guidelines](backend-guidelines.md)
- [Database Guidelines](database-guidelines.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
