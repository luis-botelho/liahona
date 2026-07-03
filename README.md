# LIA — Local Intelligence for Assistance

**Uma plataforma de empregabilidade comunitária para conectar pessoas, talentos, serviços e oportunidades locais.**

O LIA nasce para resolver um problema simples e muito comum: em muitas comunidades, quem precisa trabalhar, contratar ou encontrar um prestador confiável depende de indicações soltas, grupos desorganizados e oportunidades que se perdem antes de chegar às pessoas certas.

A primeira validação do produto será feita em **Mambucaba**, com foco em construir confiança local antes de escalar para outras regiões.

---

## O problema

Em comunidades locais, oportunidades existem, mas nem sempre são visíveis.

Trabalhadores deixam de encontrar vagas porque não existe um canal centralizado. Pequenos comerciantes levam tempo para contratar porque dependem de indicações informais. Prestadores de serviço têm dificuldade para construir reputação fora do boca a boca. Moradores, por sua vez, nem sempre sabem em quem confiar.

O resultado é um mercado local fragmentado, onde talento e demanda estão próximos, mas desconectados.

---

## A solução

O LIA propõe uma plataforma digital para aproximar quem oferece trabalho, quem procura oportunidades e quem precisa contratar serviços.

No MVP, o produto será focado em:

- Cadastro e login
- Perfil profissional
- Publicação de serviços
- Busca de oportunidades
- Chat
- Avaliações
- Banco de Talentos inicial

A proposta é começar pequeno, validar o uso real e evoluir com base nas necessidades da comunidade.

---

## Visão do produto

O LIA não pretende competir por volume com grandes plataformas nacionais de recrutamento.

O foco é local: fortalecer relações de confiança, dar visibilidade a talentos próximos e criar um ponto central para oportunidades da comunidade.

Mais do que gerar cadastros, o objetivo é gerar conexões úteis:

- pessoas encontrando trabalho;
- comerciantes contratando com mais rapidez;
- prestadores construindo reputação;
- moradores encontrando ajuda com mais confiança.

---

## Fundação técnica

O projeto foi estruturado com documentação, arquitetura e decisões técnicas desde a fundação.

Princípios adotados:

- Simplicidade antes de escala
- Separação de responsabilidades
- Regras de negócio centralizadas no Backend
- API REST como contrato entre aplicações
- Evolução gradual da arquitetura
- Documentação e ADRs para decisões relevantes

---

## Stack oficial

| Camada | Tecnologia |
|--------|------------|
| Frontend Web | React |
| Mobile | React Native |
| Backend | Node.js |
| Linguagem | TypeScript |
| Banco de Dados | PostgreSQL |
| ORM | Prisma |
| API | REST |
| Autenticação | JWT |
| Versionamento | Git |
| Repositório | GitHub |

Ferramentas previstas para qualidade e automação:

- GitHub Actions
- ESLint
- Prettier
- Testes unitários, integração e E2E

---

## Arquitetura

A arquitetura do LIA segue uma organização em camadas:

```text
Presentation
Application
Domain
Infrastructure
```

As aplicações Web, Mobile e o Painel Administrativo se comunicam através da mesma API REST. Nenhuma aplicação acessa diretamente o banco de dados.

Essa abordagem mantém as regras de negócio protegidas, reduz acoplamento e permite que o produto cresça de forma gradual.

---

## Estrutura planejada

```text
backend/
mobile/
web/
design/
docs/
```

Cada aplicação possui responsabilidade própria e evolui respeitando os mesmos princípios arquiteturais.

---

## Documentação

A documentação do projeto está organizada em `docs/` e cobre a fundação do produto:

- Vision
- Branding
- Roadmap
- Backlog Master
- Architecture
- Tech Stack
- Business Model
- Design System
- Database
- API
- Contributing
- Changelog
- ADRs
- User Flows
- Wireframes
- Personas
- KPIs
- Security
- Deployment
- Testing
- Glossary

---

## Roadmap resumido

| Fase | Objetivo |
|------|----------|
| Foundation | Base documental, arquitetural e visual |
| MVP | Validar o conceito em Mambucaba |
| Beta | Melhorar experiência com base no uso real |
| RH Central | Evoluir recrutamento e banco de talentos |
| Expansão Regional | Levar o modelo para novas comunidades |
| Plataforma Completa | Consolidar o ecossistema de empregabilidade |

---

## Status atual

**Foundation concluída.**

O projeto está pronto para avançar para a construção do MVP, começando pela organização pública do repositório, consolidação dos ADRs e setup inicial das aplicações.

Este repositório ainda não representa um produto em produção. Ele representa a fundação pública de um produto real em construção.

---

## Como rodar

O setup de execução será documentado junto com a criação das aplicações.

No momento, o foco do repositório está na fundação do produto, arquitetura, decisões técnicas e preparação para o início do desenvolvimento do MVP.

---

## Contribuição

Contribuições externas serão abertas futuramente.

Por enquanto, o foco é consolidar o núcleo funcional do produto e preservar a coerência entre visão, arquitetura, backlog e execução.

---

## Licença

A licença será definida antes da primeira versão pública de uso do produto.

---

## Propósito

O LIA é construído sobre uma ideia simples:

> oportunidades locais não deveriam depender apenas de sorte, contatos ou mensagens perdidas em grupos.

Tecnologia, quando bem aplicada, pode aproximar pessoas, fortalecer comunidades e transformar pequenas oportunidades em caminhos reais de crescimento.
