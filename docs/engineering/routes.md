# Routes Configuration

<!-- DECISÃO PENDENTE: Nenhuma biblioteca de roteamento está instalada.
     Ver knowledge-gaps.md para registro da pendência. -->
- **Biblioteca de Roteamento:** `react-router-dom` (planejada, **ainda não instalada**)
- **Caminho Absoluto do Router Principal:** `/home/botelho/Documents/GitHub/liahona/frontend/src/app/routes.tsx`
- **Caminho Absoluto do Guard de Autenticação:** `/home/botelho/Documents/GitHub/liahona/frontend/src/components/protected-route.tsx`
- **Caminho Absoluto do Layout Base:** `/home/botelho/Documents/GitHub/liahona/frontend/src/components/layout/base-layout.tsx`

---

## Mapeamento das Rotas

### Rotas Públicas:
- **Caminho:** `/login`
  - Componente: `LoginPage`
  - Arquivo do Componente: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/pages/LoginPage.tsx`
- **Caminho:** `/register`
  - Componente: `RegisterPage`
  - Arquivo do Componente: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/auth/pages/register.page.tsx`

### Rotas Protegidas:
- **Caminho:** `/` (Raiz / Dashboard)
  - Componente: `DashboardPage` (a ser criado)
  - Arquivo do Componente: `/home/botelho/Documents/GitHub/liahona/frontend/src/features/dashboard/pages/DashboardPage.tsx` (planejado)
  - Guard associado: `ProtectedRoute`
