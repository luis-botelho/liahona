# ✏️ Wireframes

> **Projeto:** LIA — Local Intelligence for Assistance
>
> **Versão:** 1.0.0
>
> **Status:** Ativo

---

# Objetivo

Este documento define como os wireframes do LIA serão planejados, organizados e evoluídos durante o desenvolvimento.

Os wireframes representam a estrutura das telas antes da definição do design visual.

Seu objetivo é validar fluxos, organização de informações e experiência do usuário.

---

# Filosofia

Primeiro validamos a experiência.

Depois desenhamos a interface.

Nunca iniciaremos uma tela diretamente em alta fidelidade.

---

# Processo

Todo novo fluxo deverá seguir a seguinte sequência:

Persona

↓

User Flow

↓

Wireframe

↓

Protótipo

↓

Implementação

---

# Níveis de Fidelidade

## Baixa Fidelidade

Objetivo:

Validar estrutura.

Características:

- Sem cores
- Sem imagens
- Sem identidade visual
- Apenas disposição dos elementos

---

## Média Fidelidade

Objetivo:

Validar componentes.

Características:

- Espaçamentos
- Hierarquia visual
- Componentes reutilizáveis
- Navegação

---

## Alta Fidelidade

Objetivo:

Representar o produto final.

Características:

- Cores
- Tipografia
- Ícones
- Componentes oficiais
- Design System aplicado

---

# Ferramenta

Inicialmente os wireframes serão desenvolvidos no Figma.

Outras ferramentas poderão ser utilizadas futuramente quando agregarem valor ao processo.

---

## Design System

O Design System do LIA será construído sobre:

- Tailwind CSS v4
- shadcn/ui

Os componentes serão versionados dentro do próprio projeto, evitando dependência direta de bibliotecas externas de interface.

Princípios:

- consistência visual;
- acessibilidade;
- reutilização;
- identidade visual própria;
- baixo acoplamento.

---

# Organização

Cada funcionalidade deverá possuir seu próprio conjunto de wireframes.

Exemplo:

```text
wireframes/

authentication/

login.fig

register.fig

jobs/

job-list.fig

job-details.fig

apply.fig

profile/

profile.fig

edit-profile.fig
```

---

# Telas Planejadas

## Autenticação

- Login
- Cadastro
- Recuperação de senha

---

## Home

- Feed principal
- Pesquisa
- Navegação

---

## Perfil

- Visualização
- Edição
- Competências
- Cursos
- Certificados

---

## Empregos

- Lista de vagas
- Detalhes
- Publicação
- Candidatura

---

## Serviços

- Lista
- Perfil profissional
- Publicação

---

## Empresas

- Perfil da empresa
- Gestão de vagas

---

## Chat

- Lista de conversas
- Conversa

---

## Configurações

- Conta
- Privacidade
- Preferências

---

# Critérios de Qualidade

Todo wireframe deverá responder:

- O objetivo da tela está claro?
- O usuário sabe o próximo passo?
- Existe informação desnecessária?
- O fluxo é intuitivo?
- A tela segue o Design System?

---

# Evolução

Wireframes poderão ser alterados conforme entrevistas, testes de usabilidade e evolução do produto.

Toda alteração significativa deverá manter compatibilidade com os User Flows.

---

# Filosofia

Wireframes não representam estética.

Representam raciocínio.

Uma boa tela nasce da compreensão do problema, não da escolha de uma cor.

---

## Documentos Relacionados

- 08-design-system.md
- 14-user-flows.md
- 16-personas.md

---

## Histórico de Alterações

| Data | Versão | Alteração |
|-------|---------|-----------|
| 03/07/2026 | 1.0.0 | Criação do documento |
