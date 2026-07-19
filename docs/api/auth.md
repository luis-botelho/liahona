# API Contracts - Authentication

## POST /register

- **Caminho do Controller no Backend:** `/home/botelho/Documents/GitHub/liahona/backend/src/presentation/controllers/register.controller.ts`
- **Request Payload (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Payload (JSON):**
  - Status Code: `201 Created`
  ```json
  {
    "id": "user-uuid-string",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "createdAt": "2026-07-18T22:00:00.000Z",
    "updatedAt": "2026-07-18T22:00:00.000Z"
  }
  ```
- **Status HTTP Mapeados & Casos de Erro:**
  - `201 Created`: Usuário registrado com sucesso.
  - `400 Bad Request`: Dados ausentes ou inválidos.
    - Exemplo de erro (Nome vazio):
      ```json
      {
        "message": "Nome é obrigatório."
      }
      ```
    - Exemplo de erro (E-mail vazio):
      ```json
      {
        "message": "E-mail é obrigatório."
      }
      ```
    - Exemplo de erro (Senha vazia):
      ```json
      {
        "message": "Senha é obrigatória."
      }
      ```
  - `409 Conflict`: E-mail já cadastrado no banco de dados.
    - Exemplo de erro:
      ```json
      {
        "message": "E-mail já cadastrado."
      }
      ```
  - `500 Internal Server Error`: Falha inesperada no servidor.
    - Exemplo de erro:
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

---

## POST /login

- **Caminho do Controller no Backend:** `/home/botelho/Documents/GitHub/liahona/backend/src/presentation/controllers/auth/login.controller.ts`
- **Request Payload (JSON):**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Payload (JSON):**
  - Status Code: `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "user-uuid-string",
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    }
  }
  ```
- **Status HTTP Mapeados & Casos de Erro:**
  - `200 OK`: Login efetuado e token assinado com sucesso.
  - `401 Unauthorized`: E-mail ou senha incorretos.
    - Exemplo de erro:
      ```json
      {
        "success": false,
        "message": "Invalid credentials"
      }
      ```
  - `500 Internal Server Error`: Falha inesperada no servidor.
    - Exemplo de erro:
      ```json
      {
        "success": false,
        "message": "Internal server error"
      }
      ```
