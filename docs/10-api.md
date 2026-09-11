---
title: API
description: Documento de product do projeto LIA.
area: product
tags: [product, 10-api]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 📡 API

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento define os princípios da API do LIA.

A API será responsável por conectar todas as aplicações da plataforma, garantindo comunicação consistente, segura e previsível.

Ela representa o contrato oficial entre clientes e servidor.

---

# Filosofia

A API existe para servir o produto.

Não deve refletir a estrutura do banco de dados.

Deve refletir as necessidades do negócio.

Mudanças internas não devem quebrar consumidores da API.

---

# Princípios

## Consistência

Endpoints semelhantes devem possuir comportamento semelhante.

---

## Clareza

Os recursos devem possuir nomes intuitivos.

---

## Versionamento

Mudanças incompatíveis deverão ocorrer através de novas versões.

---

## Segurança

Toda requisição deverá respeitar autenticação e autorização quando necessário.

---

## Performance

A API deve retornar apenas os dados necessários para cada operação.

---

# Arquitetura

A comunicação ocorrerá através de uma API REST.

Todas as aplicações consumirão a mesma API.

```text
Web

↓

REST API

↑

Mobile

↓

Painel Administrativo
```

---

# Recursos

A API será organizada por recursos de negócio.

Exemplos:

- Users
- Profiles
- Jobs
- Companies
- Services
- Categories
- Skills
- Applications
- Ratings
- Messages
- Notifications

Cada recurso possuirá responsabilidades bem definidas.

---

# Convenções

## URLs

Utilizar substantivos.

Exemplo:

```text
/users

/jobs

/companies
```

Evitar verbos na URL.

---

## Métodos HTTP

GET

Consultar informações.

POST

Criar recursos.

PUT

Atualizar completamente.

PATCH

Atualizar parcialmente.

DELETE

Remover recursos.

---

# Formato

Toda comunicação utilizará JSON.

---

# Tratamento de Erros

As respostas de erro deverão conter informações suficientes para auxiliar o consumidor da API.

Mensagens técnicas nunca deverão ser exibidas diretamente ao usuário final.

---

# Paginação

Listagens deverão suportar paginação.

---

# Filtros

Sempre que possível, recursos deverão oferecer filtros para facilitar consultas.

---

# Ordenação

Resultados deverão permitir ordenação quando fizer sentido.

---

# Segurança

A autenticação inicial utilizará JWT.

Todas as permissões serão controladas no Backend.

Nenhuma autorização deverá depender exclusivamente do Frontend.

---

# Documentação

A API deverá possuir documentação clara e atualizada.

Sempre que possível utilizar OpenAPI (Swagger).

Toda alteração de contrato deverá atualizar a documentação correspondente.

---

# Evolução

Novos endpoints deverão respeitar os princípios definidos neste documento.

Mudanças incompatíveis deverão ser evitadas.

Quando inevitáveis, deverão ser planejadas e documentadas.

---

# Filosofia

Uma boa API deve ser previsível.

Quanto menos o desenvolvedor precisar consultar a documentação, melhor será seu design.

---

## Endpoints atuais (MVP)

Referência rápida dos endpoints implementados no MVP.

## Auth

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| POST | `/register` | público | Cria usuário e retorna o usuário criado |
| POST | `/login` | público | Retorna `{ token, user }` |

## Opportunities

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| GET | `/opportunities` | público | Lista oportunidades ativas (mais recentes primeiro) |
| GET | `/opportunities/:id` | público | Detalhe; expõe `authorWhatsapp` apenas para origem LIA |
| GET | `/opportunities/recommended` | WORKER | Oportunidades pontuadas por matching (score + motivos) |
| GET | `/opportunities/mine` | RECRUITER | Oportunidades do recrutador |
| POST | `/opportunities` | RECRUITER | Cria oportunidade (origem `LIA`) |
| POST | `/opportunities/:id/apply` | WORKER | Candidatura única (`opportunityId + workerId`) |
| GET | `/opportunities/:id/applications` | RECRUITER (autor) | Candidatos da oportunidade |

## Profiles

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| GET | `/profile/worker` | WORKER | Retorna `{ profile, completion }` |
| PUT | `/profile/worker` | WORKER | Upsert do perfil; retorna `{ profile, completion }` |
| GET | `/profile/recruiter` | RECRUITER | Retorna perfil do recrutador |
| PUT | `/profile/recruiter` | RECRUITER | Upsert do perfil do recrutador |

### WorkerProfile

Campos suportados:

- `whatsapp`, `city`, `neighborhood`, `bio`
- `skills[]`, `interests[]`
- `professionalTitle`, `availability`
- `desiredRoles[]`, `workPreferences[]`
- `discoverableByRecruiters` (boolean)
- `whatsappOptIn` (boolean)

O campo `completion` indica a completude do perfil:

```json
{
  "profile": { "...": "..." },
  "completion": {
    "isComplete": false,
    "completionPercentage": 60,
    "missingFields": ["professionalTitle", "whatsapp"]
  }
}
```

## Applications

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| GET | `/applications/mine` | WORKER | Histórico de candidaturas do trabalhador com status |
| PATCH | `/applications/:id/status` | RECRUITER (dono da vaga) | Altera status do candidato (`REVIEWING`, `INTERVIEW`, `APPROVED`, `REJECTED`) |
| POST | `/applications/:id/withdraw` | WORKER (dono da candidatura) | Retira a candidatura (`WITHDRAWN`) |

### Status de candidatura

`APPLIED`, `REVIEWING`, `INTERVIEW`, `APPROVED`, `REJECTED`, `WITHDRAWN`.

- O recrutador controla `REVIEWING`, `INTERVIEW`, `APPROVED`, `REJECTED`.
- O trabalhador controla `WITHDRAWN` (somente enquanto a candidatura não estiver em estado final).

## Health

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| GET | `/health` | público | `{ "status": "ok" }` |

---

## Documentos Relacionados

- 05-architecture.md
- 06-tech-stack.md
- 09-database.md
- 13-decisions.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |
| 11/09/2026 | 1.1.0 | Adição de referência dos endpoints atuais do MVP (auth, opportunities, profiles, health) |

---

## Related Documents

- [Documentation Index](README.md)
- [Area Index](README.md)
- [Context Map](context-map.yaml)
