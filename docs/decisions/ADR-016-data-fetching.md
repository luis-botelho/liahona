# ADR-016 — Estratégia de Data Fetching

## Status

Accepted

---

## Contexto

Era necessário definir a estratégia oficial de comunicação entre frontend e backend.

---

## Decisão

A aplicação utilizará:

- Axios para comunicação HTTP.
- TanStack Query para gerenciamento de estado assíncrono e cache.

---

## Justificativa

A combinação oferece:

- cache inteligente;
- sincronização automática;
- invalidação de consultas;
- retries;
- excelente experiência para o usuário.

---

## Consequências

Toda comunicação com a API deverá ser realizada através de uma camada de serviços utilizando Axios.

Os componentes não realizarão chamadas HTTP diretamente.
