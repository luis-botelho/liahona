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

Todas as aplicações consumirã a mesma API.

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

Todas as permissões serão controladas no backend.

Nenhuma autorização deverá depender exclusivamente do frontend.

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

## Documentos Relacionados

- 05-architecture.md
- 06-tech-stack.md
- 09-database.md
- 13-decisions.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 04/07/2026 | 1.0.0 | Criação do documento |