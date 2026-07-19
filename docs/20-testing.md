---
title: Testing
description: Documento de product do projeto LIA.
area: product
tags: [product, 20-testing]
used-by: [analysis, development, review]
priority: medium
last-reviewed: 2026-07-18
---

# 🧪 Testing

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento descreve a estratégia de testes do LIA.

Seu objetivo é garantir que o produto evolua com qualidade, segurança e previsibilidade, reduzindo regressões e aumentando a confiança em cada entrega.

---

# Filosofia

Testes não existem apenas para encontrar erros.

Eles existem para proteger o comportamento esperado do produto.

Cada teste deve aumentar a confiança da equipe para evoluir o sistema sem medo.

---

# Pirâmide de Testes

A estratégia seguirá a pirâmide de testes.

```text
        E2E
     Integration
        Unit
```

A base deverá ser composta por testes rápidos e focados.

Testes mais amplos deverão validar fluxos críticos, sem substituir os testes de unidade e integração.

---

# Testes Unitários

Testes unitários deverão validar pequenas partes do sistema de forma isolada.

Devem cobrir principalmente:

- Regras de negócio
- Casos de uso
- Validações
- Funções utilitárias
- Comportamentos de domínio

Eles devem ser rápidos, claros e fáceis de manter.

---

# Testes de Integração

Testes de integração deverão validar a comunicação entre partes importantes do sistema.

Devem cobrir principalmente:

- Casos de uso com infraestrutura
- Integração com banco de dados
- Endpoints da API
- Autenticação e autorização
- Fluxos entre camadas

Esses testes ajudam a garantir que os módulos funcionem corretamente em conjunto.

---

# Testes E2E

Testes end-to-end deverão validar jornadas críticas do usuário.

Exemplos de fluxos candidatos:

- Cadastro
- Login
- Completar perfil
- Publicar vaga
- Candidatar-se
- Publicar serviço
- Conversar
- Avaliar usuário

Os testes E2E deverão ser usados com critério, priorizando fluxos essenciais para o MVP.

---

# Qualidade no CI

Sempre que possível, o processo de CI deverá executar verificações automáticas.

Exemplos:

- Lint
- Formatação
- Testes unitários
- Testes de integração
- Build

O objetivo é impedir que mudanças com falhas conhecidas avancem no fluxo de desenvolvimento.

---

# Cobertura

Cobertura de testes será utilizada como indicador de qualidade, não como objetivo isolado.

Mais importante do que atingir um número alto é garantir que comportamentos relevantes estejam protegidos.

Prioridade:

1. Regras de negócio
2. Fluxos críticos
3. Segurança
4. Integrações importantes
5. Componentes reutilizáveis

---

# Critérios

Uma funcionalidade somente deverá ser considerada pronta quando seus comportamentos principais estiverem validados.

A validação poderá incluir:

- Testes automatizados
- Testes manuais orientados por checklist
- Revisão de critérios de aceite
- Evidências no Pull Request

---

# Evolução

A estratégia de testes poderá evoluir conforme o produto amadurecer.

Novas ferramentas ou níveis de teste somente deverão ser adicionados quando resolverem uma necessidade real do projeto.

---

# Filosofia

Qualidade não deve depender de memória.

Deve fazer parte do processo.

Testes são uma forma de preservar confiança enquanto o produto cresce.

---

## Documentos Relacionados

- 04-backlog.md
- 05-architecture.md
- 10-api.md
- 11-contributing.md
- 18-security.md
- 19-deployment.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |

---

## Related Documents

- [Documentation Index](README.md)
- [Area Index](README.md)
- [Context Map](context-map.yaml)
