# HTTP Client Configuration

- **Biblioteca:** Axios
- **Caminho Absoluto:** `/home/botelho/Documents/GitHub/liahona/frontend/src/services/api.ts`
- **Base URL:** `http://localhost:3333`
  - Injeção por variável de ambiente (Planejado): `import.meta.env.VITE_API_URL`
- **Headers Padrão:**
  - `Content-Type: application/json`
- **Authorization (Injeção de Token):**
  - O token é recuperado do `localStorage` sob a chave `@lia:token`.
  - Injetado no header `Authorization` como `Bearer <token>` via interceptor de request do Axios.
- **Tratamento de Erros via Interceptor:**
  - Interceptador de Resposta (Response Interceptor):
    - Erro `401 Unauthorized`: Efetua logout automático do usuário, limpando o `localStorage` (removendo a chave `@lia:token`) e redirecionando a página para `/login`.
    - Erro `403 Forbidden`: Propaga erro de acesso negado.
    - Demais erros: Propaga a rejeição da Promise para tratamento local no TanStack Query.

---

## Snippet Atual do Arquivo

```typescript
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});
```

<!-- DECISÃO PENDENTE: Interceptores ainda não implementados.
     A estratégia de auth (localStorage vs. HTTP Only Cookies — ver ADR-017)
     determinará a implementação final dos interceptors.
     Ver knowledge-gaps.md para registro completo. -->

## Snippet Recomendado (Com Interceptors)

> **Status:** Estes interceptores ainda NÃO estão implementados no código.
> O snippet abaixo é a especificação para implementação futura.

```typescript
// TODO: Implementar quando a estratégia de auth for consolidada (ADR-017)
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Request: Adicionar Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@lia:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de Response: Captura 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("@lia:token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```
