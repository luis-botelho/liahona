---
title: Backend Guidelines
description: Diretrizes de implementação do backend baseadas na estrutura Clean Architecture existente.
area: engineering
tags: [engineering, backend, clean-architecture, fastify, prisma]
used-by: [development, review, debug]
priority: high
last-reviewed: 2026-07-19
---

# Backend Guidelines

## Arquitetura

O backend segue **Clean Architecture** com quatro camadas definidas em `backend/src/`:

```
domain/        → Entidades e contratos (interfaces de repositório)
application/   → DTOs e casos de uso
infrastructure/ → Implementações concretas (Prisma, plugins Fastify)
presentation/  → Controllers, rotas e servidor Fastify
```

### Fluxo de dependências

```
presentation → application → domain
                ↓
            infrastructure (implementa contratos do domain)
```

### Camada: domain/

- **Entidades**: Definem a forma dos dados (interfaces TypeScript).
- **Repositórios**: Contratos abstratos (interfaces). Nunca importam Prisma ou qualquer infraestrutura.

### Camada: application/

- **DTOs**: Interfaces de dados para entrada/saída dos casos de uso.
- **Use Cases**: Contêm a lógica de negócio. Cada caso de uso é uma classe com método `execute()`.

### Camada: infrastructure/

- **Database**: Instância compartilhada do PrismaClient com adaptador `@prisma/adapter-pg`.
- **Repositories**: Implementam os contratos do domain usando Prisma.
- **Plugins**: Plugins Fastify (JWT, CORS, etc.).

### Camada: presentation/

- **Controllers**: Funções que extraem dados da request, chamam o use case e formatam a response.
- **Routes**: Registram os endpoints no Fastify.
- **Server**: Instância do Fastify com plugins e rotas registrados.

## Convencoes de Implementacao

### Controllers

- Funções puras (não classes), exceto quando o controller precisa de dependência injetada via construtor.
- Sempre tipar `FastifyRequest<{ Body: ... }>` e `FastifyReply`.
- Tratar erros com `AppError` para erros de negócio e try/catch genérico para erros inesperados.
- Respostas de erro devem usar formato `{ success: false, message: string }`.

### Use Cases

- Um caso de uso por arquivo.
- Validações de negócio no início do `execute()`.
- Lançar `AppError` com statusCode apropriado para erros de negócio.
- Nunca retornar a entidade completa do banco com campo `password`.

### Repositories

- Implementar a interface definida em `domain/repositories/`.
- Usar `select` do Prisma para retornar apenas campos necessários.
- Nunca expor `password` no retorno.

### DTOs

- Interfaces simples em `application/dto/`.
- Um DTO por operação (RegisterUserDTO, etc.).

## Endpoints Existentes

| Método | Rota | Controller | Descrição |
|---|---|---|---|
| POST | `/register` | RegisterController | Cadastro de usuário |
| POST | `/login` | loginController | Login e emissão de JWT |
| GET | `/health` | (inline) | Health check |

## Response Format

### Sucesso (2xx)

```json
{
  "success": true,
  "data": { ... }
}
```

Register retorna diretamente o objeto (sem wrapper `success`):

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

> **Nota:** O register controller ainda não segue o padrão `success/data` do login controller. Isso deve ser padronizado.

### Erro

```json
{
  "success": false,
  "message": "string"
}
```

Ou apenas `{ "message": "string" }` no register (inconsistência pendente).

## Variaveis de Ambiente

| Variavel | Uso |
|---|---|
| `DATABASE_URL` | String de conexão PostgreSQL |
| `JWT_SECRET` | Segredo para assinatura JWT |
| `JWT_EXPIRES_IN` | Tempo de expiração do token |

---

## Related Documents

- [Architecture Guidelines](architecture-guidelines.md)
- [Tech Stack](tech-stack.md)
- [Folder Structure](folder-structure.md)
- [API Guidelines](api-guidelines.md)
- [Error Handling](error-handling.md)
- [Documentation Index](../README.md)
- [Area Index](INDEX.md)
