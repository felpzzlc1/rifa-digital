# 🚀 Guia Rápido - Começando com Rifa Digital

## ⚡ Início Rápido em 5 Minutos

### 1️⃣ Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ..
npm install
```

### 2️⃣ Configurar Banco de Dados

**Opção A: Docker (Recomendado)**

```bash
# Iniciar PostgreSQL
docker-compose up db -d

# Aguardar ~10 segundos
```

**Opção B: PostgreSQL Local**

Instale PostgreSQL e crie o banco:
```sql
CREATE DATABASE rifadigital;
```

### 3️⃣ Rodar Migrations

```bash
cd backend

# Gerar Prisma Client
npx prisma generate

# Criar tabelas no banco
npx prisma migrate dev
```

### 4️⃣ Iniciar Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5️⃣ Acessar Aplicação

Abra no navegador: **http://localhost:3000**

---

## 🔑 Primeiro Acesso

Como ainda não há usuários, você precisa criar um via API:

### Com cURL:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@rifadigital.com",
    "password": "senha123456"
  }'
```

### Com Postman/Insomnia:

```http
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@rifadigital.com",
  "password": "senha123456"
}
```

Agora faça login no frontend com essas credenciais!

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module '@prisma/client'"

```bash
cd backend
npx prisma generate
```

### Erro: "Database connection failed"

Verifique se o PostgreSQL está rodando:
```bash
docker-compose ps
```

Ou verifique o `DATABASE_URL` no `backend/.env`

### Erro: "Port 3000 already in use"

Mude a porta no `vite.config.ts`:
```typescript
server: {
  port: 3002,  // Nova porta
  open: true,
}
```

---

## 📚 Próximos Passos

1. ✅ Explorar o Dashboard
2. ✅ Cadastrar produtos
3. ✅ Criar clientes
4. ✅ Fazer pedidos
5. ✅ Ver o [README.md](./README.md) completo
6. ✅ Fazer deploy no Railway ([DEPLOY.md](./DEPLOY.md))

---

## 💡 Dicas

- Use **Prisma Studio** para visualizar o banco:
  ```bash
  cd backend
  npx prisma studio
  ```
  Abre em: http://localhost:5555

- Veja os logs do backend no terminal para debug

- Hot reload está ativado em ambos (frontend e backend)

---

**Pronto para começar! 🎉**
