---
title: API Guidelines
description: Diretrizes de criação e consumo de endpoints da API REST do LIA.
area: engineering
tags: [engineering, api, rest, fastify]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# API Guidelines

## Convenções Gerais

- **Estilo arquitetural**: REST.
- **Framework**: Fastify (ADR-012).
- **Formatação de resposta**: JSON.
- **Encoding**: UTF-8.

## Estrutura de Resposta

### Sucesso

```json
{
  "success": true,
  "data": { ... }
}
```

### Erro

```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

## Status Codes

| Código | Uso |
|---|---|
| `200` | Operação bem-sucedida |
| `201` | Recurso criado com sucesso |
| `400` | Requisição inválida (validação, campos obrigatórios) |
| `401` | Credenciais inválidas |
| `409` | Conflito (ex: e-mail já cadastrado) |
| `500` | Erro interno do servidor |

## Endpoints Atuais

| Método | Rota | Body | Resposta bem-sucedida | Status |
|---|---|---|---|---|
| POST | `/register` | `{ name, email, password }` | `{ id, name, email, createdAt, updatedAt }` | 201 |
| POST | `/login` | `{ email, password }` | `{ success: true, data: { token, user: { id, name, email } } }` | 200 |
| GET | `/health` | — | `{ status: "ok" }` | 200 |

## Nomenclatura de Rotas

- Usar **kebab-case** para rotas compostas: `/user-profile`, `/forgot-password`.
- Substantivos no plural para coleções (quando aplicável): `/users`.
- Verbos de ação em endpoints de ação: `/login`, `/register`.

## Validação de Input

- **Backend**: Validação manual nos use cases (camada application).
- **Frontend**: Validação com Zod antes da chamada HTTP.
- Validar no backend é obrigatório; validação no frontend é complementar.

## Autenticação

- Endpoints protegidos exigem header `Authorization: Bearer <token>`.
- Ver detalhes em [authentication.md](authentication.md).

## Inconsistências Documentadas

> **Pendente (Executive Board):** O endpoint `/register` retorna o objeto diretamente (sem wrapper `success/data`), enquanto `/login` usa `{ success: true, data: { ... } }`. O padrão deve ser unificado.

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [Error Handling](error-handling.md)
- [Authentication](authentication.md)
- [HTTP Client](http-client.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
