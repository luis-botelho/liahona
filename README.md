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

- Cadastro e login (com escolha de perfil: trabalhador ou recrutador)
- Perfis profissionais (localização, WhatsApp, habilidades e interesses)
- Publicação de oportunidades
- Recomendações de oportunidades por local e habilidades
- Candidatura/interesse com acionamento do recrutador via WhatsApp
- Lista de interessados para o recrutador
- Notificações por e-mail/WhatsApp (infraestrutura preparada)

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

## Stack atual

| Camada | Tecnologia |
|--------|------------|
| Frontend Web | React (Vite) + React Router + TanStack Query |
| Backend | Node.js + Fastify |
| Linguagem | TypeScript |
| Banco de Dados | PostgreSQL |
| ORM | Prisma |
| API | REST |
| Autenticação | JWT |
| Formulários | React Hook Form + Zod |
| Estilo | Tailwind CSS |
| CI | GitHub Actions |
| Versionamento | Git + GitHub |

---

## Como rodar localmente

### Pré-requisitos

- Node.js 22+
- PostgreSQL

### Backend

```bash
cd backend
cp .env.example .env   # preencha DATABASE_URL, JWT_SECRET e JWT_EXPIRES_IN
npm install
npx prisma generate
npx prisma migrate deploy   # aplicar migrations no banco
npm run db:seed            # opcional, APENAS para desenvolvimento (cria contas demo)
npm run dev                # sobe a API em http://localhost:3333
```

Variáveis de ambiente (backend/.env):

- `DATABASE_URL` — conexão com o PostgreSQL
- `JWT_SECRET` — segredo para assinar os tokens
- `JWT_EXPIRES_IN` — validade do token (ex.: `1d`)
- `FRONTEND_URL` — origens permitidas no CORS (opcional em desenvolvimento)
- `WHATSAPP_ENABLED` — `false` deixa as notificações em modo simulado (padrão)

> **Seed DEV ONLY**: `npm run db:seed` cria as contas de demonstração
> (`demo@liahona.app`, `recrutador.demo@liahona.app`) e é bloqueado em produção.

### Frontend

```bash
cd frontend
cp .env.example .env   # aponta VITE_API_URL para o backend
npm install
npm run dev            # sobe o app em http://localhost:5173
```

Variáveis de ambiente (frontend/.env):

- `VITE_API_URL` — endereço da API (padrão de desenvolvimento: `http://localhost:3333`)

---

## Fluxo atual do MVP

**Trabalhador**

```text
Cadastro/Login
→ Completa o perfil (título profissional, cidade, habilidades, interesses, cargos desejados, WhatsApp)
→ Vê oportunidades recomendadas por ele
→ Abre uma oportunidade e registra interesse
→ O recrutador recebe o contato e chama no WhatsApp
```

**Recrutador**

```text
Cadastro/Login
→ Completa o perfil do negócio (organização, WhatsApp, cidade)
→ Publica uma oportunidade
→ Vê suas oportunidades e a lista de interessados
→ Conversa com o candidato no WhatsApp
```

---

## Status atual

**MVP funcional.** Fluxo ponta a ponta de trabalhador e recrutador funcionando em
ambiente local. O trabalhador acompanha suas candidaturas e status, baixa o
currículo em PDF (inclusive a versão preparada para uma vaga específica); o
recrutador conduz o pipeline (em análise, entrevista, aprovado/rejeitado) e
conversa no WhatsApp. CI valida lint, build e testes do backend.

Próximas missões: services/tarefas, learning foundation, validação do WhatsApp
real e ingestão de oportunidades externas.

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
