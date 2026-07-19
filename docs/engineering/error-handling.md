---
title: Error Handling
description: Diretrizes de tratamento de erros no backend e frontend do LIA.
area: engineering
tags: [engineering, error-handling, app-error]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# Error Handling

## Backend

### AppError

Classe base para erros de negócio, definida em `backend/src/shared/errors/app-error.ts`:

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 400,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
```

### Uso nos Controllers

- Controllers devem usar try/catch.
- Erros `AppError` retornam o `statusCode` e a mensagem.
- Erros inesperados retornam `500` com mensagem genérica.
- Logs de erro inesperado devem usar `request.log.error(error)`.

```typescript
try {
  // ... lógica
} catch (error) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }
  request.log.error(error);
  return reply.status(500).send({ message: 'Internal Server Error' });
}
```

### Uso nos Use Cases

- Lançar `AppError` com statusCode apropriado para violações de regra de negócio.
- Exemplos: `new AppError('Nome é obrigatório.', 400)`, `new AppError('E-mail já cadastrado.', 409)`.

### Login Use Case (exceção)

O `LoginUseCase` ainda usa `new Error('Invalid credentials')` em vez de `AppError`. O controller faz a tradução manual. Isso deve ser padronizado para usar `AppError` com `statusCode: 401`.

## Frontend

### TanStack Query

- Erros HTTP são capturados como `AxiosError` nos callbacks `onError` dos mutations.
- Usar `error.response?.data?.message` para extrair a mensagem do backend.

### Toast (Sonner)

- Notificar o usuário via `toast.error()` ou `toast.success()` da biblioteca `sonner`.
- Usar mensagem genérica como fallback quando a resposta não contém `message`.

### Interceptor HTTP (planejado)

<!-- DECISÃO PENDENTE: Interceptores de response 401/403 ainda não implementados no Axios.
     Ver knowledge-gaps.md para a decisão de implementar interceptors. -->

Os interceptores de response (401 → logout automático, 403 → propagação de erro) estão documentados em [http-client.md](http-client.md) mas ainda não implementados no código.

---

## Related Documents

- [Backend Guidelines](backend-guidelines.md)
- [API Guidelines](api-guidelines.md)
- [HTTP Client](http-client.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
- [Context Map](../context-map.yaml)
