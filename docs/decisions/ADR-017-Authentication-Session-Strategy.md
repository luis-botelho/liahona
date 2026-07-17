# ADR-017 — Authentication Session Strategy

## Status

✅ Aprovada

---

## Contexto

O LIA utiliza autenticação baseada em JWT.

Era necessário definir a estratégia oficial para persistência da sessão do usuário.

---

## Alternativas

- Local Storage
- Session Storage
- HTTP Only Cookie

---

## Decisão

O LIA utilizará **HTTP Only Cookies** para persistência da sessão autenticada.

O JWT será enviado pelo backend através do header `Set-Cookie`.

O frontend enviará automaticamente o cookie utilizando `credentials: "include"`.

---

## Consequências

### Positivas

- Maior proteção contra XSS.
- Frontend não manipula o token.
- Logout simplificado.
- Compatível com Refresh Token no futuro.

### Negativas

- Requer configuração de CORS com credenciais.
- Requer configuração adequada dos cookies em produção.

---

## Impacto

Backend

- Emissão do JWT via Cookie.

Frontend

- Requisições autenticadas com `credentials: "include"`.

Arquitetura

- Estratégia oficial de sessão definida.