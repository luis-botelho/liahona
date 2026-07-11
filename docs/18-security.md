# 🔒 Security

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento estabelece os princípios de segurança do LIA.

Segurança não será tratada como uma etapa final do desenvolvimento.

Ela fará parte do produto desde a primeira linha de código.

---

# Filosofia

A confiança da comunidade é um dos maiores ativos do LIA.

Toda decisão técnica deverá considerar a proteção dos usuários, seus dados e sua privacidade.

---

# Princípios

## Security by Design

Segurança será considerada desde o planejamento.

Nunca adicionada apenas após incidentes.

---

## Menor Privilégio

Usuários e sistemas terão apenas as permissões necessárias para executar suas funções.

---

## Defesa em Camadas

Nenhum mecanismo isolado será considerado suficiente.

A segurança será construída em múltiplas camadas.

---

## Privacidade

Coletaremos apenas os dados necessários para o funcionamento do produto.

Evitar armazenamento desnecessário de informações pessoais.

---

# Autenticação

A autenticação utilizará JWT na versão inicial do projeto.

Senhas nunca serão armazenadas em texto puro.

Sempre utilizar algoritmos seguros para hash.

---

## Armazenamento de Senhas

Nenhuma senha será armazenada em texto puro.

O LIA utiliza Argon2id como algoritmo oficial de hash de senhas.

Motivos:

- recomendado pela OWASP;
- resistente a ataques por GPU;
- padrão moderno para novas aplicações.

A estratégia encontra-se registrada na ADR-012.

---

# Autorização

Toda operação sensível deverá validar permissões no Backend.

O Frontend nunca será responsável pela segurança da aplicação.

---

# Proteção de Dados

Dados sensíveis deverão ser protegidos durante armazenamento e transmissão.

Sempre utilizar HTTPS em ambientes públicos.

---

# Logs

Eventos importantes deverão ser registrados.

Nunca registrar:

- Senhas
- Tokens
- Dados sensíveis
- Informações pessoais desnecessárias

---

# Dependências

As bibliotecas utilizadas deverão ser mantidas atualizadas.

Dependências vulneráveis deverão ser corrigidas com prioridade.

---

# Backups

A estratégia de backup deverá ser definida antes da entrada em produção.

Recuperação deverá ser testada periodicamente.

---

# LGPD

O projeto buscará respeitar os princípios da Lei Geral de Proteção de Dados.

Sempre que possível:

- Transparência
- Consentimento
- Minimização de dados
- Direito de exclusão

---

# Incidentes

Problemas de segurança deverão ser tratados com prioridade máxima.

Sempre documentar:

- O ocorrido
- O impacto
- A correção
- As ações preventivas

---

# Evolução

Este documento será atualizado conforme novas necessidades surgirem.

Segurança é um processo contínuo.

---

# Filosofia

A melhor falha de segurança é aquela que nunca chegou à produção.

Construímos confiança antes mesmo de construir funcionalidades.

---

## Documentos Relacionados

- 05-architecture.md
- 09-database.md
- 10-api.md
- 13-decisions.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |
