---
title: User Flows
description: Documento de product do projeto LIA.
area: product
tags: [product, 14-user-flows]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 🔀 User Flows

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 2.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento descreve os principais fluxos de navegação do LIA.

Seu objetivo é mapear como cada persona interage com a plataforma para atingir seus objetivos.

Os fluxos aqui descritos servirão como base para wireframes, design, desenvolvimento e testes.

---

# Princípios

Todo fluxo deve ser:

- Simples
- Objetivo
- Intuitivo
- Rápido
- Consistente

Cada etapa deve aproximar o usuário de seu objetivo.

Nunca criar passos desnecessários.

**Princípio central:** o LIA não deve exigir cadastro antes de entregar valor.

---

# FLOW 1 — Visitante procura oportunidade

Persona

- João
- Ana

Objetivo

Encontrar uma oportunidade sem criar conta.

Fluxo

```text
Landing/feed
→ filtro/lista
→ detalhe
```

SEM LOGIN.

---

# FLOW 2 — Guest interest

Persona

- João
- Ana

Objetivo

Demonstrar interesse em uma oportunidade sem conta.

Fluxo

```text
Detalhe
→ Tenho interesse
→ escolha:

WhatsApp
OU
LIA

WhatsApp:
→ abre conversa
→ fim.

LIA:
→ auth.
```

---

# FLOW 3 — Progressive auth

Persona

- João
- Ana

Objetivo

Criar/login de conta a partir de uma oportunidade real.

Fluxo

```text
Vaga
→ login/cadastro
→ volta para vaga
→ candidatura
```

Após autenticação, o usuário retorna à oportunidade original.

---

# FLOW 4 — Worker account

Persona

- João

Objetivo

Ativar os benefícios da conta como trabalhador.

Fluxo

```text
Login
→ perfil
→ matching
→ radar
→ candidatura
→ acompanhamento
```

---

# FLOW 5 — Recruiter

Persona

- Dona Maria
- Juliana

Objetivo

Publicar e gerenciar oportunidades e candidatos.

Fluxo

```text
login
→ perfil
→ publicar
→ receber candidatos
→ processo seletivo
```

---

# FLOW 6 — Talent Radar

Persona

- Juliana

Objetivo

Receber alertas quando um talento compatível surgir.

Fluxo

```text
empresa define perfil desejado
→ worker compatível surge
→ LIA identifica
→ recruiter recebe alerta
```

---

# FLOW 7 — Task/service

Persona

- Pedro

Objetivo

Contratar um serviço ou tarefa pontual.

Fluxo

```text
necessidade
→ publicar tarefa
→ matching
→ prestador
→ contato
```

---

# FLOW 8 — Career

Persona

- João
- Ana

Objetivo

Construir e usar o currículo profissional.

Fluxo

```text
perfil
→ currículo
→ exportar PDF
→ adaptar para vaga
```

---

# FLOW 9 — Learning

Persona

- Ana

Objetivo

Fechar um gap de habilidade através de aprendizado.

Fluxo

```text
gap
→ trilha
→ curso
→ conclusão
→ certificado
→ perfil atualizado
```

---

# FLOW 10 — Educator

Persona

- Carlos
- Marcos

Objetivo

Criar e publicar um curso.

Fluxo

```text
ativar perfil educador
→ criar curso
→ estruturar
→ publicar
→ emitir certificado aplicável
```

---

# FLOW 11 — External opportunity

Objetivo

Trazer oportunidades externas para o feed.

Fluxo

```text
curadoria/agente
→ normalização
→ publicação com fonte
→ feed
→ matching
```

Toda vaga externa deve mostrar sua origem de forma transparente.

---

# Evolução

Novos fluxos deverão ser adicionados conforme o crescimento da plataforma.

Sempre que um fluxo sofrer alterações significativas, este documento deverá ser atualizado antes da implementação.

---

# Filosofia

Fluxos representam jornadas humanas.

Não desenhamos apenas telas.

Desenhamos experiências.

Quanto menor o esforço necessário para atingir um objetivo, melhor será a experiência do usuário.

---

## Documentos Relacionados

- 15-wireframes.md
- 16-personas.md
- 04-backlog.md
- 08-design-system.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |
| 08/09/2026 | 2.0.0 | Reescrita dos fluxos principais (visitante, guest interest, progressive auth, worker, recruiter, talent radar, task/service, career, learning, educator, external opportunity). |

---

## Related Documents

- [Documentation Index](README.md)
- [Area Index](README.md)
- [Context Map](context-map.yaml)
